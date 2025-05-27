import { html } from "../utils/template.js";

class sRadiosElement extends HTMLElement {
    static observedAttributes = ["value"];
    static #template = html`<template><slot></slot></template>`;

    #shadowRoot = null;

    constructor() {
        super();

        this.#shadowRoot = this.attachShadow({ mode: "closed" });
        this.#shadowRoot.append(
            document.importNode(sRadiosElement.#template.content, true)
        );
    }

    connectedCallback() {
        this.#initEvent();
    }

    disconnectedCallback() { }

    attributeChangedCallback(name) {
        name === "value" && this.#updateValue(name);
    }

    #initEvent = () => {
        this.childNodes.forEach(c => {
            c.addEventListener('click', () => {
                if (c.hasAttribute('toggled')) return;
                this.setAttribute('value', c.getAttribute('value'));
            });
        });
    }

    #updateValue = (name) => {
        this.childNodes.forEach(c => {
            c.removeAttribute('toggled');
            if (c.getAttribute('value') === this.getAttribute(name)) {
                c.setAttribute('toggled', '');
            }
        });
    }
}

customElements.define("s-radios", sRadiosElement);
