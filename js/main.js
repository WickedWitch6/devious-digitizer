import { el } from 'attodom'
const createGraph = require('ngraph.graph')
import { ClosingDetails, TabPanel, TabGroup, TagList, ModalOverlay, DialogPrompt, Toast,
          } from './components.js'
import { err, zip, equal, arrayUnique, filterObjectByKey, substituteText, Tree, bfsTree,
          cloneTemplateFrom, parseDoc, exportObject } from './utilities.js'

const cloneTemplate = cloneTemplateFrom(document)

customElements.define('closing-details', ClosingDetails, {extends: 'details'})
customElements.define('tab-panel', TabPanel)
customElements.define('tab-group', TabGroup)
customElements.define('tag-list', TagList, {extends: 'ul'})
customElements.define('modal-overlay', ModalOverlay)
customElements.define('dialog-prompt', DialogPrompt)
customElements.define('toast-box', Toast)

document.getElementById('file_select').addEventListener('change', e => switchToStory(e.target.files[0]))

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
    if (e.dataTransfer.files) switchToStory(e.dataTransfer.files[0])
})


/// TEMPLATES ///

// FIX fadeTime is unimplemented
function toast(text, lingerTime = 3, fadeTime = 1) {
    const toast = document.createElement('toast-box')
    toast.setAttribute('text', text)
    toast.setAttribute('linger-time', lingerTime)
    //toast.setAttribute('fade-time', fadeTime)
    return toast
}

function sidebarMenu(tale, state, routeTree, userAgent) {
    const template = cloneTemplate('sidebar_menu_template')

    template.querySelector('.settings_link').addEventListener(
        'click',
        _ => document.body.append(settings(state.history[0].passage.title, routeTree))
    )

    return template
}

function settings(curr, routeTree) {
    const template = cloneTemplate('settings_template')

    const close = e => {
        if (e.target == e.currentTarget) e.target.dispatchEvent(ModalOverlay.closeRequest)
    }
    template.querySelector('modal-overlay').addEventListener('click', close)
    template.querySelector('.close_settings').addEventListener('click', close)

    const tagEditor = template.querySelector('.tag_editor')
    tagEditor.value = gatherTags(curr, routeTree).join(' ')

    template.querySelector('.save_tags').addEventListener('click', _ => {
        const psg = routeTree.get(curr)
        if (psg) psg.modifiedTags = tagEditor.value.split(' ')
        document.body.append(toast("tags saved!", 2))
    })

    // TODO? Add "revert tags" button

    template.querySelector('.export_metadata').addEventListener('click', _ =>
        exportObject(extractMetadata(routeTree), 'metadata.json'))

    return template
}

// modal prompt: "file does not appear to be a Devious World or Devious Mundanity file".
//      options: cancel (return false), try anyway (return true), clicking away is same as cancel
async function askToConfirm(filename) {
    return new Promise((res, rej) => {
        const respond = response => e => {
            if (e.target == e.currentTarget) {
                e.target.dispatchEvent(ModalOverlay.closeRequest)
                res(response)
            }
        }
        
        const template = cloneTemplate('confirmation_template')
        
        const prompt = template.querySelector('.confirm_prompt')
        prompt.textContent = substituteText(prompt.textContent, {filename})
        template.querySelector('modal-overlay').addEventListener('click', respond(false))
        template.querySelector('.cancel').addEventListener('click', respond(false))
        template.querySelector('.try_anyway').addEventListener('click', respond(true))
        
        document.body.append(template)
    })
}

function feedback() {
    const template = cloneTemplate('feedback_template')

    const close = e => {
        if (e.target == e.currentTarget) e.target.dispatchEvent(ModalOverlay.closeRequest)
    }
    template.querySelector('modal-overlay').addEventListener('click', close)
    template.querySelector('.close_feedback').addEventListener('click', close)
    
    return template
}

