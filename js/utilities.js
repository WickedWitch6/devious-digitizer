import { saveAs } from 'file-saver'

export const equal = (x, y) => x === y

export const setClass = (elem, cl, bool) => bool ? elem.classList.add(cl) : elem.classList.remove(cl)

export const err = (...args) => {throw new Error(...args)}

export const flow = (x, ...fns) => fns.reduce((acc, fn) => fn(acc), x)

export const pipe = (...fns) => x => fns.reduce((acc, fn) => fn(acc), x)

export const zip = rows => rows[0].map( (_,c) => rows.map( row => row[c] ))

export function set_union(...sets) {
    const union = new Set(sets.shift())
    for (const curr_set of sets) {
        for (const elem of curr_set) {
            union.add(elem)
        }
    }
    return union
}

export const array_unique = (arr) => Array.from(new Set(arr))

export function filter_object_by_entry(obj, pred) {
    return Object.fromEntries(Object.entries(obj).filter(pred))
}

export function filter_object_by_key(obj, pred) {
    return filter_object_by_entry(obj, ([key, _]) => pred(key))
}

// const get_ancestry_of = (tree) => (node) => {
    // const parent = tree.get(node).parent
    // if (parent === null) {
        // return []
    // } else {
        // return [parent, ...get_ancestry_of(tree)(parent)]
    // }
// }

export class Tree extends Map {
    constructor(root) {
        super()
        
        // this._set = Map.prototype.set
        // this._delete = Map.prototype.delete
        if (root) {this.set_root(root)}
    }
    
    root = null
    
    // get set() {}
    
    // get delete() {}
    
    set_root(node, attributes = {}) {
        if (this.root !== null) throw new Error(`root '${this.root}' already exists`)
        this.set(node, Object.assign(attributes, {children: [], parent: null}))
        this.root = node
    }
    
    add_child(parent, child, attributes = {}) {
        if (this.get(child) !== undefined) {throw new Error(`child ${child} already exists`)}
        this.get(parent)?.children?.push(child) ?? err(`parent '${parent}' does not exist or is malformed`)
        this.set(child, Object.assign(attributes, {children: [], parent: parent}))
    }
    
    delete_node(node) {
        for (child of this.get(node).children) {
            this.delete_node(child)
        }
        this.delete(node)
    }
    
    to_object(morphism) {
        if (typeof(morphism) === 'function') {
            return Object.fromEntries(Array.from(this, morphism))
        } else {
            return Object.fromEntries(this)
        }
    }
    
    get_ancestry_of(node) {
        const ancestry = []
        let parent = this.get(node).parent
        while (parent !== null) {
            ancestry.unshift(parent)
            parent = this.get(parent).parent
        }
        return ancestry
    }

    static from_graph_bfs(getChildren, root) {
        const tree = new Tree(root)
        const frontier = [root]
        
        const addChildOf = (currentNode) => (id, data = {}) => {
            if (!tree.has(id)) {
                frontier.push(id)
                tree.add_child(currentNode, id, data)
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

export const clone_template_from = (doc) => (template_id) => {
    // NOTE importNode works like cloneNode except it upgrades custom elements. Needed because
    //   it works on template contents, unlike customElements.upgrade.
    const template = doc.importNode(doc.getElementById(template_id).content, true)
    // clear the fragment of extraneous nodes that might break things
    // TODO Apply recursively to comments
    Array.from(template.childNodes).forEach(el => {
        if ((el.nodeName === '#text' && !el.nodeValue.trim()) || el.nodeName === '#comment') {el.remove()}
    })
    return template
}

export function parse_doc(doc_text) {
    return new DOMParser().parseFromString(doc_text, "text/html")
}

export function export_object(obj, filename) {
    saveAs(new Blob([JSON.stringify(obj)], {type: 'application/json'}), filename)
}