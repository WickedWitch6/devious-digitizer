// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (
  modules,
  entry,
  mainEntry,
  parcelRequireName,
  externals,
  distDir,
  publicUrl,
  devServer
) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var importMap = previousRequire.i || {};
  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        if (externals[name]) {
          return externals[name];
        }
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        globalObject
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      if (res === false) {
        return {};
      }
      // Synthesize a module to follow re-exports.
      if (Array.isArray(res)) {
        var m = {__esModule: true};
        res.forEach(function (v) {
          var key = v[0];
          var id = v[1];
          var exp = v[2] || v[0];
          var x = newRequire(id);
          if (key === '*') {
            Object.keys(x).forEach(function (key) {
              if (
                key === 'default' ||
                key === '__esModule' ||
                Object.prototype.hasOwnProperty.call(m, key)
              ) {
                return;
              }

              Object.defineProperty(m, key, {
                enumerable: true,
                get: function () {
                  return x[key];
                },
              });
            });
          } else if (exp === '*') {
            Object.defineProperty(m, key, {
              enumerable: true,
              value: x,
            });
          } else {
            Object.defineProperty(m, key, {
              enumerable: true,
              get: function () {
                if (exp === 'default') {
                  return x.__esModule ? x.default : x;
                }
                return x[exp];
              },
            });
          }
        });
        return m;
      }
      return newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.require = nodeRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.distDir = distDir;
  newRequire.publicUrl = publicUrl;
  newRequire.devServer = devServer;
  newRequire.i = importMap;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  // Only insert newRequire.load when it is actually used.
  // The code in this file is linted against ES5, so dynamic import is not allowed.
  // INSERT_LOAD_HERE

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });
    }
  }
})({"agb61":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _nanoid = require("nanoid");
var _componentsJs = require("./components.js");
var _utilitiesJs = require("./utilities.js");
var _pubkeyAsc = require("bundle-text:../pubkey.asc");
var _pubkeyAscDefault = parcelHelpers.interopDefault(_pubkeyAsc);
const createGraph = require("8031d4d3ee222313");
const OBFUSCATED_FORMSPREE_ENDPOINT = "aHR0cHM6Ly9mb3Jtc3ByZWUuaW8vZi9tYmp3cGRwdw==";
const DATA_URL = "https://devious-digitizer-data.netlify.app/";
const cloneTemplate = (0, _utilitiesJs.cloneTemplateFrom)(document);
customElements.define('closing-details', (0, _componentsJs.ClosingDetails), {
    extends: 'details'
});
customElements.define('tab-panel', (0, _componentsJs.TabPanel));
customElements.define('tab-group', (0, _componentsJs.TabGroup));
customElements.define('tag-list', (0, _componentsJs.TagList), {
    extends: 'ul'
});
customElements.define('modal-overlay', (0, _componentsJs.ModalOverlay));
customElements.define('dialog-prompt', (0, _componentsJs.DialogPrompt));
customElements.define('toast-box', (0, _componentsJs.Toast));
//document.getElementById('landing_settings_link').addEventListener(
//    'click',
//    _ => document.body.append(settings(state.history[0].passage.title, routeTree))
//)
document.getElementById('landing_feedback_link').addEventListener('click', (_)=>document.body.append(feedback(null, null, null, navigator.userAgent)));
document.getElementById('landing_privacy_link').addEventListener('click', (_)=>document.body.append(privacy()));
document.getElementById('file_select').addEventListener('change', (e)=>switchToStory(e.target.files[0]));
const dragDropOverlay = document.getElementById('drag_drop_overlay');
document.body.addEventListener('dragenter', (e)=>{
    // TODO make nice drag drop overlay
    // new Overlay(null, ['Drag-and-drop icon goes here'])._overlay.open(document.body)
    e.preventDefault();
});
document.body.addEventListener('dragover', (e)=>e.preventDefault());
document.body.addEventListener('dragleave', (_)=>{
// document.querySelector('.drag_drop_overlay').close()
});
document.body.addEventListener('drop', (e)=>{
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files) switchToStory(e.dataTransfer.files[0]);
});
/// TEMPLATES ///
// FIX fadeTime is unimplemented
function toast(text, lingerTime = 3, fadeTime = 1) {
    const toast1 = document.createElement('toast-box');
    toast1.setAttribute('text', text);
    toast1.setAttribute('linger-time', lingerTime);
    //toast.setAttribute('fade-time', fadeTime)
    return toast1;
}
// modal prompt: "file does not appear to be a Devious World or Devious Mundanity file".
//      options: cancel (return false), try anyway (return true), clicking away is same as cancel
async function askToConfirm(filename) {
    return new Promise((res, rej)=>{
        const respond = (response)=>(e)=>{
                if (e.target == e.currentTarget) {
                    e.target.dispatchEvent((0, _componentsJs.ModalOverlay).closeRequest);
                    res(response);
                }
            };
        const template = cloneTemplate('confirmation_template');
        const prompt = template.querySelector('.confirm_prompt');
        prompt.textContent = (0, _utilitiesJs.substituteText)(prompt.textContent, {
            filename
        });
        template.querySelector('modal-overlay').addEventListener('click', respond(false));
        template.querySelector('.cancel').addEventListener('click', respond(false));
        template.querySelector('.try_anyway').addEventListener('click', respond(true));
        document.body.append(template);
    });
}
function sidebarMenu(tale, state, routeTree, userAgent) {
    const template = cloneTemplate('sidebar_menu_template');
    template.querySelector('.settings_link').addEventListener('click', (_)=>document.body.append(settings(state.history[0].passage.title, routeTree)));
    template.querySelector('.feedback_link').addEventListener('click', (_)=>document.body.append(feedback(tale, state, routeTree, userAgent)));
    template.querySelector('.privacy_link').addEventListener('click', (_)=>document.body.append(privacy()));
    return template;
}
function settings(curr, routeTree) {
    const template = cloneTemplate('settings_template');
    const close = (e)=>{
        if (e.target == e.currentTarget) e.target.dispatchEvent((0, _componentsJs.ModalOverlay).closeRequest);
    };
    template.querySelector('modal-overlay').addEventListener('click', close);
    template.querySelector('.close_settings').addEventListener('click', close);
    const tagEditor = template.querySelector('.tag_editor');
    tagEditor.value = gatherTags(curr, routeTree).join(' ');
    template.querySelector('.save_tags').addEventListener('click', (_)=>{
        const psg = routeTree.get(curr);
        if (psg) psg.modifiedTags = tagEditor.value.split(' ');
        document.body.append(toast("tags saved!", 2));
    });
    // TODO? Add "revert tags" button
    template.querySelector('.export_metadata').addEventListener('click', (_)=>(0, _utilitiesJs.exportObject)(extractMetadata(routeTree), 'metadata.json'));
    return template;
}
// Caches form to make filled-in info persistent
let feedbackForm;
function buildFeedback() {
    const template = cloneTemplate('feedback_template');
    const close = (e)=>{
        if (e.target == e.currentTarget) e.target.dispatchEvent((0, _componentsJs.ModalOverlay).closeRequest);
    };
    template.querySelector('modal-overlay').addEventListener('click', close);
    template.querySelector('.close_feedback').addEventListener('click', close);
    // give a visual indicator that debug_info is being disabled
    const debugInfo = template.querySelector('.debug_info');
    const includeDebugInfo = template.querySelector('.include_debug_info');
    includeDebugInfo.addEventListener('change', (_)=>{
        debugInfo.disabled = !includeDebugInfo.checked;
    });
    const submit = (type)=>(e)=>{
            e.preventDefault();
            const feedbackID = `${type}-${(0, _nanoid.nanoid)(6)}`;
            // disable debug info when requested so it is not included in BUG feedback messages
            debugInfo.disabled = !includeDebugInfo.checked;
            const data = new FormData(e.target);
            data.append('id', feedbackID);
            const subject = `Devious Digitizer Feedback ${feedbackID}`;
            const body = [
                ...data.entries()
            ].map(([k, v])=>`${k}: ${v}`).join('\n\n');
            document.body.append(feedbackPreview(subject, body, e.target));
        };
    template.querySelector('.bug_report').addEventListener('submit', submit('BUG'));
    template.querySelector('.feature_request').addEventListener('submit', submit('REQ'));
    template.querySelector('.help_request').addEventListener('submit', submit('HLP'));
    template.querySelector('.submit_tags').addEventListener('submit', submit('TAG'));
    return template;
}
function feedback(tale, state, routeTree, userAgent) {
    feedbackForm ??= buildFeedback().firstChild;
    feedbackForm.querySelector('.debug_info').textContent = gatherDebugInfo(tale, state, userAgent);
    if (routeTree !== null) feedbackForm.querySelector('.tag_changes').textContent = gatherTagChanges(routeTree);
    return feedbackForm;
}
function feedbackPreview(subject, body, form) {
    const template = cloneTemplate('feedback_preview_template');
    template.querySelector('.subject').textContent = subject;
    template.querySelector('.body').textContent = body;
    const close = (e)=>{
        if (e.target == e.currentTarget) e.target.dispatchEvent((0, _componentsJs.ModalOverlay).closeRequest);
    };
    template.querySelector('modal-overlay').addEventListener('click', close);
    template.querySelector('.cancel').addEventListener('click', close);
    template.querySelector('.submit').addEventListener('click', (e)=>{
        (0, _utilitiesJs.encryptMessage)((0, _pubkeyAscDefault.default), body).then((encryptedBody)=>sendFormspree(subject, encryptedBody)).then((_)=>{
            form.reset();
            e.target.dispatchEvent((0, _componentsJs.ModalOverlay).closeRequest);
            document.body.append(toast("feedback sent successfully ^_^"));
        }).catch((msg)=>alert(`something went wrong:\n${msg}`));
    });
    return template;
}
function privacy() {
    const template = cloneTemplate('privacy_template');
    const close = (e)=>{
        if (e.target == e.currentTarget) e.target.dispatchEvent((0, _componentsJs.ModalOverlay).closeRequest);
    };
    template.querySelector('modal-overlay').addEventListener('click', close);
    template.querySelector('.close_privacy').addEventListener('click', close);
    return template;
}
function retrospective(curr, routeTree, tale) {
    const template = cloneTemplate('retrospective_template');
    template.querySelector('.choice--current').innerText = routeTree.get(curr)?.link?.text ?? '';
    template.querySelector('.past_passages').ontoggle = (e)=>{
        if (e.target.open) {
            e.target.ontoggle = null;
            e.target.prepend(...routeTree.getAncestryOf(curr).map((title)=>pastPassage(routeTree.get(title)?.link?.text ?? 'Start', tale.get(title))));
        }
    };
    return template;
}
function pastPassage(choice, psg) {
    const template = cloneTemplate('past_passage_template');
    template.querySelector('.choice--past').innerText = choice;
    template.querySelector('.past_passage__text').append(psg.render().querySelector('.body.content'));
    return template;
}
function passageTagViewer(tags) {
    const tagViewer = cloneTemplate('tag_viewer_template');
    tagViewer.querySelector('.tag_list').tags(tags);
    return tagViewer;
}
function inlineTagViewer(passageTags, routeTags) {
    const tagViewer = cloneTemplate('inline_tag_viewer_template');
    tagViewer.querySelector('.tag_list--passage').tags(passageTags);
    tagViewer.querySelector('.tag_list--route').tags(routeTags);
    return tagViewer;
}
/// Devious Digitizer ///
function gatherTags(title, routeTree, recursive = false) {
    if (!recursive) return routeTree.get(title)?.modifiedTags ?? routeTree.get(title)?.tags ?? [];
    return (0, _utilitiesJs.arrayUnique)((0, _utilitiesJs.Tree).cata(routeTree, title, (node)=>(node.modifiedTags ?? node.tags ?? []).concat(...node.children)));
// arrayUnique([...(node.tags ?? []), ...node.children.flatMap(child => gatherTags(child, routeTree, true))])
}
async function sendFormspree(subject, body) {
    const data = new FormData();
    data.append('subject', subject);
    data.append('body', body);
    const response = await fetch(atob(OBFUSCATED_FORMSPREE_ENDPOINT), {
        method: 'POST',
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    });
    if (!response.ok) {
        const errMsg = "There was a problem while trying to send your feedback. Please try again in a moment.";
        const data = await response.json();
        if (Object.hasOwn(data, 'errors')) throw new Error(errMsg + data["errors"].map((error)=>error["message"]).join(", "));
        else throw new Error(errMsg);
    }
}
function gatherDebugInfo(tale, state, userAgent) {
    return JSON.stringify({
        userAgent,
        deviousVersion: tale?.title,
        currentPassage: state ? state.history[0].passage.title : null
    }, null, 2);
}
function gatherTagChanges(routeTree) {
    return JSON.stringify(Object.fromEntries([
        ...routeTree
    ].filter(([k, v])=>v.hasOwnProperty('modifiedTags')).map(([k, v])=>[
            k,
            v.modifiedTags
        ])), null, 2);
}
async function switchToStory(file) {
    const storyText = await file.text();
    const storyDoc = (0, _utilitiesJs.parseDoc)(storyText);
    // is document one of DW or DM?
    if (!storyDoc.querySelector('#storeArea > [tiddler = "CharGenMain"]') && !storyDoc.querySelector('#storeArea > [tiddler = "Start"]')) {
        const confirmContinue = await askToConfirm(file.name);
        if (!confirmContinue) return;
    }
    hideLanding();
    loadDocIntoDom(storyDoc);
    await injectDigitizerFeatures();
}
function hideLanding() {
    document.querySelector('.digitizer-landing').classList.add('digitizer-landing--inactive');
}
function loadDocIntoDom(doc) {
    document.head.insertAdjacentHTML("beforeend", doc.head.innerHTML);
    document.body.insertAdjacentHTML("beforeend", doc.body.innerHTML);
    // Defining tiddlerTitle globally circumvents strict mode breaking Twine's scripts
    globalThis.tiddlerTitle = '';
    document.head.querySelectorAll('script[title]').forEach((s)=>eval(s.text));
    dispatchEvent(new Event('load'));
}
async function injectDigitizerFeatures() {
    const store = document.getElementById('storeArea');
    const passages = document.getElementById('passages');
    const tale = window.tale;
    const state = window.state;
    // determine whether this is DW or DM by checking which character starts are present
    const DWChars = [
        'allstarstart',
        'youngpunkstart',
        'quietonestart',
        'runawaystart',
        'GwynStart',
        'BuddyStart',
        'AustinStart',
        'DavidStart',
        'JackStart',
        'MikeStart',
        'ThaddeusStart',
        'SweetKidStart',
        'MeanGirlStart',
        'GirlGamerStart',
        'SelfSufficientStart',
        'CallistaStart',
        'BritStart',
        'WilmaStart',
        'HollyStart',
        'CelesteStart',
        'HelenStart',
        'MareiStart',
        'IreneStart'
    ];
    const DMChars = [
        'CaliburnStart',
        'DefianceStart',
        'EdithStart',
        'FionaStart',
        'IrethStart',
        'KaiStart',
        'KiaraStart',
        'KonkoStart',
        'LeoStart',
        'MaxiaStart',
        'NicholasStart',
        'SimoneStart',
        'SiphaStart',
        'ValerieStart',
        'YamiStart'
    ];
    const metadataName = DWChars.some(tale.has, tale) ? 'DW_metadata.json' : DMChars.some(tale.has, tale) ? 'DM_metadata.json' : (0, _utilitiesJs.err)('Story is neither Worldly nor Mundane');
    // fetch the relevant metadata file from the server
    const metadata = await fetch(DATA_URL + metadataName).then((res)=>res.json());
    // build a graph from passages' links
    const passageGraph = buildPassageGraph(store);
    // render the graph into a tree of story routes by following links starting at CharGenMain and dropping cycles
    const routeTree = (0, _utilitiesJs.Tree).fromGraphBfs((addChild, currentChild)=>passageGraph.forEachLinkedNode(currentChild, // add to tree and frontier unless, child is 'Version History', which breaks the tree. This is a big hack.
        (child, link)=>child.id !== 'Version History' ? addChild(child.id, Object.assign({
                link: link.data
            }, child.data)) : undefined, true // only traverse outbound links
        ), 'Start');
    // decorate routeTree with tags and other metadata
    routeTree.forEach((value, key)=>routeTree.set(key, Object.assign(value, metadata[key])));
    // dispatch events when switching passages
    window.state.display = function(title, source, type, callback) {
        passages.dispatchEvent(new CustomEvent('before_tale_display', {
            detail: {
                title,
                source,
                type,
                callback
            }
        }));
        Object.getPrototypeOf(window.state).display.apply(this, [
            title,
            source,
            type,
            callback
        ]);
        passages.dispatchEvent(new CustomEvent('after_tale_display', {
            detail: {
                title,
                source,
                type,
                callback
            }
        }));
    };
    // (Twine conveniently cleans out the previous passage's viewers while removing the previous passage)
    passages.addEventListener('after_tale_display', (e)=>{
        const curr = e.detail.title;
        // if we have metadata for current passage
        if (routeTree.has(curr)) {
            // above passage, add a viewer for current passage's tags and
            passages.prepend(passageTagViewer(gatherTags(curr, routeTree)));
            // if the current passage has preceding passages
            if (routeTree.get(curr).parent) // a retrospective of preceding passages
            passages.prepend(retrospective(curr, routeTree, tale));
        }
    });
    // add target passage name to passage links to assist in adding the inline tag viewers
    passages.addEventListener('after_tale_display', (e)=>annotateLinksWithTheirTarget(e.detail.title, tale, passages.querySelector('.passage.transition-in > .body')));
    // add inline tag viewer elements to new passages
    passages.addEventListener('after_tale_display', (e)=>addLinkTagLists(passages.querySelector('.passage.transition-in > .body'), routeTree));
    // Add sidebar links //
    document.getElementById('sidebar').append(sidebarMenu(tale, state, routeTree, navigator.userAgent));
}
const getLinks = (body)=>Array.from(body.matchAll(/\[\[(?:([^|]+)\|)?([^\]]+)\]\]/g)).map(([_, text, target])=>({
            text,
            target
        }));