function retrospective(curr, routeTree, tale) {
    const template = cloneTemplate('retrospective_template')

    template.querySelector('.choice--current').innerText = routeTree.get(curr)?.link?.text ?? ''

    template.querySelector('.past_passages').ontoggle = (e) => {
        if (e.target.open) {
            e.target.ontoggle = null
            e.target.prepend(
                ...routeTree
                .getAncestryOf(curr)
                .map(title => pastPassage(routeTree.get(title)?.link?.text ?? 'Start', tale.get(title))))
        }
    }

    return template
}

function pastPassage(choice, psg) {
    const template = cloneTemplate('past_passage_template')

    template.querySelector('.choice--past').innerText = choice
    template.querySelector('.past_passage__text').append(psg.render().querySelector('.body.content'))

    return template
}

function passageTagViewer(tags) {
    const tagViewer = cloneTemplate('tag_viewer_template')
    tagViewer.querySelector('.tag_list').tags(tags)

    return tagViewer
}

function inlineTagViewer(passageTags, routeTags) {
    const tagViewer = cloneTemplate('inline_tag_viewer_template')
    tagViewer.querySelector('.tag_list--passage').tags(passageTags)
    tagViewer.querySelector('.tag_list--route').tags(routeTags)

    return tagViewer
}


/// Devious Digitizer ///

function gatherTags(title, routeTree, recursive = false) {
    if (!recursive) return routeTree.get(title)?.modifiedTags ?? routeTree.get(title)?.tags ?? []
    return arrayUnique(
        Tree.cata(
            routeTree,
            title,
            node => (node.modifiedTags ?? node.tags ?? []).concat(...node.children)
        )
    )
        // arrayUnique([...(node.tags ?? []), ...node.children.flatMap(child => gatherTags(child, routeTree, true))])
}


function gatherTagChanges(routeTree) {
    return JSON.stringify(
        Object.fromEntries(
            [...routeTree]
            .filter(([k,v]) => v.hasOwnProperty('modifiedTags'))
            .map(([k,v]) => [k, v.modifiedTags])
        ),
        null,
        2,
    )
}

async function switchToStory(file) {
    // TODO? clear previous twine elements to allow for loading more than one story
    const storyText = await file.text()
    const storyDoc = parseDoc(storyText)

    // is document one of DW or DM?
    if (!storyDoc.querySelector('#storeArea > [tiddler = "CharGenMain"]')) {
        const confirmContinue = await askToConfirm(file.name)
        if (!confirmContinue) return;
    }

    hideLanding()
    loadDocIntoDom(storyDoc)
    await injectDigitizerFeatures()
}

function hideLanding() {
    document.querySelector('.digitizer-landing').classList.add('digitizer-landing--inactive')
}

function loadDocIntoDom(doc) {
    document.head.insertAdjacentHTML("beforeend", doc.head.innerHTML)
    document.body.insertAdjacentHTML("beforeend", doc.body.innerHTML)

    // prevent engine script from running multiple times?
    document.head.querySelectorAll('script').forEach(s => eval(s.text))
    dispatchEvent(new Event('load'))
}

