import { JSDOM } from 'jsdom';

const open = (url, done) => {
    return new Promise((resolve, reject) => {
        JSDOM.fromURL(url, {
            runScripts: "dangerously",
            resources: "usable"
        }).then(dom => {
            page.window = dom.window;
            page.document = dom.window.document;
            if (page.document.readyState === 'loading') {
                page.document.addEventListener('DOMContentLoaded', resolve);
            }
            else { resolve(); }
        }).catch(reject);
    });
};

const close = (done) => {
    done();
};

const click = (text) => {
    find({ tag: 'button', text }).click();
};

const set = (prompt) => {
    let label = find({ tag: 'label', text: prompt });
    return element(`#${label.htmlFor}`);
};

const section = (text) => {
    return find({ tag: 'section', text }).textContent;
};

export const page = { open, close, section, set, click };

const find = (options) => {
    let candidates = Array.from(page.document
        .querySelectorAll(options.tag))
        .filter(element => element.textContent.indexOf(options.text) !== -1);
    if (candidates.length === 0) {
        throw new Error(`${options.tag} with text '${options.text}' not found`);
    }
    return candidates[0];
};

const element = (selector) => {
    return page.document.querySelector(selector);
};