function buildPassageGraph(storeArea) {
    const g = createGraph();
    const titles = new Set(Array.from(storeArea.children).map((el)=>el.getAttribute('tiddler')));
    for (const passage of storeArea.children){
        const title = passage.getAttribute('tiddler');
        for (const { text, target } of getLinks(passage.innerText))// only include links to passages that exist
        if (titles.has(target)) // create a link between the current and target passages, creating a node for the
        //   target passage if one does not yet exist, and annotating the link with its text
        g.addLink(title, target, {
            text
        });
    }
    return g;
}
function annotateLinksWithTheirTarget(title, tale, passageBody) {
    const linkTargets = getLinks(tale.get(title).text).map(({ target })=>target);
    const links = Array.from(passageBody.querySelectorAll('a'));
    for (const [link, target] of (0, _utilitiesJs.take)(100, (0, _utilitiesJs.zip)([
        links,
        linkTargets
    ])))link.setAttribute('data-target', target);
}
function addLinkTagLists(passageBody, routeTree) {
    passageBody.querySelectorAll('a[data-target]').forEach((link)=>{
        const title = link.getAttribute('data-target') // NOTE depends on annotateLinksWithTheirTarget
        ;
        // if target passage exists
        if (routeTree.has(title)) link.before(inlineTagViewer(gatherTags(title, routeTree, false), gatherTags(title, routeTree, true)));
    });
}
function extractMetadata(routeTree) {
    const include = new Set([
        'tags',
        'modifiedTags'
    ]);
    const strip = (value)=>(0, _utilitiesJs.filterObjectByKey)(value, (key)=>include.has(key));
    return routeTree.toObject(([key, value])=>[
            key,
            strip(value)
        ]);
}

},{"nanoid":"328Fw","8031d4d3ee222313":"4UMJD","./components.js":"iXNhy","./utilities.js":"j5JPs","bundle-text:../pubkey.asc":"cGYvw","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"328Fw":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "nanoid", ()=>nanoid);
parcelHelpers.export(exports, "customAlphabet", ()=>customAlphabet);
parcelHelpers.export(exports, "customRandom", ()=>customRandom);
parcelHelpers.export(exports, "urlAlphabet", ()=>(0, _indexJs.urlAlphabet));
parcelHelpers.export(exports, "random", ()=>random);
var _indexJs = require("./url-alphabet/index.js");
let random = (bytes)=>crypto.getRandomValues(new Uint8Array(bytes));
let customRandom = (alphabet, defaultSize, getRandom)=>{
    let mask = (2 << Math.log(alphabet.length - 1) / Math.LN2) - 1;
    let step = -~(1.6 * mask * defaultSize / alphabet.length);
    return (size = defaultSize)=>{
        if (size <= 0) return '';
        let id = '';
        while(true){
            let bytes = getRandom(step);
            let j = step | 0;
            while(j--){
                id += alphabet[bytes[j] & mask] || '';
                if (id.length === size) return id;
            }
        }
    };
};
let customAlphabet = (alphabet, size = 21)=>customRandom(alphabet, size, random);
let nanoid = (size = 21)=>crypto.getRandomValues(new Uint8Array(size)).reduce((id, byte)=>{
        byte &= 63;
        if (byte < 36) id += byte.toString(36);
        else if (byte < 62) id += (byte - 26).toString(36).toUpperCase();
        else if (byte > 62) id += '-';
        else id += '_';
        return id;
    }, '');

},{"./url-alphabet/index.js":"29KoN","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"29KoN":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "urlAlphabet", ()=>urlAlphabet);
let urlAlphabet = 'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict';

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"jnFvT":[function(require,module,exports,__globalThis) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || Object.prototype.hasOwnProperty.call(dest, key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"4UMJD":[function(require,module,exports,__globalThis) {
/**
 * @fileOverview Contains definition of the core graph object.
 */ // TODO: need to change storage layer:
// 1. Be able to get all nodes O(1)
// 2. Be able to get number of links O(1)
/**
 * @example
 *  var graph = require('ngraph.graph')();
 *  graph.addNode(1);     // graph has one node.
 *  graph.addLink(2, 3);  // now graph contains three nodes and one link.
 *
 */ module.exports = createGraph;
var eventify = require("cc8dfaace787d1ef");
/**
 * Creates a new graph
 */ function createGraph(options) {
    // Graph structure is maintained as dictionary of nodes
    // and array of links. Each node has 'links' property which
    // hold all links related to that node. And general links
    // array is used to speed up all links enumeration. This is inefficient
    // in terms of memory, but simplifies coding.
    options = options || {};
    if ('uniqueLinkId' in options) {
        console.warn("ngraph.graph: Starting from version 0.14 `uniqueLinkId` is deprecated.\nUse `multigraph` option instead\n", '\n', "Note: there is also change in default behavior: From now on each graph\nis considered to be not a multigraph by default (each edge is unique).");
        options.multigraph = options.uniqueLinkId;
    }
    // Dear reader, the non-multigraphs do not guarantee that there is only
    // one link for a given pair of node. When this option is set to false
    // we can save some memory and CPU (18% faster for non-multigraph);
    if (options.multigraph === undefined) options.multigraph = false;
    if (typeof Map !== 'function') // TODO: Should we polyfill it ourselves? We don't use much operations there..
    throw new Error('ngraph.graph requires `Map` to be defined. Please polyfill it before using ngraph');
    var nodes = new Map();
    var links = [], // Hash of multi-edges. Used to track ids of edges between same nodes
    multiEdges = {}, suspendEvents = 0, createLink = options.multigraph ? createUniqueLink : createSingleLink, // Our graph API provides means to listen to graph changes. Users can subscribe
    // to be notified about changes in the graph by using `on` method. However
    // in some cases they don't use it. To avoid unnecessary memory consumption
    // we will not record graph changes until we have at least one subscriber.
    // Code below supports this optimization.
    //
    // Accumulates all changes made during graph updates.
    // Each change element contains:
    //  changeType - one of the strings: 'add', 'remove' or 'update';
    //  node - if change is related to node this property is set to changed graph's node;
    //  link - if change is related to link this property is set to changed graph's link;
    changes = [], recordLinkChange = noop, recordNodeChange = noop, enterModification = noop, exitModification = noop;
    // this is our public API:
    var graphPart = {
        /**
     * Adds node to the graph. If node with given id already exists in the graph
     * its data is extended with whatever comes in 'data' argument.
     *
     * @param nodeId the node's identifier. A string or number is preferred.
     * @param [data] additional data for the node being added. If node already
     *   exists its data object is augmented with the new one.
     *
     * @return {node} The newly added node or node with given id if it already exists.
     */ addNode: addNode,
        /**
     * Adds a link to the graph. The function always create a new
     * link between two nodes. If one of the nodes does not exists
     * a new node is created.
     *
     * @param fromId link start node id;
     * @param toId link end node id;
     * @param [data] additional data to be set on the new link;
     *
     * @return {link} The newly created link
     */ addLink: addLink,
        /**
     * Removes link from the graph. If link does not exist does nothing.
     *
     * @param link - object returned by addLink() or getLinks() methods.
     *
     * @returns true if link was removed; false otherwise.
     */ removeLink: removeLink,
        /**
     * Removes node with given id from the graph. If node does not exist in the graph
     * does nothing.
     *
     * @param nodeId node's identifier passed to addNode() function.
     *
     * @returns true if node was removed; false otherwise.
     */ removeNode: removeNode,
        /**
     * Gets node with given identifier. If node does not exist undefined value is returned.
     *
     * @param nodeId requested node identifier;
     *
     * @return {node} in with requested identifier or undefined if no such node exists.
     */ getNode: getNode,
        /**
     * Gets number of nodes in this graph.
     *
     * @return number of nodes in the graph.
     */ getNodeCount: getNodeCount,
        /**
     * Gets total number of links in the graph.
     */ getLinkCount: getLinkCount,
        /**
     * Synonym for `getLinkCount()`
     */ getLinksCount: getLinkCount,
        /**
     * Synonym for `getNodeCount()`
     */ getNodesCount: getNodeCount,
        /**
     * Gets all links (inbound and outbound) from the node with given id.
     * If node with given id is not found null is returned.
     *
     * @param nodeId requested node identifier.
     *
     * @return Array of links from and to requested node if such node exists;
     *   otherwise null is returned.
     */ getLinks: getLinks,
        /**
     * Invokes callback on each node of the graph.
     *
     * @param {Function(node)} callback Function to be invoked. The function
     *   is passed one argument: visited node.
     */ forEachNode: forEachNode,
        /**
     * Invokes callback on every linked (adjacent) node to the given one.
     *
     * @param nodeId Identifier of the requested node.
     * @param {Function(node, link)} callback Function to be called on all linked nodes.
     *   The function is passed two parameters: adjacent node and link object itself.
     * @param oriented if true graph treated as oriented.
     */ forEachLinkedNode: forEachLinkedNode,
        /**
     * Enumerates all links in the graph
     *
     * @param {Function(link)} callback Function to be called on all links in the graph.
     *   The function is passed one parameter: graph's link object.
     *
     * Link object contains at least the following fields:
     *  fromId - node id where link starts;
     *  toId - node id where link ends,
     *  data - additional data passed to graph.addLink() method.
     */ forEachLink: forEachLink,
        /**
     * Suspend all notifications about graph changes until
     * endUpdate is called.
     */ beginUpdate: enterModification,
        /**
     * Resumes all notifications about graph changes and fires
     * graph 'changed' event in case there are any pending changes.
     */ endUpdate: exitModification,
        /**
     * Removes all nodes and links from the graph.
     */ clear: clear,
        /**
     * Detects whether there is a link between two nodes.
     * Operation complexity is O(n) where n - number of links of a node.
     * NOTE: this function is synonim for getLink()
     *
     * @returns link if there is one. null otherwise.
     */ hasLink: getLink,
        /**
     * Detects whether there is a node with given id
     * 
     * Operation complexity is O(1)
     * NOTE: this function is synonim for getNode()
     *
     * @returns node if there is one; Falsy value otherwise.
     */ hasNode: getNode,
        /**
     * Gets an edge between two nodes.
     * Operation complexity is O(n) where n - number of links of a node.
     *
     * @param {string} fromId link start identifier
     * @param {string} toId link end identifier
     *
     * @returns link if there is one. null otherwise.
     */ getLink: getLink
    };
    // this will add `on()` and `fire()` methods.
    eventify(graphPart);
    monitorSubscribers();
    return graphPart;
    function monitorSubscribers() {
        var realOn = graphPart.on;
        // replace real `on` with our temporary on, which will trigger change
        // modification monitoring:
        graphPart.on = on;
        function on() {
            // now it's time to start tracking stuff:
            graphPart.beginUpdate = enterModification = enterModificationReal;
            graphPart.endUpdate = exitModification = exitModificationReal;
            recordLinkChange = recordLinkChangeReal;
            recordNodeChange = recordNodeChangeReal;
            // this will replace current `on` method with real pub/sub from `eventify`.
            graphPart.on = realOn;
            // delegate to real `on` handler:
            return realOn.apply(graphPart, arguments);
        }
    }
    function recordLinkChangeReal(link, changeType) {
        changes.push({
            link: link,
            changeType: changeType
        });
    }
    function recordNodeChangeReal(node, changeType) {
        changes.push({
            node: node,
            changeType: changeType
        });
    }
    function addNode(nodeId, data) {
        if (nodeId === undefined) throw new Error('Invalid node identifier');
        enterModification();
        var node = getNode(nodeId);
        if (!node) {
            node = new Node(nodeId, data);
            recordNodeChange(node, 'add');
        } else {
            node.data = data;
            recordNodeChange(node, 'update');
        }
        nodes.set(nodeId, node);
        exitModification();
        return node;
    }
    function getNode(nodeId) {
        return nodes.get(nodeId);
    }
    function removeNode(nodeId) {
        var node = getNode(nodeId);
        if (!node) return false;
        enterModification();
        var prevLinks = node.links;
        if (prevLinks) {
            node.links = null;
            for(var i = 0; i < prevLinks.length; ++i)removeLink(prevLinks[i]);
        }
        nodes.delete(nodeId);
        recordNodeChange(node, 'remove');
        exitModification();
        return true;
    }
    function addLink(fromId, toId, data) {
        enterModification();
        var fromNode = getNode(fromId) || addNode(fromId);
        var toNode = getNode(toId) || addNode(toId);
        var link = createLink(fromId, toId, data);
        links.push(link);
        // TODO: this is not cool. On large graphs potentially would consume more memory.
        addLinkToNode(fromNode, link);
        if (fromId !== toId) // make sure we are not duplicating links for self-loops
        addLinkToNode(toNode, link);
        recordLinkChange(link, 'add');
        exitModification();
        return link;
    }
    function createSingleLink(fromId, toId, data) {
        var linkId = makeLinkId(fromId, toId);
        return new Link(fromId, toId, data, linkId);
    }
    function createUniqueLink(fromId, toId, data) {
        // TODO: Get rid of this method.
        var linkId = makeLinkId(fromId, toId);
        var isMultiEdge = multiEdges.hasOwnProperty(linkId);
        if (isMultiEdge || getLink(fromId, toId)) {
            if (!isMultiEdge) multiEdges[linkId] = 0;
            var suffix = '@' + ++multiEdges[linkId];
            linkId = makeLinkId(fromId + suffix, toId + suffix);
        }
        return new Link(fromId, toId, data, linkId);
    }
    function getNodeCount() {
        return nodes.size;
    }
    function getLinkCount() {
        return links.length;
    }
    function getLinks(nodeId) {
        var node = getNode(nodeId);
        return node ? node.links : null;
    }
    function removeLink(link) {
        if (!link) return false;
        var idx = indexOfElementInArray(link, links);
        if (idx < 0) return false;
        enterModification();
        links.splice(idx, 1);
        var fromNode = getNode(link.fromId);
        var toNode = getNode(link.toId);
        if (fromNode) {
            idx = indexOfElementInArray(link, fromNode.links);
            if (idx >= 0) fromNode.links.splice(idx, 1);
        }
        if (toNode) {
            idx = indexOfElementInArray(link, toNode.links);
            if (idx >= 0) toNode.links.splice(idx, 1);
        }
        recordLinkChange(link, 'remove');
        exitModification();
        return true;
    }
    function getLink(fromNodeId, toNodeId) {
        // TODO: Use sorted links to speed this up
        var node = getNode(fromNodeId), i;
        if (!node || !node.links) return null;
        for(i = 0; i < node.links.length; ++i){
            var link = node.links[i];
            if (link.fromId === fromNodeId && link.toId === toNodeId) return link;
        }
        return null; // no link.
    }
    function clear() {
        enterModification();
        forEachNode(function(node) {
            removeNode(node.id);
        });
        exitModification();
    }
    function forEachLink(callback) {
        var i, length;
        if (typeof callback === 'function') for(i = 0, length = links.length; i < length; ++i)callback(links[i]);
    }
    function forEachLinkedNode(nodeId, callback, oriented) {
        var node = getNode(nodeId);
        if (node && node.links && typeof callback === 'function') {
            if (oriented) return forEachOrientedLink(node.links, nodeId, callback);
            else return forEachNonOrientedLink(node.links, nodeId, callback);
        }
    }
    function forEachNonOrientedLink(links, nodeId, callback) {
        var quitFast;
        for(var i = 0; i < links.length; ++i){
            var link = links[i];
            var linkedNodeId = link.fromId === nodeId ? link.toId : link.fromId;
            quitFast = callback(nodes.get(linkedNodeId), link);
            if (quitFast) return true; // Client does not need more iterations. Break now.
        }
    }
    function forEachOrientedLink(links, nodeId, callback) {
        var quitFast;
        for(var i = 0; i < links.length; ++i){
            var link = links[i];
            if (link.fromId === nodeId) {
                quitFast = callback(nodes.get(link.toId), link);
                if (quitFast) return true; // Client does not need more iterations. Break now.
            }
        }
    }
    // we will not fire anything until users of this library explicitly call `on()`
    // method.
    function noop() {}
    // Enter, Exit modification allows bulk graph updates without firing events.
    function enterModificationReal() {
        suspendEvents += 1;
    }
    function exitModificationReal() {
        suspendEvents -= 1;
        if (suspendEvents === 0 && changes.length > 0) {
            graphPart.fire('changed', changes);
            changes.length = 0;
        }
    }
    function forEachNode(callback) {
        if (typeof callback !== 'function') throw new Error('Function is expected to iterate over graph nodes. You passed ' + callback);
        var valuesIterator = nodes.values();
        var nextValue = valuesIterator.next();
        while(!nextValue.done){
            if (callback(nextValue.value)) return true; // client doesn't want to proceed. Return.
            nextValue = valuesIterator.next();
        }
    }
}
// need this for old browsers. Should this be a separate module?
function indexOfElementInArray(element, array) {
    if (!array) return -1;
    if (array.indexOf) return array.indexOf(element);
    var len = array.length, i;
    for(i = 0; i < len; i += 1){
        if (array[i] === element) return i;
    }
    return -1;
}
/**
 * Internal structure to represent node;
 */ function Node(id, data) {
    this.id = id;
    this.links = null;
    this.data = data;
}
function addLinkToNode(node, link) {
    if (node.links) node.links.push(link);
    else node.links = [
        link
    ];
}
/**
 * Internal structure to represent links;
 */ function Link(fromId, toId, data, id) {
    this.fromId = fromId;
    this.toId = toId;
    this.data = data;
    this.id = id;
}
function makeLinkId(fromId, toId) {
    return fromId.toString() + "\uD83D\uDC49 " + toId.toString();
}

},{"cc8dfaace787d1ef":"6ZABu"}],"6ZABu":[function(require,module,exports,__globalThis) {
module.exports = function eventify(subject) {
    validateSubject(subject);
    var eventsStorage = createEventsStorage(subject);
    subject.on = eventsStorage.on;
    subject.off = eventsStorage.off;
    subject.fire = eventsStorage.fire;
    return subject;
};
function createEventsStorage(subject) {
    // Store all event listeners to this hash. Key is event name, value is array
    // of callback records.
    //
    // A callback record consists of callback function and its optional context:
    // { 'eventName' => [{callback: function, ctx: object}] }
    var registeredEvents = Object.create(null);
    return {
        on: function(eventName, callback, ctx) {
            if (typeof callback !== 'function') throw new Error('callback is expected to be a function');
            var handlers = registeredEvents[eventName];
            if (!handlers) handlers = registeredEvents[eventName] = [];
            handlers.push({
                callback: callback,
                ctx: ctx
            });
            return subject;
        },
        off: function(eventName, callback) {
            var wantToRemoveAll = typeof eventName === 'undefined';
            if (wantToRemoveAll) {
                // Killing old events storage should be enough in this case:
                registeredEvents = Object.create(null);
                return subject;
            }
            if (registeredEvents[eventName]) {
                var deleteAllCallbacksForEvent = typeof callback !== 'function';
                if (deleteAllCallbacksForEvent) delete registeredEvents[eventName];
                else {
                    var callbacks = registeredEvents[eventName];
                    for(var i = 0; i < callbacks.length; ++i)if (callbacks[i].callback === callback) callbacks.splice(i, 1);
                }
            }
            return subject;
        },
        fire: function(eventName) {
            var callbacks = registeredEvents[eventName];
            if (!callbacks) return subject;
            var fireArguments;
            if (arguments.length > 1) fireArguments = Array.prototype.splice.call(arguments, 1);
            for(var i = 0; i < callbacks.length; ++i){
                var callbackInfo = callbacks[i];
                callbackInfo.callback.apply(callbackInfo.ctx, fireArguments);
            }
            return subject;
        }
    };
}
function validateSubject(subject) {
    if (!subject) throw new Error('Eventify cannot use falsy object as events subject');
    var reservedWords = [
        'on',
        'fire',
        'off'
    ];
    for(var i = 0; i < reservedWords.length; ++i){
        if (subject.hasOwnProperty(reservedWords[i])) throw new Error("Subject cannot be eventified, since it already has property '" + reservedWords[i] + "'");
    }
}

},{}],"iXNhy":[function(require,module,exports,__globalThis) {
// import * as petit from 'petit-dom'
// const el = petit.h
// const render = (parent, child, opts) => petit.render(child, parent, opts)
// import { el, mount } from 'redom'
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
//// Web Components ////
parcelHelpers.export(exports, "ClosingDetails", ()=>ClosingDetails);
// TODO respond to `disabled` attribute
parcelHelpers.export(exports, "TabPanel", ()=>TabPanel);
// TODO respond to `disabled` attribute on TabPanels
parcelHelpers.export(exports, "TabGroup", ()=>TabGroup);
parcelHelpers.export(exports, "TagList", ()=>TagList);
parcelHelpers.export(exports, "ModalOverlay", ()=>ModalOverlay);
parcelHelpers.export(exports, "DialogPrompt", ()=>DialogPrompt);
parcelHelpers.export(exports, "Toast", ()=>Toast);
var _attodom = require("attodom");
var _nanoid = require("nanoid");
var _utilitiesJs = require("./utilities.js");
var _flyd = require("flyd");
var _flydDefault = parcelHelpers.interopDefault(_flyd);
var _droprepeats = require("flyd/module/droprepeats");
const { stream } = (0, _flydDefault.default);
const combine = (streams, fn)=>(0, _flydDefault.default).combine(fn, streams);
const update = (s, fn)=>s(fn(s()));
//const sideEffect = flyd.curryN(2, (fn, s) => flyd.map(x => {fn(x); return x;}, s))
const updateAttribute = (srm, attr, obj)=>(0, _utilitiesJs.pipe)(srm, (0, _droprepeats.dropRepeats), (0, _flydDefault.default).on((x)=>obj.getAttribute(attr) === x ? null : obj.setAttribute(attr, x)));
class ClosingDetails extends HTMLDetailsElement {
    constructor(){
        super();
        this._closeIfUnfocused = (e)=>{
            if (!this.contains(document.elementFromPoint(e.clientX, e.clientY))) this.open = false;
        };
    }
    connectedCallback() {
        document.body.addEventListener('mousedown', this._closeIfUnfocused);
    }
    disconnectedCallback() {
        document.body.removeEventListener('mousedown', this._closeIfUnfocused);
    }
}
class TabPanel extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({
            mode: 'open'
        });
        this.shadowRoot.append((0, _attodom.el)('style', null, ':host {display: none;} :host(.active) {display: block;}'), (0, _attodom.el)('div', {
            role: 'tabpanel'
        }, (0, _attodom.el)('slot')));
    }
    connectedCallback() {
        this.title(this.getAttribute('title') ?? '');
        this.group(this.parentElement instanceof TabGroup ? this.parentElement : null);
        this.id = this.id || (0, _nanoid.nanoid)(10);
    }
    static get observedAttributes() {
        return [
            'id',
            'title'
        ];
    }
    attributeChangedCallback(name, oldVal, newVal) {
        if (name === 'id') this.idChanged(null);
        else if (name === 'title') this.title(newVal);
    }
    idChanged = stream(null);
    title = stream();
    _onTitleChanged = updateAttribute(this.title, 'title', this);
    group = stream();
    active = combine([
        this.group.chain((g)=>g?.active),
        this.idChanged
    ], (gActive, _)=>{
        const active = gActive() === this.id;
        (0, _utilitiesJs.setClass)(this, 'active', active);
        return active;
    });
}
class TabGroup extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({
            mode: 'open'
        });
        this.shadowRoot.append((0, _attodom.el)('style', null, `
                #tabgroup { display: flex; flex-flow: var(--tabs-position, column) nowrap; gap: var(--tablist-gap, 0); }
                #tablist { display: flex; flex-flow: var(--tabs-flow, row wrap); align-items: var(--tab-align); margin: 0;
                    padding: 0; gap: var(--tabs-gap, .5em); }
                .tab { display: block; background: var(--tab-background); cursor: var(--tab-cursor); padding: var(--tab-padding);
                    border: var(--tab-border); border-style: var(--tab-border-style); border-color: var(--tab-border-color);
                    border-width: var(--tab-border-width); border-radius: var(--tab-border-radius); }
                .tab.active { background: var(--tab-active-background); border: var(--tab-active-border);
                    border-style: var(--tab-active-border-style); border-color: var(--tab-active-border-color);
                    border-width: var(--tab-active-border-width); border-radius: var(--tab-active-border-radius); }`), (0, _attodom.el)('div', {
            part: 'tabgroup',
            role: 'wrapper',
            id: 'tabgroup'
        }, [
            (0, _attodom.el)('slot'),
            (0, _attodom.el)('menu', {
                part: 'tablist',
                role: 'tablist',
                id: 'tablist'
            })
        ]));
        this.shadowRoot.querySelector('slot').addEventListener('slotchange', (e)=>this.tabs(e.target.assignedElements().filter((x)=>x instanceof TabPanel)));
    }
    static get observedAttributes() {
        return [
            'active'
        ];
    }
    attributeChangedCallback(name, oldVal, newVal) {
        if (name === 'active') this.active(newVal);
    }
    defaultTabTitle = '';
    tabs = stream();
    active = stream(null);
    _onActiveChanged = updateAttribute(this.active, 'active', this);
    renderTabList = combine([
        this.tabs,
        this.active
    ], (tabs, active)=>{
        // if `active` isn't a valid reference to a child tab-panel, default to the first tab-panel
        if (!tabs().some((el)=>el.id === active())) {
            this.active(tabs()[0]?.id);
            return;
        }
        this.shadowRoot.getElementById('tablist').replaceChildren(...tabs().map((tab)=>(0, _attodom.el)('li', {
                class: 'tab' + (active() === tab.id ? ' active' : ''),
                onclick: ()=>this.active(tab.id),
                'aria-controls': tab.id,
                role: 'tab'
            }, tab.title() || this.defaultTabTitle)));
    });
}
class TagList extends HTMLUListElement {
    connectedCallback() {
        this.connected(true);
    }
    connected = stream();
    tags = stream([]);
    render = combine([
        this.tags,
        this.connected
    ], (tags)=>// TODO convert to using attodom.list?
        this.replaceChildren(...tags().sort().map((tag)=>(0, _attodom.el)('li', {
                class: 'tag_list__tag'
            }, tag))));
}
class ModalOverlay extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({
            mode: 'open'
        });
        this.shadowRoot.append((0, _attodom.el)('style', null, `
                #overlay {
                    display: var(--overlay-display, flex); flex-flow: column nowrap; justify-content: safe center;
                    align-items: center;

                    position: fixed; z-index: 1; left: 0; top: 0; width: 100%; height: 100%;
                    overflow: auto;

                    background-color: var(--overlay-color, rgba(0,0,0,0.4));
                }`), (0, _attodom.el)('div', {
            id: 'overlay'
        }, [
            (0, _attodom.el)('slot')
        ]));
        this.addEventListener('request_overlay_close', (e)=>{
            e.stopPropagation();
            this.close();
        });
    }
    static closeRequest = new Event('request_overlay_close', {
        bubbles: true,
        cancelable: true
    });
    open(parent) {
        parent.appendChild(this._overlay);
    }
    close() {
        this.remove();
    }
}
class DialogPrompt extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({
            mode: 'open'
        });
        this.shadowRoot.append((0, _attodom.el)('style', null, `
                #dialog {
                    background-color: var(--dialog-color, grey); padding: var(--dialog-padding, 2em);
                    border: var(--dialog-border); border-radius: var(--dialog-border-radius);
                }

                #buttons {
                    display: flex; flex-flow: row wrap; justify-content: space-around;
                    align-items: center; align-content: space-around; border: none;
                }`), (0, _attodom.el)('form', {
            id: 'dialog',
            onsubmit: (_)=>false
        }, [
            (0, _attodom.el)('slot', {
                name: 'prompt'
            }),
            (0, _attodom.el)('fieldset', {
                id: 'buttons'
            }, [
                (0, _attodom.el)('slot', {
                    name: 'buttons'
                })
            ])
        ]));
    }
}
class Toast extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({
            mode: 'open'
        });
        this.shadowRoot.append((0, _attodom.el)('style', null, `
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
        ), (0, _attodom.el)('p', {
            id: 'toast'
        }));
        this.shadowRoot.getElementById('toast').addEventListener('animationend', (e)=>{
            if (e.animationName === 'fadeOut') this.remove();
        });
    }
    connectedCallback() {
        const toast = this.shadowRoot.getElementById('toast');
        toast.textContent = this.getAttribute('text');
        (0, _utilitiesJs.sleep)(Number(this.getAttribute('linger-time')) * 1000).then((_)=>toast.classList.add('fade'));
    }
}

},{"attodom":"iFhLd","nanoid":"328Fw","./utilities.js":"j5JPs","flyd":"fcqPo","flyd/module/droprepeats":"eikiG","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"iFhLd":[function(require,module,exports,__globalThis) {
// @ts-check
/* eslint-disable global-require */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "el", ()=>(0, _elJsDefault.default));
parcelHelpers.export(exports, "svg", ()=>(0, _svgJsDefault.default));
parcelHelpers.export(exports, "list", ()=>(0, _listJsDefault.default));
parcelHelpers.export(exports, "find", ()=>(0, _findJsDefault.default));
parcelHelpers.export(exports, "css", ()=>(0, _cssJsDefault.default));
var _elJs = require("./el.js");
var _elJsDefault = parcelHelpers.interopDefault(_elJs);
var _svgJs = require("./svg.js");
var _svgJsDefault = parcelHelpers.interopDefault(_svgJs);
var _listJs = require("./list.js");
var _listJsDefault = parcelHelpers.interopDefault(_listJs);
var _findJs = require("./find.js");
var _findJsDefault = parcelHelpers.interopDefault(_findJs);
var _cssJs = require("./css.js");
var _cssJsDefault = parcelHelpers.interopDefault(_cssJs);

},{"./el.js":"l2VLW","./svg.js":"keWTj","./list.js":"WPGGH","./find.js":"dOvJA","./css.js":"aqav2","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"l2VLW":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * @param {string|HTMLElement} tagName
 * @return {HTMLElement}
 */ parcelHelpers.export(exports, "default", ()=>function(tagName) {
        //@ts-ignore
        var node = tagName.nodeType === 1 ? tagName : document.createElement(tagName);
        for(var i = 1; i < arguments.length; ++i){
            var arg = arguments[i];
            if (arg != null) {
                //TODO skip .constructor
                if (!arg.constructor || arg.constructor === Object) for(var j = 0, ks = Object.keys(arg); j < ks.length; ++j){
                    var key = ks[j], val = arg[key];
                    if (key === 'style') node.style.cssText = val;
                    else if (typeof val !== 'string' || htmlProps[key]) {
                        node[key] = val;
                        //set synthetic events for onUpperCaseName
                        if (key[0] === 'o' && key[1] === 'n' && key.charCodeAt(2) < 91 && key.charCodeAt(2) > 64 && !(0, _eventsJsDefault.default)[key]) {
                            document.addEventListener(key.slice(2).toLowerCase(), function(e) {
                                var tgt = e.target;
                                do if (tgt[key]) return tgt[key](e);
                                while (tgt = tgt.parentNode);
                            });
                            (0, _eventsJsDefault.default)[key] = true;
                        }
                    } else node.setAttribute(key, val);
                }
                else {
                    if (Array.isArray(arg)) for(var k = 0; k < arg.length; ++k)node.appendChild(arg[k].nodeType ? arg[k] : document.createTextNode(arg[k]));
                    else node.appendChild(arg.nodeType ? arg : document.createTextNode(arg));
                }
            }
        }
        return node;
    });
var _eventsJs = require("./src/events.js");
var _eventsJsDefault = parcelHelpers.interopDefault(_eventsJs);
var htmlProps = {
    id: true,
    nodeValue: true,
    textContent: true,
    className: true,
    innerHTML: true,
    tabIndex: true,
    value: true
};

},{"./src/events.js":"1GruV","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"1GruV":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = {};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"keWTj":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * @param {string} tagName
 * @return {Element}
 */ parcelHelpers.export(exports, "default", ()=>function(tagName) {
        //@ts-ignore
        var node = tagName.nodeType === 1 ? tagName : document.createElementNS('http://www.w3.org/2000/svg', tagName);
        for(var i = 1; i < arguments.length; ++i){
            var arg = arguments[i];
            if (arg != null) {
                //TODO skip .constructor
                if (!arg.constructor || arg.constructor === Object) for(var j = 0, ks = Object.keys(arg); j < ks.length; ++j){
                    var key = ks[j], val = arg[key];
                    if (typeof val !== 'string') {
                        node[key] = val;
                        //set synthetic events for onUpperCaseName
                        if (key[0] === 'o' && key[1] === 'n' && key.charCodeAt(2) < 91 && key.charCodeAt(2) > 64 && !(0, _eventsJsDefault.default)[key]) {
                            document.addEventListener(key.slice(2).toLowerCase(), function(e) {
                                var tgt = e.target;
                                do if (tgt[key]) return tgt[key](e);
                                while (tgt = tgt.parentNode);
                            });
                            (0, _eventsJsDefault.default)[key] = true;
                        }
                    } else node.setAttribute(key, val);
                }
                else {
                    if (Array.isArray(arg)) for(var k = 0; k < arg.length; ++k)node.appendChild(arg[k].nodeType ? arg[k] : document.createTextNode(arg[k]));
                    else node.appendChild(arg.nodeType ? arg : document.createTextNode(arg));
                }
            }
        }
        return node;
    });
var _eventsJs = require("./src/events.js");
var _eventsJsDefault = parcelHelpers.interopDefault(_eventsJs);

},{"./src/events.js":"1GruV","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"WPGGH":[function(require,module,exports,__globalThis) {
/**
 * @param {Element} parent
 * @param {Function} factory
 * @param {Object} [options]
 * @return {Object}
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(parent, factory, options) {
        return {
            parent: parent,
            factory: factory,
            before: options && options.before || null,
            after: options && options.after || null,
            update: updateList,
            key: options && options.key || ((v, i)=>i),
            map: Object.create(null)
        };
    });
/**
 * @param {Array} arr
 * @return {Node}
 */ function updateList(arr) {
    var parent = this.parent, spot = this.after ? this.after.nextSibling : parent.firstChild, getK = this.key, kids = Object.create(null);
    if (!arr.length && !this.before && !this.after) parent.textContent = '';
    else {
        for(var i = 0; i < arr.length; ++i){
            //TODO skip .constructor
            var key = getK.constructor === Function ? getK(arr[i], i, arr) : arr[i][getK], kid = this.map[key];
            //create or update kid
            if (kid) kid.update && kid.update(arr[i], key, arr) //eslint-disable-line
            ;
            else kid = this.factory(arr[i], i, arr);
            kids[key] = kid;
            //place kid
            if (!spot) parent.appendChild(kid);
            else if (kid === spot.nextSibling) parent.removeChild(spot);
            else if (kid !== spot) parent.insertBefore(kid, spot);
            spot = kid.nextSibling;
        }
        //delete remaining
        while(spot !== this.before){
            var next = spot.nextSibling;
            parent.removeChild(spot);
            spot = next;
        }
    }
    this.map = kids;
    return this;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"dOvJA":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(start, test, until) {
        var spot = start, last = until || null;
        while(!test(spot)){
            if (spot === last) return null // specified end reached
            ;
            var next = spot.firstChild;
            // if no child get sibling, if no sibling, retry with parent
            if (!next) while(!(next = spot.nextSibling)){
                spot = spot.parentNode;
                if (spot === null) return null // end of tree reached
                ;
            }
            spot = next;
        }
        return spot;
    });

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"aqav2":[function(require,module,exports,__globalThis) {
/**
 * @param {string} cssRuleText
 * @return {void}
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(cssRuleText) {
        /**@type {CSSStyleSheet} */ //@ts-ignore
        var sheet = document.styleSheets[0] || document.head.appendChild(document.createElement('style')).sheet;
        sheet.insertRule(cssRuleText, sheet.cssRules.length);
    });

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"j5JPs":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "equal", ()=>equal);
parcelHelpers.export(exports, "setClass", ()=>setClass);
parcelHelpers.export(exports, "err", ()=>err);
parcelHelpers.export(exports, "sleep", ()=>sleep);
parcelHelpers.export(exports, "pipe", ()=>pipe);
parcelHelpers.export(exports, "flow", ()=>flow);
parcelHelpers.export(exports, "zip", ()=>zip);
parcelHelpers.export(exports, "take", ()=>take);
parcelHelpers.export(exports, "setUnion", ()=>setUnion);
parcelHelpers.export(exports, "arrayUnique", ()=>arrayUnique);
parcelHelpers.export(exports, "filterObjectByEntry", ()=>filterObjectByEntry);
parcelHelpers.export(exports, "filterObjectByKey", ()=>filterObjectByKey);
parcelHelpers.export(exports, "substituteText", ()=>substituteText);
parcelHelpers.export(exports, "Tree", ()=>Tree);
parcelHelpers.export(exports, "cloneTemplateFrom", ()=>cloneTemplateFrom);
parcelHelpers.export(exports, "parseDoc", ()=>parseDoc);
parcelHelpers.export(exports, "exportObject", ()=>exportObject);
parcelHelpers.export(exports, "encryptMessage", ()=>encryptMessage);
var _fileSaver = require("file-saver");
const equal = (x, y)=>x === y;
const setClass = (elem, cl, bool)=>bool ? elem.classList.add(cl) : elem.classList.remove(cl);
const err = (...args)=>{
    throw new Error(...args);
};
const sleep = (ms)=>new Promise((res)=>setTimeout(res, ms));
const pipe = (x, ...fns)=>fns.reduce((acc, fn)=>fn(acc), x);
const flow = (...fns)=>(x)=>fns.reduce((acc, fn)=>fn(acc), x);
const zip = (rows)=>rows[0].map((_, c)=>rows.map((row)=>row[c]));
function* take(n, iter) {
    for (const x of iter){
        if (n < 1) break;
        yield x;
        n -= 1;
    }
}
function setUnion(...sets) {
    const union = new Set(sets.shift());
    for (const currSet of sets)for (const elem of currSet)union.add(elem);
    return union;
}
const arrayUnique = (arr)=>Array.from(new Set(arr));
function filterObjectByEntry(obj, pred) {
    return Object.fromEntries(Object.entries(obj).filter(pred));
}
function filterObjectByKey(obj, pred) {
    return filterObjectByEntry(obj, ([key, _])=>pred(key));
}
const substituteText = (template, context)=>template.replaceAll(/{(\w+)}/g, (match, key)=>context[key] ?? match);
class Tree extends Map {
    constructor(root, attributes = {}){
        super();
        if (root) this.setRoot(root, attributes);
    }
    root = null;
    setRoot(node, attributes = {}) {
        if (this.root !== null) throw new Error(`root '${this.root}' already exists`);
        this.set(node, Object.assign(attributes, {
            children: [],
            parent: null
        }));
        this.root = node;
    }
    addChild(parent, child, attributes = {}) {
        if (this.get(child) !== undefined) throw new Error(`child ${child} already exists`);
        this.get(parent)?.children?.push(child) ?? err(`parent '${parent}' does not exist or is malformed`);
        this.set(child, Object.assign(attributes, {
            children: [],
            parent: parent
        }));
    }
    deleteNode(node) {
        for (const child of this.get(node).children)this.deleteNode(child);
        this.delete(node);
    }
    toObject(morphism) {
        if (typeof morphism === 'function') return Object.fromEntries(Array.from(this, morphism));
        else return Object.fromEntries(this);
    }
    getAncestryOf(node) {
        const ancestry = [];
        let parent = this.get(node).parent;
        while(parent !== null){
            ancestry.unshift(parent);
            parent = this.get(parent).parent;
        }
        return ancestry;
    }
    // I don't trust this algorithm. Does it have bugs? Is it efficient? Does it cover all edge
    //   cases? No clue. But it's not recursive.
    // Collapses `tree` into a single value using an accumulator function `f` (similar to `reduce`)
    //   optionally starting at subtree `node`. `f` is passed each node except the node's
    //   `children` attribute instead holds the results of applying `f` to the node's children.
    static cata(tree, node = null, f) {
        const newLayer = (node)=>({
                node,
                before: [
                    ...tree.get(node).children
                ],
                after: []
            });
        const stack = [
            newLayer(node ?? tree.root)
        ];
        while(true)if (stack.at(-1).before.length) stack.push(newLayer(stack.at(-1).before.pop()));
        else {
            const curr = stack.pop();
            const res = f({
                ...tree.get(curr.node),
                children: curr.after
            });
            if (!stack.length) return res;
            stack.at(-1).after.push(res);
        }
    }
    static fromGraphBfs(getChildren, root) {
        const tree = new Tree(root);
        const frontier = [
            root
        ];
        const addChildOf = (currentNode)=>(id, data = {})=>{
                if (!tree.has(id)) {
                    frontier.push(id);
                    tree.addChild(currentNode, id, data);
                }
            };
        while(frontier.length > 0){
            const currentNode = frontier.pop();
            getChildren(addChildOf(currentNode), currentNode);
        }
        return tree;
    }
}
const cloneTemplateFrom = (doc)=>(templateId)=>{
        // NOTE importNode works like cloneNode except it upgrades custom elements. Needed because
        //   it works on template contents, unlike customElements.upgrade.
        const template = doc.importNode(doc.getElementById(templateId).content, true);
        // clear the fragment of extraneous nodes that might break things
        // TODO Apply recursively to comments
        Array.from(template.childNodes).forEach((el)=>{
            if (el.nodeName === '#text' && !el.nodeValue.trim() || el.nodeName === '#comment') el.remove();
        });
        return template;
    };
function parseDoc(docText) {
    return new DOMParser().parseFromString(docText, "text/html");
}
function exportObject(obj, filename) {
    (0, _fileSaver.saveAs)(new Blob([
        JSON.stringify(obj)
    ], {
        type: 'application/json'
    }), filename);
}
async function encryptMessage(armoredPublicKey, text) {
    const { readKey, encrypt, createMessage } = await require("c5675aae6c419b6");
    return await encrypt({
        message: await createMessage({
            text
        }),
        encryptionKeys: await readKey({
            armoredKey: armoredPublicKey
        })
    });
}

},{"file-saver":"apCnQ","c5675aae6c419b6":"21mI0","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"apCnQ":[function(require,module,exports,__globalThis) {
var global = arguments[3];
(function(a, b) {
    if ("function" == typeof define && define.amd) define([], b);
    else b();
})(this, function() {
    "use strict";
    function b(a, b) {
        return "undefined" == typeof b ? b = {
            autoBom: !1
        } : "object" != typeof b && (console.warn("Deprecated: Expected third argument to be a object"), b = {
            autoBom: !b
        }), b.autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(a.type) ? new Blob([
            "\uFEFF",
            a
        ], {
            type: a.type
        }) : a;
    }
    function c(a, b, c) {
        var d = new XMLHttpRequest;
        d.open("GET", a), d.responseType = "blob", d.onload = function() {
            g(d.response, b, c);
        }, d.onerror = function() {
            console.error("could not download file");
        }, d.send();
    }
    function d(a) {
        var b = new XMLHttpRequest;
        b.open("HEAD", a, !1);
        try {
            b.send();
        } catch (a) {}
        return 200 <= b.status && 299 >= b.status;
    }
    function e(a) {
        try {
            a.dispatchEvent(new MouseEvent("click"));
        } catch (c) {
            var b = document.createEvent("MouseEvents");
            b.initMouseEvent("click", !0, !0, window, 0, 0, 0, 80, 20, !1, !1, !1, !1, 0, null), a.dispatchEvent(b);
        }
    }
    var f = "object" == typeof window && window.window === window ? window : "object" == typeof self && self.self === self ? self : "object" == typeof global && global.global === global ? global : void 0, a = f.navigator && /Macintosh/.test(navigator.userAgent) && /AppleWebKit/.test(navigator.userAgent) && !/Safari/.test(navigator.userAgent), g = f.saveAs || ("object" != typeof window || window !== f ? function() {} : "download" in HTMLAnchorElement.prototype && !a ? function(b, g, h) {
        var i = f.URL || f.webkitURL, j = document.createElement("a");
        g = g || b.name || "download", j.download = g, j.rel = "noopener", "string" == typeof b ? (j.href = b, j.origin === location.origin ? e(j) : d(j.href) ? c(b, g, h) : e(j, j.target = "_blank")) : (j.href = i.createObjectURL(b), setTimeout(function() {
            i.revokeObjectURL(j.href);
        }, 4E4), setTimeout(function() {
            e(j);
        }, 0));
    } : "msSaveOrOpenBlob" in navigator ? function(f, g, h) {
        if (g = g || f.name || "download", "string" != typeof f) navigator.msSaveOrOpenBlob(b(f, h), g);
        else if (d(f)) c(f, g, h);
        else {
            var i = document.createElement("a");
            i.href = f, i.target = "_blank", setTimeout(function() {
                e(i);
            });
        }
    } : function(b, d, e, g) {
        if (g = g || open("", "_blank"), g && (g.document.title = g.document.body.innerText = "downloading..."), "string" == typeof b) return c(b, d, e);
        var h = "application/octet-stream" === b.type, i = /constructor/i.test(f.HTMLElement) || f.safari, j = /CriOS\/[\d]+/.test(navigator.userAgent);
        if ((j || h && i || a) && "undefined" != typeof FileReader) {
            var k = new FileReader;
            k.onloadend = function() {
                var a = k.result;
                a = j ? a : a.replace(/^data:[^;]*;/, "data:attachment/file;"), g ? g.location.href = a : location = a, g = null;
            }, k.readAsDataURL(b);
        } else {
            var l = f.URL || f.webkitURL, m = l.createObjectURL(b);
            g ? g.location = m : location.href = m, g = null, setTimeout(function() {
                l.revokeObjectURL(m);
            }, 4E4);
        }
    });
    f.saveAs = g.saveAs = g, module.exports = g;
});

},{}],"21mI0":[function(require,module,exports,__globalThis) {
module.exports = import("./openpgp.min.a0ea7b6e.js").then(()=>module.bundle.root('4n1IY'));

},{}],"fcqPo":[function(require,module,exports,__globalThis) {
'use strict';
var curryN = require("78d6c069c5ac2106");
// Utility
function isFunction(obj) {
    return !!(obj && obj.constructor && obj.call && obj.apply);
}
function trueFn() {
    return true;
}
// Globals
var toUpdate = [];
var inStream;
var order = [];
var orderNextIdx = -1;
var flushingUpdateQueue = false;
var flushingStreamValue = false;
function flushing() {
    return flushingUpdateQueue || flushingStreamValue;
}
/** @namespace */ var flyd = {};
// /////////////////////////// API ///////////////////////////////// //
/**
 * Creates a new stream
 *
 * __Signature__: `a -> Stream a`
 *
 * @name flyd.stream
 * @param {*} initialValue - (Optional) the initial value of the stream
 * @return {stream} the stream
 *
 * @example
 * var n = flyd.stream(1); // Stream with initial value `1`
 * var s = flyd.stream(); // Stream with no initial value
 */ flyd.stream = function(initialValue) {
    var endStream = createDependentStream([], trueFn);
    var s = createStream();
    s.end = endStream;
    s.fnArgs = [];
    endStream.listeners.push(s);
    if (arguments.length > 0) s(initialValue);
    return s;
};
// fantasy-land Applicative
flyd.stream['fantasy-land/of'] = flyd.stream.of = flyd.stream;
/**
 * Create a new dependent stream
 *
 * __Signature__: `(...Stream * -> Stream b -> b) -> [Stream *] -> Stream b`
 *
 * @name flyd.combine
 * @param {Function} fn - the function used to combine the streams
 * @param {Array<stream>} dependencies - the streams that this one depends on
 * @return {stream} the dependent stream
 *
 * @example
 * var n1 = flyd.stream(0);
 * var n2 = flyd.stream(0);
 * var max = flyd.combine(function(n1, n2, self, changed) {
 *   return n1() > n2() ? n1() : n2();
 * }, [n1, n2]);
 */ flyd.combine = curryN(2, combine);
function combine(fn, streams) {
    var i, s, deps, depEndStreams;
    var endStream = createDependentStream([], trueFn);
    deps = [];
    depEndStreams = [];
    for(i = 0; i < streams.length; ++i)if (streams[i] !== undefined) {
        deps.push(streams[i]);
        if (streams[i].end !== undefined) depEndStreams.push(streams[i].end);
    }
    s = createDependentStream(deps, fn);
    s.depsChanged = [];
    s.fnArgs = s.deps.concat([
        s,
        s.depsChanged
    ]);
    s.end = endStream;
    endStream.listeners.push(s);
    addListeners(depEndStreams, endStream);
    endStream.deps = depEndStreams;
    updateStream(s);
    return s;
}
/**
 * Returns `true` if the supplied argument is a Flyd stream and `false` otherwise.
 *
 * __Signature__: `* -> Boolean`
 *
 * @name flyd.isStream
 * @param {*} value - the value to test
 * @return {Boolean} `true` if is a Flyd streamn, `false` otherwise
 *
 * @example
 * var s = flyd.stream(1);
 * var n = 1;
 * flyd.isStream(s); //=> true
 * flyd.isStream(n); //=> false
 */ flyd.isStream = function(stream) {
    return isFunction(stream) && 'hasVal' in stream;
};
/**
 * Invokes the body (the function to calculate the value) of a dependent stream
 *
 * By default the body of a dependent stream is only called when all the streams
 * upon which it depends has a value. `immediate` can circumvent this behaviour.
 * It immediately invokes the body of a dependent stream.
 *
 * __Signature__: `Stream a -> Stream a`
 *
 * @name flyd.immediate
 * @param {stream} stream - the dependent stream
 * @return {stream} the same stream
 *
 * @example
 * var s = flyd.stream();
 * var hasItems = flyd.immediate(flyd.combine(function(s) {
 *   return s() !== undefined && s().length > 0;
 * }, [s]);
 * console.log(hasItems()); // logs `false`. Had `immediate` not been
 *                          // used `hasItems()` would've returned `undefined`
 * s([1]);
 * console.log(hasItems()); // logs `true`.
 * s([]);
 * console.log(hasItems()); // logs `false`.
 */ flyd.immediate = function(s) {
    if (s.depsMet === false) {
        s.depsMet = true;
        updateStream(s);
    }
    return s;
};
/**
 * Changes which `endsStream` should trigger the ending of `s`.
 *
 * __Signature__: `Stream a -> Stream b -> Stream b`
 *
 * @name flyd.endsOn
 * @param {stream} endStream - the stream to trigger the ending
 * @param {stream} stream - the stream to be ended by the endStream
 * @param {stream} the stream modified to be ended by endStream
 *
 * @example
 * var n = flyd.stream(1);
 * var killer = flyd.stream();
 * // `double` ends when `n` ends or when `killer` emits any value
 * var double = flyd.endsOn(flyd.merge(n.end, killer), flyd.combine(function(n) {
 *   return 2 * n();
 * }, [n]);
*/ flyd.endsOn = function(endS, s) {
    detachDeps(s.end);
    endS.listeners.push(s.end);
    s.end.deps.push(endS);
    return s;
};
/**
 * Map a stream
 *
 * Returns a new stream consisting of every value from `s` passed through
 * `fn`. I.e. `map` creates a new stream that listens to `s` and
 * applies `fn` to every new value.
 * __Signature__: `(a -> result) -> Stream a -> Stream result`
 *
 * @name flyd.map
 * @param {Function} fn - the function that produces the elements of the new stream
 * @param {stream} stream - the stream to map
 * @return {stream} a new stream with the mapped values
 *
 * @example
 * var numbers = flyd.stream(0);
 * var squaredNumbers = flyd.map(function(n) { return n*n; }, numbers);
 */ // Library functions use self callback to accept (null, undefined) update triggers.
function map(f, s) {
    return combine(function(s, self) {
        self(f(s.val));
    }, [
        s
    ]);
}
flyd.map = curryN(2, map);
/**
 * Chain a stream
 *
 * also known as flatMap
 *
 * Where `fn` returns a stream this function will flatten the resulting streams.
 * Every time `fn` is called the context of the returned stream will "switch" to that stream.
 *
 * __Signature__: `(a -> Stream b) -> Stream a -> Stream b`
 *
 * @name flyd.chain
 * @param {Function} fn - the function that produces the streams to be flattened
 * @param {stream} stream - the stream to map
 * @return {stream} a new stream with the mapped values
 *
 * @example
 * var filter = flyd.stream('who');
 * var items = flyd.chain(function(filter){
 *   return flyd.stream(findUsers(filter));
 * }, filter);
 */ flyd.chain = curryN(2, chain);
/**
 * Apply a stream
 *
 * Applies the value in `s2` to the function in `s1`.
 *
 * __Signature__: `Stream (a -> b) -> Stream a -> Stream b`
 *
 * @name flyd.ap
 * @param {stream} s1 - The value to be applied
 * @param {stream} s2 - The function expecting the value
 * @return {stream} a new stream with the mapped values
 *
 * @example
 * var add = stream(a => b => a + b)
 * var n1 = stream(1)
 * var n2 = stream(2)
 *
 * var added = flyd.ap(n2, flyd.ap(n1, add)) // stream(3)
 * // can also be written using pipe
 * var added_pipe = add
 *   .pipe(ap(n1))
 *   .pipe(ap(n2));
 * added_pipe() // 3
 */ flyd.ap = curryN(2, ap);
/**
 * Listen to stream events
 *
 * Similar to `map` except that the returned stream is empty. Use `on` for doing
 * side effects in reaction to stream changes. Use the returned stream only if you
 * need to manually end it.
 *
 * __Signature__: `(a -> result) -> Stream a -> Stream undefined`
 *
 * @name flyd.on
 * @param {Function} cb - the callback
 * @param {stream} stream - the stream
 * @return {stream} an empty stream (can be ended)
 */ flyd.on = curryN(2, function(f, s) {
    return combine(function(s) {
        f(s.val);
    }, [
        s
    ]);
});
/**
 * Creates a new stream with the results of calling the function on every incoming
 * stream with and accumulator and the incoming value.
 *
 * __Signature__: `(a -> b -> a) -> a -> Stream b -> Stream a`
 *
 * @name flyd.scan
 * @param {Function} fn - the function to call
 * @param {*} val - the initial value of the accumulator
 * @param {stream} stream - the stream source
 * @return {stream} the new stream
 *
 * @example
 * var numbers = flyd.stream();
 * var sum = flyd.scan(function(sum, n) { return sum+n; }, 0, numbers);
 * numbers(2)(3)(5);
 * sum(); // 10
 */ flyd.scan = curryN(3, function(f, acc, s) {
    var ns = combine(function(s, self) {
        self(acc = f(acc, s.val));
    }, [
        s
    ]);
    if (!ns.hasVal) ns(acc);
    return ns;
});
/**
 * Creates a new stream down which all values from both `stream1` and `stream2`
 * will be sent.
 *
 * __Signature__: `Stream a -> Stream a -> Stream a`
 *
 * @name flyd.merge
 * @param {stream} source1 - one stream to be merged
 * @param {stream} source2 - the other stream to be merged
 * @return {stream} a stream with the values from both sources
 *
 * @example
 * var btn1Clicks = flyd.stream();
 * button1Elm.addEventListener(btn1Clicks);
 * var btn2Clicks = flyd.stream();
 * button2Elm.addEventListener(btn2Clicks);
 * var allClicks = flyd.merge(btn1Clicks, btn2Clicks);
 */ flyd.merge = curryN(2, function(s1, s2) {
    var s = flyd.immediate(combine(function(s1, s2, self, changed) {
        if (changed[0]) self(changed[0]());
        else if (s1.hasVal) self(s1.val);
        else if (s2.hasVal) self(s2.val);
    }, [
        s1,
        s2
    ]));
    flyd.endsOn(combine(function() {
        return true;
    }, [
        s1.end,
        s2.end
    ]), s);
    return s;
});
/**
 * Creates a new stream resulting from applying `transducer` to `stream`.
 *
 * __Signature__: `Transducer -> Stream a -> Stream b`
 *
 * @name flyd.transduce
 * @param {Transducer} xform - the transducer transformation
 * @param {stream} source - the stream source
 * @return {stream} the new stream
 *
 * @example
 * var t = require('transducers.js');
 *
 * var results = [];
 * var s1 = flyd.stream();
 * var tx = t.compose(t.map(function(x) { return x * 2; }), t.dedupe());
 * var s2 = flyd.transduce(tx, s1);
 * flyd.combine(function(s2) { results.push(s2()); }, [s2]);
 * s1(1)(1)(2)(3)(3)(3)(4);
 * results; // => [2, 4, 6, 8]
 */ flyd.transduce = curryN(2, function(xform, source) {
    xform = xform(new StreamTransformer());
    return combine(function(source, self) {
        var res = xform['@@transducer/step'](undefined, source.val);
        if (res && res['@@transducer/reduced'] === true) {
            self.end(true);
            return res['@@transducer/value'];
        } else return res;
    }, [
        source
    ]);
});
/**
 * Returns `fn` curried to `n`. Use this function to curry functions exposed by
 * modules for Flyd.
 *
 * @name flyd.curryN
 * @function
 * @param {Integer} arity - the function arity
 * @param {Function} fn - the function to curry
 * @return {Function} the curried function
 *
 * @example
 * function add(x, y) { return x + y; };
 * var a = flyd.curryN(2, add);
 * a(2)(4) // => 6
 */ flyd.curryN = curryN;
/**
 * Returns a new stream identical to the original except every
 * value will be passed through `f`.
 *
 * _Note:_ This function is included in order to support the fantasy land
 * specification.
 *
 * __Signature__: Called bound to `Stream a`: `(a -> b) -> Stream b`
 *
 * @name stream.map
 * @param {Function} function - the function to apply
 * @return {stream} a new stream with the values mapped
 *
 * @example
 * var numbers = flyd.stream(0);
 * var squaredNumbers = numbers.map(function(n) { return n*n; });
 */ function boundMap(f) {
    return map(f, this);
}
/**
 * Returns the result of applying function `fn` to this stream
 *
 * __Signature__: Called bound to `Stream a`: `(a -> Stream b) -> Stream b`
 *
 * @name stream.pipe
 * @param {Function} fn - the function to apply
 * @return {stream} A new stream
 *
 * @example
 * var numbers = flyd.stream(0);
 * var squaredNumbers = numbers.pipe(flyd.map(function(n){ return n*n; }));
 */ function operator_pipe(f) {
    return f(this);
}
function boundChain(f) {
    return chain(f, this);
}
function chain(f, s) {
    // Internal state to end flat map stream
    var flatEnd = flyd.stream(1);
    var internalEnded = flyd.on(function() {
        var alive = flatEnd() - 1;
        flatEnd(alive);
        if (alive <= 0) flatEnd.end(true);
    });
    internalEnded(s.end);
    var last = flyd.stream();
    var flatStream = flyd.combine(function(s, own) {
        last.end(true);
        // Our fn stream makes streams
        var newS = f(s());
        flatEnd(flatEnd() + 1);
        internalEnded(newS.end);
        // Update self on call -- newS is never handed out so deps don't matter
        last = map(own, newS);
    }, [
        s
    ]);
    flyd.endsOn(flatEnd.end, flatStream);
    return flatStream;
}
flyd.fromPromise = function fromPromise(p) {
    var s = flyd.stream();
    p.then(function(val) {
        s(val);
        s.end(true);
    });
    return s;
};
flyd.flattenPromise = function flattenPromise(s) {
    return combine(function(s, self) {
        s().then(self);
    }, [
        s
    ]);
};
/**
 * Returns a new stream which is the result of applying the
 * functions from `this` stream to the values in `stream` parameter.
 *
 * `this` stream must be a stream of functions.
 *
 * _Note:_ This function is included in order to support the fantasy land
 * specification.
 *
 * __Signature__: Called bound to `Stream (a -> b)`: `a -> Stream b`
 *
 * @name stream.ap
 * @param {stream} stream - the values stream
 * @return {stream} a new stream with the functions applied to values
 *
 * @example
 * var add = flyd.curryN(2, function(x, y) { return x + y; });
 * var numbers1 = flyd.stream();
 * var numbers2 = flyd.stream();
 * var addToNumbers1 = flyd.map(add, numbers1);
 * var added = addToNumbers1.ap(numbers2);
 */ function ap(s2, s1) {
    return combine(function(s1, s2, self) {
        self(s1.val(s2.val));
    }, [
        s1,
        s2
    ]);
}
function boundAp(s2) {
    return ap(s2, this);
}
/**
 * @private
 */ function fantasy_land_ap(s1) {
    return ap(this, s1);
}
/**
 * Get a human readable view of a stream
 * @name stream.toString
 * @return {String} the stream string representation
 */ function streamToString() {
    return 'stream(' + this.val + ')';
}
/**
 * @name stream.end
 * @memberof stream
 * A stream that emits `true` when the stream ends. If `true` is pushed down the
 * stream the parent stream ends.
 */ /**
 * @name stream.of
 * @function
 * @memberof stream
 * Returns a new stream with `value` as its initial value. It is identical to
 * calling `flyd.stream` with one argument.
 *
 * __Signature__: Called bound to `Stream (a)`: `b -> Stream b`
 *
 * @param {*} value - the initial value
 * @return {stream} the new stream
 *
 * @example
 * var n = flyd.stream(1);
 * var m = n.of(1);
 */ // /////////////////////////// PRIVATE ///////////////////////////////// //
/**
 * @private
 * Create a stream with no dependencies and no value
 * @return {Function} a flyd stream
 */ function createStream() {
    function s(n) {
        if (arguments.length === 0) return s.val;
        updateStreamValue(n, s);
        return s;
    }
    s.hasVal = false;
    s.val = undefined;
    s.updaters = [];
    s.listeners = [];
    s.queued = false;
    s.end = undefined;
    // fantasy-land compatibility
    s.ap = boundAp;
    s['fantasy-land/map'] = s.map = boundMap;
    s['fantasy-land/ap'] = fantasy_land_ap;
    s['fantasy-land/of'] = s.of = flyd.stream;
    s['fantasy-land/chain'] = s.chain = boundChain;
    s.pipe = operator_pipe;
    // According to the fantasy-land Applicative specification
    // Given a value f, one can access its type representative via the constructor property:
    // `f.constructor.of`
    s.constructor = flyd.stream;
    s.toJSON = function() {
        return s.val;
    };
    s.toString = streamToString;
    return s;
}
/**
 * @private
 * Create a dependent stream
 * @param {Array<stream>} dependencies - an array of the streams
 * @param {Function} fn - the function used to calculate the new stream value
 * from the dependencies
 * @return {stream} the created stream
 */ function createDependentStream(deps, fn) {
    var s = createStream();
    s.fn = fn;
    s.deps = deps;
    s.depsMet = false;
    s.depsChanged = deps.length > 0 ? [] : undefined;
    s.shouldUpdate = false;
    addListeners(deps, s);
    return s;
}
/**
 * @private
 * Check if all the dependencies have values
 * @param {stream} stream - the stream to check depencencies from
 * @return {Boolean} `true` if all dependencies have vales, `false` otherwise
 */ function initialDependenciesMet(stream) {
    stream.depsMet = stream.deps.every(function(s) {
        return s.hasVal;
    });
    return stream.depsMet;
}
function dependenciesAreMet(stream) {
    return stream.depsMet === true || initialDependenciesMet(stream);
}
function isEnded(stream) {
    return stream.end && stream.end.val === true;
}
function listenersNeedUpdating(s) {
    return s.listeners.some(function(s) {
        return s.shouldUpdate;
    });
}
/**
 * @private
 * Update a dependent stream using its dependencies in an atomic way
 * @param {stream} stream - the stream to update
 */ function updateStream(s) {
    if (isEnded(s) || !dependenciesAreMet(s)) return;
    if (inStream !== undefined) {
        updateLaterUsing(updateStream, s);
        return;
    }
    inStream = s;
    if (s.depsChanged) s.fnArgs[s.fnArgs.length - 1] = s.depsChanged;
    var returnVal = s.fn.apply(s.fn, s.fnArgs);
    if (returnVal !== undefined) s(returnVal);
    inStream = undefined;
    if (s.depsChanged !== undefined) s.depsChanged = [];
    s.shouldUpdate = false;
    if (flushing() === false) flushUpdate();
    if (listenersNeedUpdating(s)) {
        if (!flushingStreamValue) s(s.val);
        else s.listeners.forEach(function(listener) {
            if (listener.shouldUpdate) updateLaterUsing(updateStream, listener);
        });
    }
}
/**
 * @private
 * Update the dependencies of a stream
 * @param {stream} stream
 */ function updateListeners(s) {
    var i, o, list;
    var listeners = s.listeners;
    for(i = 0; i < listeners.length; ++i){
        list = listeners[i];
        if (list.end === s) endStream(list);
        else {
            if (list.depsChanged !== undefined) list.depsChanged.push(s);
            list.shouldUpdate = true;
            findDeps(list);
        }
    }
    for(; orderNextIdx >= 0; --orderNextIdx){
        o = order[orderNextIdx];
        if (o.shouldUpdate === true) updateStream(o);
        o.queued = false;
    }
}
/**
 * @private
 * Add stream dependencies to the global `order` queue.
 * @param {stream} stream
 * @see updateDeps
 */ function findDeps(s) {
    var i;
    var listeners = s.listeners;
    if (s.queued === false) {
        s.queued = true;
        for(i = 0; i < listeners.length; ++i)findDeps(listeners[i]);
        order[++orderNextIdx] = s;
    }
}
function updateLaterUsing(updater, stream) {
    toUpdate.push(stream);
    stream.updaters.push(updater);
    stream.shouldUpdate = true;
}
/**
 * @private
 */ function flushUpdate() {
    flushingUpdateQueue = true;
    while(toUpdate.length > 0){
        var stream = toUpdate.shift();
        var nextUpdateFn = stream.updaters.shift();
        if (nextUpdateFn && stream.shouldUpdate) nextUpdateFn(stream);
    }
    flushingUpdateQueue = false;
}
/**
 * @private
 * Push down a value into a stream
 * @param {stream} stream
 * @param {*} value
 */ function updateStreamValue(n, s) {
    s.val = n;
    s.hasVal = true;
    if (inStream === undefined) {
        flushingStreamValue = true;
        updateListeners(s);
        if (toUpdate.length > 0) flushUpdate();
        flushingStreamValue = false;
    } else if (inStream === s) markListeners(s, s.listeners);
    else updateLaterUsing(function(s) {
        updateStreamValue(n, s);
    }, s);
}
/**
 * @private
 */ function markListeners(s, lists) {
    var i, list;
    for(i = 0; i < lists.length; ++i){
        list = lists[i];
        if (list.end !== s) {
            if (list.depsChanged !== undefined) list.depsChanged.push(s);
            list.shouldUpdate = true;
        } else endStream(list);
    }
}
/**
 * @private
 * Add dependencies to a stream
 * @param {Array<stream>} dependencies
 * @param {stream} stream
 */ function addListeners(deps, s) {
    for(var i = 0; i < deps.length; ++i)deps[i].listeners.push(s);
}
/**
 * @private
 * Removes an stream from a dependency array
 * @param {stream} stream
 * @param {Array<stream>} dependencies
 */ function removeListener(s, listeners) {
    var idx = listeners.indexOf(s);
    listeners[idx] = listeners[listeners.length - 1];
    listeners.length--;
}
/**
 * @private
 * Detach a stream from its dependencies
 * @param {stream} stream
 */ function detachDeps(s) {
    for(var i = 0; i < s.deps.length; ++i)removeListener(s, s.deps[i].listeners);
    s.deps.length = 0;
}
/**
 * @private
 * Ends a stream
 */ function endStream(s) {
    if (s.deps !== undefined) detachDeps(s);
    if (s.end !== undefined) detachDeps(s.end);
}
/**
 * @private
 */ /**
 * @private
 * transducer stream transformer
 */ function StreamTransformer() {}
StreamTransformer.prototype['@@transducer/init'] = function() {};
StreamTransformer.prototype['@@transducer/result'] = function() {};
StreamTransformer.prototype['@@transducer/step'] = function(s, v) {
    return v;
};
module.exports = flyd;

},{"78d6c069c5ac2106":"lsoeg"}],"lsoeg":[function(require,module,exports,__globalThis) {
var _arity = /*#__PURE__*/ require("52e62e89cc55635d");
var _curry1 = /*#__PURE__*/ require("4c77242c5a611a9d");
var _curry2 = /*#__PURE__*/ require("190d557550abe457");
var _curryN = /*#__PURE__*/ require("63f61db97b28b703");
/**
 * Returns a curried equivalent of the provided function, with the specified
 * arity. The curried function has two unusual capabilities. First, its
 * arguments needn't be provided one at a time. If `g` is `R.curryN(3, f)`, the
 * following are equivalent:
 *
 *   - `g(1)(2)(3)`
 *   - `g(1)(2, 3)`
 *   - `g(1, 2)(3)`
 *   - `g(1, 2, 3)`
 *
 * Secondly, the special placeholder value [`R.__`](#__) may be used to specify
 * "gaps", allowing partial application of any combination of arguments,
 * regardless of their positions. If `g` is as above and `_` is [`R.__`](#__),
 * the following are equivalent:
 *
 *   - `g(1, 2, 3)`
 *   - `g(_, 2, 3)(1)`
 *   - `g(_, _, 3)(1)(2)`
 *   - `g(_, _, 3)(1, 2)`
 *   - `g(_, 2)(1)(3)`
 *   - `g(_, 2)(1, 3)`
 *   - `g(_, 2)(_, 3)(1)`
 *
 * @func
 * @memberOf R
 * @since v0.5.0
 * @category Function
 * @sig Number -> (* -> a) -> (* -> a)
 * @param {Number} length The arity for the returned function.
 * @param {Function} fn The function to curry.
 * @return {Function} A new, curried function.
 * @see R.curry
 * @example
 *
 *      var sumArgs = (...args) => R.sum(args);
 *
 *      var curriedAddFourNumbers = R.curryN(4, sumArgs);
 *      var f = curriedAddFourNumbers(1, 2);
 *      var g = f(3);
 *      g(4); //=> 10
 */ var curryN = /*#__PURE__*/ _curry2(function curryN(length, fn) {
    if (length === 1) return _curry1(fn);
    return _arity(length, _curryN(length, [], fn));
});
module.exports = curryN;

},{"52e62e89cc55635d":"2VLEM","4c77242c5a611a9d":"gGF42","190d557550abe457":"cBMu9","63f61db97b28b703":"6xHao"}],"2VLEM":[function(require,module,exports,__globalThis) {
function _arity(n, fn) {
    /* eslint-disable no-unused-vars */ switch(n){
        case 0:
            return function() {
                return fn.apply(this, arguments);
            };
        case 1:
            return function(a0) {
                return fn.apply(this, arguments);
            };
        case 2:
            return function(a0, a1) {
                return fn.apply(this, arguments);
            };
        case 3:
            return function(a0, a1, a2) {
                return fn.apply(this, arguments);
            };
        case 4:
            return function(a0, a1, a2, a3) {
                return fn.apply(this, arguments);
            };
        case 5:
            return function(a0, a1, a2, a3, a4) {
                return fn.apply(this, arguments);
            };
        case 6:
            return function(a0, a1, a2, a3, a4, a5) {
                return fn.apply(this, arguments);
            };
        case 7:
            return function(a0, a1, a2, a3, a4, a5, a6) {
                return fn.apply(this, arguments);
            };
        case 8:
            return function(a0, a1, a2, a3, a4, a5, a6, a7) {
                return fn.apply(this, arguments);
            };
        case 9:
            return function(a0, a1, a2, a3, a4, a5, a6, a7, a8) {
                return fn.apply(this, arguments);
            };
        case 10:
            return function(a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
                return fn.apply(this, arguments);
            };
        default:
            throw new Error('First argument to _arity must be a non-negative integer no greater than ten');
    }
}
module.exports = _arity;

},{}],"gGF42":[function(require,module,exports,__globalThis) {
var _isPlaceholder = /*#__PURE__*/ require("823fa2c75953ce67");
/**
 * Optimized internal one-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */ function _curry1(fn) {
    return function f1(a) {
        if (arguments.length === 0 || _isPlaceholder(a)) return f1;
        else return fn.apply(this, arguments);
    };
}
module.exports = _curry1;

},{"823fa2c75953ce67":"f64bl"}],"f64bl":[function(require,module,exports,__globalThis) {
function _isPlaceholder(a) {
    return a != null && typeof a === 'object' && a['@@functional/placeholder'] === true;
}
module.exports = _isPlaceholder;

},{}],"cBMu9":[function(require,module,exports,__globalThis) {
var _curry1 = /*#__PURE__*/ require("5d81ba6725eb6e5a");
var _isPlaceholder = /*#__PURE__*/ require("45704e06c11545be");
/**
 * Optimized internal two-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */ function _curry2(fn) {
    return function f2(a, b) {
        switch(arguments.length){
            case 0:
                return f2;
            case 1:
                return _isPlaceholder(a) ? f2 : _curry1(function(_b) {
                    return fn(a, _b);
                });
            default:
                return _isPlaceholder(a) && _isPlaceholder(b) ? f2 : _isPlaceholder(a) ? _curry1(function(_a) {
                    return fn(_a, b);
                }) : _isPlaceholder(b) ? _curry1(function(_b) {
                    return fn(a, _b);
                }) : fn(a, b);
        }
    };
}
module.exports = _curry2;

},{"5d81ba6725eb6e5a":"gGF42","45704e06c11545be":"f64bl"}],"6xHao":[function(require,module,exports,__globalThis) {
var _arity = /*#__PURE__*/ require("6f3b7278812eedc6");
var _isPlaceholder = /*#__PURE__*/ require("2e14d44c4c64ce4a");
/**
 * Internal curryN function.
 *
 * @private
 * @category Function
 * @param {Number} length The arity of the curried function.
 * @param {Array} received An array of arguments received thus far.
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */ function _curryN(length, received, fn) {
    return function() {
        var combined = [];
        var argsIdx = 0;
        var left = length;
        var combinedIdx = 0;
        while(combinedIdx < received.length || argsIdx < arguments.length){
            var result;
            if (combinedIdx < received.length && (!_isPlaceholder(received[combinedIdx]) || argsIdx >= arguments.length)) result = received[combinedIdx];
            else {
                result = arguments[argsIdx];
                argsIdx += 1;
            }
            combined[combinedIdx] = result;
            if (!_isPlaceholder(result)) left -= 1;
            combinedIdx += 1;
        }
        return left <= 0 ? fn.apply(this, combined) : _arity(left, _curryN(length, combined, fn));
    };
}
module.exports = _curryN;

},{"6f3b7278812eedc6":"2VLEM","2e14d44c4c64ce4a":"f64bl"}],"eikiG":[function(require,module,exports,__globalThis) {
var flyd = require("66fe1fddd0a59106");
function dropRepeatsWith(eq, s) {
    var prev;
    return flyd.combine(function(s, self) {
        if (!self.hasVal || !eq(s.val, prev)) {
            self(s.val);
            prev = s.val;
        }
    }, [
        s
    ]);
}
exports.dropRepeats = function(s) {
    return dropRepeatsWith(strictEq, s);
};
exports.dropRepeatsWith = flyd.curryN(2, dropRepeatsWith);
function strictEq(a, b) {
    return a === b;
}

},{"66fe1fddd0a59106":"fcqPo"}],"cGYvw":[function(require,module,exports,__globalThis) {
module.exports = "-----BEGIN PGP PUBLIC KEY BLOCK-----\n\nxjMEYf8cKBYJKwYBBAHaRw8BAQdAHE6JBN/PRr/7ZLFhb5vLLrKSWJLXxNpG\nMbqVZccBAL3NOVdpY2tlZFdpdGNoNkBwcm90b25tYWlsLmNvbSA8V2lja2Vk\nV2l0Y2g2QHByb3Rvbm1haWwuY29tPsKPBBAWCgAgBQJh/xwoBgsJBwgDAgQV\nCAoCBBYCAQACGQECGwMCHgEAIQkQ4GeD5hotLgUWIQTKTXvpnWFrweQb09Dg\nZ4PmGi0uBSUaAP44QKmwpTeK+oioSWo3qY4TpfXcz7d4qi49tmADmb6G8QEA\n1FEUMJllc9Qq3xiACBY/O5XIXsAlLlu1cAe2vkNcKgTOOARh/xwoEgorBgEE\nAZdVAQUBAQdAPj3oEz8PeUhGvxXZ4CYy8ejL/SiS8gyWPlAI2f2RWn4DAQgH\nwngEGBYIAAkFAmH/HCgCGwwAIQkQ4GeD5hotLgUWIQTKTXvpnWFrweQb09Dg\nZ4PmGi0uBf9zAP9tggzcytwB2XGu2c50Pfa0IZSEEiWnhN2A7uQRtqAKNAD/\nRQPybgO7rHpk9XjjHvqk87NYWAkj2kCCgK5rK+cYjwk=\n=9jDO\n-----END PGP PUBLIC KEY BLOCK-----\n";

},{}]},["agb61"], "agb61", "parcelRequireb612", {})

//# sourceMappingURL=app.397c74d2.js.map
