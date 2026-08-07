// import * as petit from 'petit-dom'
// const el = petit.h
// const render = (parent, child, opts) => petit.render(child, parent, opts)

// import { el, mount } from 'redom'

import { el } from 'attodom'
import { nanoid } from 'nanoid'
import { pipe, setClass, sleep } from './utilities.js'

import flyd from 'flyd'
import { dropRepeats } from 'flyd/module/droprepeats'
const { stream } = flyd
const combine = (streams, fn) => flyd.combine(fn, streams)
const update = (s, fn) => s(fn(s()))
//const sideEffect = flyd.curryN(2, (fn, s) => flyd.map(x => {fn(x); return x;}, s))


const updateAttribute = (srm, attr, obj) => pipe(
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

// TODO respond to `disabled` attribute
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

// TODO respond to `disabled` attribute on TabPanels
export class TabGroup extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({mode: 'open'})
        this.shadowRoot.append(
            el('style', null, `
                #tabgroup { display: flex; flex-flow: var(--tabs-position, column) nowrap; gap: var(--tablist-gap, 0); }
                #tablist { display: flex; flex-flow: var(--tabs-flow, row wrap); align-items: var(--tab-align); margin: 0;
                    padding: 0; gap: var(--tabs-gap, .5em); }
                .tab { display: block; background: var(--tab-background); cursor: var(--tab-cursor); padding: var(--tab-padding);
                    border: var(--tab-border); border-style: var(--tab-border-style); border-color: var(--tab-border-color);
                    border-width: var(--tab-border-width); border-radius: var(--tab-border-radius); }
                .tab.active { background: var(--tab-active-background); border: var(--tab-active-border);
                    border-style: var(--tab-active-border-style); border-color: var(--tab-active-border-color);
                    border-width: var(--tab-active-border-width); border-radius: var(--tab-active-border-radius); }`
            ),
            el('div', {part: 'tabgroup', role: 'wrapper', id: 'tabgroup'}, [
                el('slot'),
                el('menu', {part: 'tablist', role: 'tablist', id: 'tablist'})]
            )
        )
        this.shadowRoot
            .querySelector('slot')
            .addEventListener(
                'slotchange',
                e => this.tabs(e.target.assignedElements().filter(x => x instanceof TabPanel))
            )
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

export class ModalOverlay extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({mode: 'open'})
        this.shadowRoot.append(
            el('style', null, `
                #overlay {
                    display: var(--overlay-display, flex); flex-flow: column nowrap; justify-content: safe center;
                    align-items: center;

                    position: fixed; z-index: 1; left: 0; top: 0; width: 100%; height: 100%;
                    overflow: auto;

                    background-color: var(--overlay-color, rgba(0,0,0,0.4));
                }`
            ),
            el('div', {id: 'overlay'}, [el('slot')]),
        )
        this.addEventListener('request_overlay_close', e => {e.stopPropagation(); this.close()})
    }
    
    static closeRequest = new Event('request_overlay_close', {bubbles:true, cancelable:true})

    open(parent) {
        parent.appendChild(this._overlay)
    }
    
    close() { this.remove() }
}

export class DialogPrompt extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({mode: 'open'})
        this.shadowRoot.append(
            el('style', null, `
                #dialog {
                    background-color: var(--dialog-color, grey); padding: var(--dialog-padding, 2em);
                    border: var(--dialog-border); border-radius: var(--dialog-border-radius);
                }

                #buttons {
                    display: flex; flex-flow: row wrap; justify-content: space-around;
                    align-items: center; align-content: space-around; border: none;
                }`
            ),
            el('form', {id: 'dialog', onsubmit: _ => false}, [
                el('slot', {name: 'prompt'}),
                el('fieldset', {id: 'buttons'}, [el('slot', {name: 'buttons'})])
            ]),
        )
    }
}

export class Toast extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({mode: 'open'})
        this.shadowRoot.append(
            el('style', null, `
                @keyframes fadeOut {
                    from {opacity: 1;}
                    to {opacity: 0;}
                }
                
                #toast {
                    background-color: var(--toast-color, grey); padding: var(--toast-padding, 2em);
                    border: var(--toast-border); border-radius: var(--toast-border-radius);
                    position: fixed; z-index: 1; left: 50%; bottom: 25%; transform: -50%;
                }
                
                #toast.fade {
                    animation: fadeOut 1s ease-in;
                }` // TODO make fade out time customizable
            ),
            el('p', {id:'toast'}),
        )
        
        this.shadowRoot.getElementById('toast').addEventListener(
            'animationend',
            e => {if (e.animationName === 'fadeOut') this.remove()}
        )
    }
    
    connectedCallback() {
        const toast = this.shadowRoot.getElementById('toast')
        toast.textContent = this.getAttribute('text')
        sleep(Number(this.getAttribute('linger-time')) * 1000)
            .then(_ => toast.classList.add('fade'))
    }
}
