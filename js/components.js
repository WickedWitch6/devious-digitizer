// import * as petit from 'petit-dom'
// const el = petit.h
// const render = (parent, child, opts) => petit.render(child, parent, opts)

// import { el, mount } from 'redom'

import { el } from 'attodom'
import { nanoid } from 'nanoid'
import { flow, setClass, clone_template_from } from './utilities.js'

import flyd from 'flyd'
import { dropRepeats } from 'flyd/module/droprepeats'
const { stream } = flyd
const combine = (streams, fn) => flyd.combine(fn, streams)
const update = (s, fn) => s(fn(s()))
//const sideEffect = flyd.curryN(2, (fn, s) => flyd.map(x => {fn(x); return x;}, s))


// TODO this file should not be using the global document variable
const clone_template = clone_template_from(document)

const updateAttribute = (srm, attr, obj) => flow(
    srm,
    dropRepeats,
    flyd.on(x => obj.getAttribute(attr) === x ? null : obj.setAttribute(attr, x))
)


//// Web Components ////

export class ClosingDetails extends HTMLDetailsElement {
    constructor() {
        super()

        this._closeIfUnfocused = (e) => {
            if (!this.contains(document.elementFromPoint(e.clientX, e.clientY))) {
                this.open = false
            }
        }
    }

    connectedCallback() {
        document.body.addEventListener('mousedown', this._closeIfUnfocused)
    }

    disconnectedCallback () {
        document.body.removeEventListener('mousedown', this._closeIfUnfocused)
    }
}

export class TabPanel extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({mode: 'open'})
        this.shadowRoot.append(
            el('style', null, ':host {display: none;} :host(.active) {display: block;}'),
            el('div', {role: 'tabpanel'}, el('slot'))
        )
    }

    connectedCallback() {
        this.title(this.getAttribute('title') ?? '')
        this.group(this.parentElement instanceof TabGroup ? this.parentElement : null)
        this.id = this.id || nanoid(10)
    }

    static get observedAttributes() { return ['id', 'title']; }
    attributeChangedCallback(name, oldVal, newVal) {
        if (name === 'id') { this.idChanged(null) }
        else if (name === 'title') { this.title(newVal) }
    }

    idChanged = stream(null)
    title = stream()
    _onTitleChanged = updateAttribute(this.title, 'title', this)
    group = stream()
    active = combine([this.group.chain(g => g?.active), this.idChanged], (gActive, _) => {
        const active = gActive() === this.id
        setClass(this, 'active', active)
        return active
    })
}


export class TabGroup extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({mode: 'open'})
        this.shadowRoot.append(
            // NOTE some DD-specific styling is shoved in here to avoid using ::part or excessive css custom properties
            el('style', null, `
                #tabgroup {display: flex; flex-flow: var(--tabs-position, column) nowrap; gap: var(--tablist-gap, 0);}
                #tablist {display: flex; flex-flow: var(--tabs-flow, row wrap); margin: 0; padding: 0; gap: var(--tabs-gap, .5em);}
                .tab { background: var(--tab-background); }
                .tab { display: block; border-radius: 0 0 .3em .3em; padding: .5em; line-height: unset; cursor: pointer;
                    border: solid var(--tab-background); border-width: 0 1px 1px 1px; }
                .tab.active { background: var(--tab-active-background); }`
            ),
            el('div', {part: 'tabgroup', role: 'wrapper', id: 'tabgroup'}, [
                el('slot'),
                el('menu', {part: 'tablist', role: 'tablist', id: 'tablist'})]
            )
        )
        this.shadowRoot
            .querySelector('slot')
            .addEventListener('slotchange', e => this.tabs(e.target.assignedElements().filter(x => x instanceof TabPanel)))
    }

    static get observedAttributes() { return ['active']; }
    attributeChangedCallback(name, oldVal, newVal) {
        if (name === 'active') { this.active(newVal) }
    }

    defaultTabTitle = ''
    tabs = stream()
    active = stream(null)
    _onActiveChanged = updateAttribute(this.active, 'active', this)

    renderTabList = combine([this.tabs, this.active], (tabs, active) => {
        // if `active` isn't a valid reference to a child tab-panel, default to the first tab-panel
        if (!tabs().some(el => el.id === active())) {
            this.active(tabs()[0]?.id)
            return
        }
        this.shadowRoot.getElementById('tablist').replaceChildren(
            ...tabs().map(tab => el('li', {
                    class: ('tab' + ((active() === tab.id) ? ' active' : '')),
                    onclick: () => this.active(tab.id),
                    'aria-controls': tab.id,
                    role: 'tab',
                },
                tab.title() || this.defaultTabTitle
            ))
        )
    })
}

export class TagList extends HTMLUListElement {
    connectedCallback() {
        this.connected(true)
    }

    connected = stream()

    tags = stream([])

    render = combine([this.tags, this.connected], (tags) =>
        // TODO convert to using attodom.list?
        this.replaceChildren(
            ...tags().sort().map(tag => el('li', {class: 'tag_list__tag'}, tag))
        )
    )
}


/// Other Components ///

export class Overlay {
    constructor({classes = [], attributes = new Map(), action}, children = []) {
        const overlay = document.createElement('div')

        //add classes
        classes.forEach(cl => overlay.classList.add(cl))
        overlay.classList.add('overlay')

        // add attributes
        for ([key, value] of attributes.entries()) {
            overlay.setAttribute(key, value)
        }

        // add action for clicking overlay
        if (action) {
            overlay.addEventListener('click', (e) => {if (e.target === overlay) action(e, this)})
        }

        // listen for request to close
        overlay.addEventListener('request_overlay_close', e => {e.stopPropagation(); this.close()})

        // add children
        children.forEach(el => el.classList.add('overlay__child'))
        overlay.append(...children)

        this._overlay = overlay
    }

    static close_request = new Event('request_overlay_close', {bubbles:true, cancelable:true})

    open(parent) {
        parent.appendChild(this._overlay)
    }

    close() {
        this._overlay.remove()
    }
}

export class Dialog {
    constructor(prompt_text, buttons) {
        const dialog = clone_template('dialog_template')
        this._dialog = dialog.querySelector('.dialog')

        dialog.querySelector('.dialog__prompt').innerText = prompt_text

        for (const button_spec of buttons) {
            const button = document.createElement('button')
            button.setAttribute('type', 'button')
            button.innerText = button_spec.text;
            ['button','dialog__button'].concat(button_spec.classes ?? []).forEach((c) => button.classList.add(c))
            button.addEventListener('click', (e) => button_spec.action(e, this))
            dialog.querySelector('.dialog__buttons').appendChild(button)
        }
    }
}