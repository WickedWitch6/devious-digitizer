import { saveAs } from 'file-saver'
import { readKey, encrypt, createMessage } from 'openpgp'

export const equal = (x, y) => x === y

export const setClass = (elem, cl, bool) => bool ? elem.classList.add(cl) : elem.classList.remove(cl)

export const err = (...args) => {throw new Error(...args)}

export const sleep = ms => new Promise(res => setTimeout(res, ms))

export const pipe = (x, ...fns) => fns.reduce((acc, fn) => fn(acc), x)

export const flow = (...fns) => x => fns.reduce((acc, fn) => fn(acc), x)

export const zip = rows => rows[0].map( (_,c) => rows.map( row => row[c] ))

export function setUnion(...sets) {
    const union = new Set(sets.shift())
    for (const currSet of sets) {
        for (const elem of currSet) {
            union.add(elem)
        }
    }
    return union
}

export const arrayUnique = (arr) => Array.from(new Set(arr))

export function filterObjectByEntry(obj, pred) {
    return Object.fromEntries(Object.entries(obj).filter(pred))
}

export function filterObjectByKey(obj, pred) {
    return filterObjectByEntry(obj, ([key, _]) => pred(key))
}

export const substituteText =
    (template, context) => template.replaceAll(/{(\w+)}/g, (match, key) => context[key] ?? match)

export class Tree extends Map {
    constructor(root, attributes = {}) {
        super()

        if (root) {this.setRoot(root, attributes)}
    }

    root = null

    setRoot(node, attributes = {}) {
        if (this.root !== null) throw new Error(`root '${this.root}' already exists`)
        this.set(node, Object.assign(attributes, {children: [], parent: null}))
        this.root = node
    }

    addChild(parent, child, attributes = {}) {
        if (this.get(child) !== undefined) {throw new Error(`child ${child} already exists`)}
        this.get(parent)?.children?.push(child) ?? err(`parent '${parent}' does not exist or is malformed`)
        this.set(child, Object.assign(attributes, {children: [], parent: parent}))
    }

    deleteNode(node) {
        for (const child of this.get(node).children) {
            this.deleteNode(child)
        }
        this.delete(node)
    }

    toObject(morphism) {
        if (typeof(morphism) === 'function') {
            return Object.fromEntries(Array.from(this, morphism))
        } else {
            return Object.fromEntries(this)
        }
    }

    getAncestryOf(node) {
        const ancestry = []
        let parent = this.get(node).parent
        while (parent !== null) {
            ancestry.unshift(parent)
            parent = this.get(parent).parent
        }
        return ancestry
    }

    // I don't trust this algorithm. Does it have bugs? Is it efficient? Does it cover all edge
    //   cases? No clue. But it's not recursive.
    // Collapses `tree` into a single value using an accumulator function `f` (similar to `reduce`)
    //   optionally starting at subtree `node`. `f` is passed each node except the node's
    //   `children` attribute instead holds the results of applying `f` to the node's children.
    static cata(tree, node = null, f) {
        const newLayer = node => ({node, before: [...tree.get(node).children], after: []})
        const stack = [newLayer(node ?? tree.root)]

        while (true) {
            if (stack.at(-1).before.length) {
                stack.push(newLayer(stack.at(-1).before.pop()))
            } else {
                const curr = stack.pop()
                const res = f({...tree.get(curr.node), children: curr.after})
                if (!stack.length) return res
                stack.at(-1).after.push(res)
            }
        }
    }

    static fromGraphBfs(getChildren, root) {
        const tree = new Tree(root)
        const frontier = [root]

        const addChildOf = (currentNode) => (id, data = {}) => {
            if (!tree.has(id)) {
                frontier.push(id)
                tree.addChild(currentNode, id, data)
            }
        }

        while (frontier.length > 0) {
            const currentNode = frontier.pop()
            getChildren(addChildOf(currentNode), currentNode)
        }
        return tree
    }
}

/// HTML ///

export const cloneTemplateFrom = (doc) => (templateId) => {
    // NOTE importNode works like cloneNode except it upgrades custom elements. Needed because
    //   it works on template contents, unlike customElements.upgrade.
    const template = doc.importNode(doc.getElementById(templateId).content, true)
    // clear the fragment of extraneous nodes that might break things
    // TODO Apply recursively to comments
    Array.from(template.childNodes).forEach(el => {
        if ((el.nodeName === '#text' && !el.nodeValue.trim()) || el.nodeName === '#comment') {el.remove()}
    })
    return template
}

export function parseDoc(docText) {
    return new DOMParser().parseFromString(docText, "text/html")
}

export function exportObject(obj, filename) {
    saveAs(new Blob([JSON.stringify(obj)], {type: 'application/json'}), filename)
}

export async function encryptMessage(armoredPublicKey, text) {
    return await encrypt({
        message: await createMessage({text}),
        encryptionKeys: await readKey({armoredKey: armoredPublicKey})
    })
}