async function injectDigitizerFeatures () {
    const store = document.getElementById('storeArea')
    const passages = document.getElementById('passages')
    const tale = window.tale
    const state = window.state

    // determine whether this is DW or DM by checking which character starts are present
    const DWChars = ['allstarstart', 'youngpunkstart', 'quietonestart', 'runawaystart', 'GwynStart', 'BuddyStart', 'AustinStart', 'DavidStart', 'JackStart', 'MikeStart', 'ThaddeusStart', 'SweetKidStart', 'MeanGirlStart', 'GirlGamerStart', 'SelfSufficientStart', 'CallistaStart', 'BritStart', 'WilmaStart', 'HollyStart', 'CelesteStart', 'HelenStart', 'MareiStart', 'IreneStart']
    const DMChars = ['CaliburnStart', 'DefianceStart', 'EdithStart', 'FionaStart', 'IrethStart', 'KaiStart', 'KiaraStart', 'KonkoStart', 'LeoStart', 'MaxiaStart', 'NicholasStart', 'SimoneStart', 'SiphaStart', 'ValerieStart', 'YamiStart']
    const metadataPath = DWChars.some(tale.has, tale) ? 'data/DW_metadata.json' :
                         DMChars.some(tale.has, tale) ? 'data/DM_metadata.json' :
                                                    err('Story is neither Worldly nor Mundane')
    // fetch the relevant metadata file from the server
    const metadata = await fetch(metadataPath).then(res => res.json())

    // build a graph from passages' links
    const passageGraph = buildPassageGraph(store)

    // render the graph into a tree of story routes by following links starting at CharGenMain and dropping cycles
    const routeTree = Tree.fromGraphBfs(
        (addChild, currentChild) => passageGraph.forEachLinkedNode(
            currentChild,
            (child, link) => addChild(child.id, Object.assign({link: link.data}, child.data)),
            true // only traverse outbound links
        ),
        'CharGenMain'
    )
    // decorate routeTree with tags and other metadata
    routeTree.forEach((value, key) => routeTree.set(key, Object.assign(value, metadata[key])))

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
            if (routeTree.has(curr)) {
                // above passage, add a viewer for current passage's tags and
                passages.prepend(passageTagViewer(gatherTags(curr, routeTree)))
                // if the current passage has preceding passages
                if (routeTree.get(curr).parent)
                    // a retrospective of preceding passages
                    passages.prepend(retrospective(curr, routeTree, tale))
            }
        }
    )

    // add target passage name to passage links to assist in adding the inline tag viewers
    passages.addEventListener(
        'after_tale_display',
        (e) => annotateLinksWithTheirTarget(e.detail.title, tale, passages.querySelector('.passage.transition-in > .body'))
    )

    // add inline tag viewer elements to new passages
    passages.addEventListener(
        'after_tale_display',
        (e) => addLinkTagLists(passages.querySelector('.passage.transition-in > .body'), routeTree)
    )

    // Add sidebar links //
    document.getElementById('sidebar').append(sidebarMenu(tale, state, routeTree, navigator.userAgent))
}

const getLinks = body =>
    Array.from(body.matchAll(/\[\[(?:([^|]+)\|)?([^\]]+)\]\]/g)).map(([_, text,  target]) => ({ text, target }))

// TODO? rewrite using tale instead of storeArea
function buildPassageGraph(storeArea) {
    const g = createGraph()

    const titles = new Set(Array.from(storeArea.children).map((el) => el.getAttribute('tiddler')))

    for (const passage of storeArea.children) {
        const title = passage.getAttribute('tiddler')

        for (const { text, target } of getLinks(passage.innerText)) {
            // only include links to passages that exist
            if (titles.has(target)) {
                // create a link between the current and target passages, creating a node for the
                //   target passage if one does not yet exist, and annotating the link with its text
                g.addLink(title, target, { text })
            }
        }
    }

    return g
}

function annotateLinksWithTheirTarget(title, tale, passageBody) {
    const linkTargets = getLinks(tale.get(title).text).map(({target}) => target)
    const links = Array.from(passageBody.querySelectorAll('a'))

    zip([links, linkTargets]).forEach(([link, target]) => link.setAttribute('data-target', target))
}

function addLinkTagLists(passageBody, routeTree) {
    passageBody
        .querySelectorAll('a')
        .forEach((link) => {
            const title = link.getAttribute('data-target') // NOTE depends on annotateLinksWithTheirTarget
            // if target passage exists
            if (routeTree.has(title)) {
                link.before( inlineTagViewer(
                    gatherTags(title, routeTree, false),
                    gatherTags(title, routeTree, true)
                ))
            }
        })
}

function extractMetadata(routeTree) {
    const include = new Set(['tags'])
    const strip = value => filterObjectByKey(value, key => include.has(key))

    return routeTree.toObject(([key, value]) => [key, strip(value)])
}
