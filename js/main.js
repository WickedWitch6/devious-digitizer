import { el } from 'attodom'
const createGraph = require('ngraph.graph')
import { ClosingDetails, TabPanel, TabGroup, TagList, Overlay, Dialog } from './components.js'
import { err, zip, equal, array_unique, filter_object_by_key, Tree, bfs_tree, clone_template_from,
         parse_doc, export_object } from './utilities.js'

const clone_template = clone_template_from(document)

customElements.define('closing-details', ClosingDetails, {extends: 'details'})
customElements.define('tab-panel', TabPanel)
customElements.define('tab-group', TabGroup)
customElements.define('tag-list', TagList, {extends: 'ul'})

document.getElementById('file_select').addEventListener('change', e => switch_to_story(e.target.files[0]))

const dragDropOverlay = document.getElementById('drag_drop_overlay')
document.body.addEventListener('dragenter', e => {
    // TODO make nice drag drop overlay
    // new Overlay(null, ['Drag-and-drop icon goes here'])._overlay.open(document.body)
    e.preventDefault()
})
document.body.addEventListener('dragover', e => e.preventDefault())
document.body.addEventListener('dragleave', _ => {
    // document.querySelector('.drag_drop_overlay').close()
})
document.body.addEventListener('drop', e => {
    e.preventDefault()
    e.stopPropagation()
    if (e.dataTransfer.files) switch_to_story(e.dataTransfer.files[0])
})


/// TEMPLATES ///

class SettingsDialog {
    constructor(route_tree, close_action) {
        const dialog = clone_template('settings_overlay_template')
        this._dialog = dialog.querySelector('.settings')

        dialog.querySelector('.export_metadata').addEventListener('click', _ =>
            export_object(extract_metadata(route_tree), 'metadata.json'))

        dialog.querySelector('.close_settings').addEventListener('click', e => close_action(e, this))
    }
}

function retrospective(curr, route_tree, tale) {
    const template = clone_template('retrospective_template')

    template.querySelector('.choice--current').innerText = route_tree.get(curr)?.link?.text ?? ''

    template.querySelector('.past_passages').ontoggle = (e) => {
        if (e.target.open) {
            e.target.ontoggle = null
            e.target.prepend(
                ...route_tree
                .get_ancestry_of(curr)
                .map(title => past_passage(route_tree.get(title)?.link?.text ?? 'Start', tale.get(title))))
        }
    }

    return template
}

function past_passage(choice, psg) {
    const template = clone_template('past_passage_template')

    template.querySelector('.choice--past').innerText = choice
    template.querySelector('.past_passage__text').append(psg.render().querySelector('.body.content'))

    return template
}

function passage_tag_viewer(tags) {
    const tag_viewer = clone_template('tag_viewer_template')
    tag_viewer.querySelector('.tag_list').tags(tags)

    return tag_viewer
}

function inline_tag_viewer(passage_tags, route_tags) {
    const tag_viewer = clone_template('inline_tag_viewer_template')
    tag_viewer.querySelector('.tag_list--passage').tags(passage_tags)
    tag_viewer.querySelector('.tag_list--route').tags(route_tags)

    return tag_viewer
}


/// Devious Digitizer ///

function gather_tags(passage_name, route_tree, recursive = false) {
    const node = route_tree.get(passage_name)
    if (!recursive) {
        return node.tags
    }
    if (node.cum_tags) {
        return node.cum_tags
    } else {
        return array_unique([...node.tags, ...node.children.flatMap(child => gather_tags(child, route_tree, true))])
    }
}

async function switch_to_story(file) {
    // TODO? clear previous twine elements to allow for loading more than one story
    const story_text = await file.text()
    const story_doc = parse_doc(story_text)

    // is document one of DW or DM?
    if (!story_doc.querySelector('#storeArea > [tiddler = "CharGenMain"]')) {
        const confirm_continue = await ask_to_confirm(file.name)
        if (!confirm_continue) {
            return
    }}

    hide_landing()
    load_doc_into_dom(story_doc)
    await inject_digitizer_features()
}

function hide_landing() {
    document.querySelector('.digitizer-landing').classList.add('digitizer-landing--inactive')
}

// modal prompt: "file does not appear to be a Devious World or Devious Mundanity file".
//      options: cancel (return false), try anyway (return true), clicking away is same as cancel
async function ask_to_confirm(filename) {
    return new Promise((res, rej) => {
        const respond = response => (e, self) => {
            self._dialog.dispatchEvent(Overlay.close_request)
            res(response)
        }

        new Overlay({action: respond(false)}, [
            new Dialog(
                `${filename} does not appear to be a Devious World or Devious Mundanity file.`,
                [
                    {text:'Cancel', action: respond(false), classes: ['dialog__button--suggested']},
                    {text:'Try Anyway', action: respond(true)},
                ])._dialog]
        ).open(document.body)
    })
}

function load_doc_into_dom(doc) {
    document.head.insertAdjacentHTML("beforeend", doc.head.innerHTML)
    document.body.insertAdjacentHTML("beforeend", doc.body.innerHTML)

    // prevent engine script from running multiple times?
    document.head.querySelectorAll('script').forEach(s => eval(s.text))
    dispatchEvent(new Event('load'))
}

async function inject_digitizer_features () {
    const store = document.getElementById('storeArea')
    const passages = document.getElementById('passages')
    const tale = window.tale

    // determine whether this is DW or DM by checking which character starts are present
    const DWChars = ['allstarstart', 'youngpunkstart', 'quietonestart', 'runawaystart', 'GwynStart', 'BuddyStart', 'AustinStart', 'DavidStart', 'JackStart', 'MikeStart', 'ThaddeusStart', 'SweetKidStart', 'MeanGirlStart', 'GirlGamerStart', 'SelfSufficientStart', 'CallistaStart', 'BritStart', 'WilmaStart', 'HollyStart', 'CelesteStart', 'HelenStart', 'MareiStart', 'IreneStart']
    const DMChars = ['CaliburnStart', 'DefianceStart', 'EdithStart', 'FionaStart', 'IrethStart', 'KaiStart', 'KiaraStart', 'KonkoStart', 'LeoStart', 'MaxiaStart', 'NicholasStart', 'SimoneStart', 'SiphaStart', 'ValerieStart', 'YamiStart']
    // const hasPassage = psgName => store.querySelector(`[tiddler="${psgName}"]`) !== null
    const metadataPath = DWChars.some(tale.has, tale) ? 'data/DW_metadata.json' :
                         DMChars.some(tale.has, tale) ? 'data/DM_metadata.json' :
                                                    err('Story is neither Worldly nor Mundane')
    // fetch the relevant metadata file from the server
    const metadata = await fetch(metadataPath).then(res => res.json())

    // build a graph from passages' links
    const passage_graph = build_passage_graph(store)

    // render the graph into a tree of story routes by following links starting at CharGenMain and dropping cycles
    const route_tree = Tree.from_graph_bfs(
        (addChild, currentChild) => passage_graph.forEachLinkedNode(
            currentChild,
            (child, link) => addChild(child.id, Object.assign({link: link.data}, child.data)),
            true // only traverse outbound links
        ),
        'CharGenMain'
    )
    // decorate route_tree with tags and other metadata
    route_tree.forEach((value, key) => route_tree.set(key, Object.assign(value, metadata[key])))

    // dispatch events when switching passages
    window.state.display = function (title, source, type, callback) {
        passages.dispatchEvent(new CustomEvent(
            'before_tale_display',
            {detail: {title, source, type, callback}}))
        Object.getPrototypeOf(window.state).display.apply(this, [title, source, type, callback])
        passages.dispatchEvent(new CustomEvent(
            'after_tale_display',
            {detail: {title, source, type, callback}}))
    }

    // (Twine conveniently cleans out the previous passage's viewers while removing the previous passage)
    passages.addEventListener(
        'after_tale_display',
        (e) => {
            const curr = e.detail.title
            // if we have metadata for current passage
            if (route_tree.has(curr)) {
                // above passage, add a viewer for current passage's tags and
                passages.prepend(passage_tag_viewer(gather_tags(curr, route_tree)))
                // if the current passage has preceding passages
                if (route_tree.get(curr).parent)
                    // a retrospective of preceding passages
                    passages.prepend(retrospective(curr, route_tree, tale))
            }
        }
    )

    // add target passage name to passage links to assist in adding the inline tag viewers
    passages.addEventListener(
        'after_tale_display',
        (e) => annotate_links_with_their_target(e.detail.title, tale, passages.querySelector('.passage.transition-in > .body'))
    )

    // add inline tag viewer elements to new passages
    passages.addEventListener(
        'after_tale_display',
        (e) => add_link_tag_lists(passages.querySelector('.passage.transition-in > .body'), route_tree)
    )

    //document.body.addEventListener('mousedown', e => closeUnfocusedTagViewers(e.clientX, e.clientY))

    // Add sidebar links //
    const settings_link = el('li', null, el('a', {onclick: _ => show_settings(route_tree)}, 'Digitizer Settings'))
    document.getElementById('sidebar').append(settings_link)
}

function show_settings(route_tree) {
    const close_action = (_, self) => self._dialog.dispatchEvent(Overlay.close_request)
    new Overlay({action: (e, self) => self.close()},
        [(new SettingsDialog(route_tree, close_action))._dialog]
    ).open(document.body)
}

const getLinks = body => 
    Array.from(body.matchAll(/\[\[(?:([^|]+)\|)?([^\]]+)\]\]/g)).map(([_, text,  target]) => ({ text, target }))

// TODO? rewrite using tale instead of store_area
function build_passage_graph(store_area) {
    const g = createGraph()

    const passage_names = new Set(Array.from(store_area.children).map((el) => el.getAttribute('tiddler')))

    for (const passage of store_area.children) {
        const passage_name = passage.getAttribute('tiddler')

        for (const { text, target } of getLinks(passage.innerText)) {
            // only include links to passages that exist
            if (passage_names.has(target)) {
                // create a link between the current and target passages, creating a node for the
                //   target passage if one does not yet exist, and annotating the link with its text
                g.addLink(passage_name, target, { text })
            }
        }
    }

    return g
}

// function closeUnfocusedTagViewers(x, y) {
//     document.querySelectorAll('.tag_viewer').forEach(el => {
//         if (!el.contains(document.elementFromPoint(x, y))) {
//             el.open = false
//         }
//     })
// }

function annotate_links_with_their_target(passage_name, tale, passage_body) {
    const link_targets = getLinks(tale.get(passage_name).text).map(({target}) => target)
    const links = Array.from(passage_body.querySelectorAll('a'))

    zip([links, link_targets]).forEach(([link, target]) => link.setAttribute('data-target', target))
}

function add_link_tag_lists(passage_body, route_tree) {
    passage_body
        .querySelectorAll('a')
        .forEach((link) => {
            const passage_name = link.getAttribute('data-target') // NOTE depends on annotate_links_with_their_target
            // if target passage exists
            if (route_tree.has(passage_name)) {
                link.before( inline_tag_viewer(
                    gather_tags(passage_name, route_tree, false),
                    gather_tags(passage_name, route_tree, true)
                ))
            }
        })
}

function extract_metadata(route_tree) {
    const exclude = new Set(['children', 'parent', 'link'])
    const strip = value => filter_object_by_key(value, key => !exclude.has(key))

    return route_tree.to_object(([key, value]) => [key, strip(value)])
}