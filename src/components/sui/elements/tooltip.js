import { html, css } from "../utils/template.js";

class sTooltipElement extends HTMLElement {
    static observedAttributes = [];
    static #template = html`<template><slot></slot></template>`;
    static #style = css`
    :host {
        border-radius: 12px;
        background: #ebebeb;
        position: fixed;
        user-select: none;
        z-index: 1009;
        color: --s-text-color;
        box-shadow: rgba(0, 0, 0, 0.17) 0px 3px 10px 0px;
        position: fixed;
        padding: 3px 10px;
        width: fit-content;
        height: fit-content;
        max-width: 300px;
        box-sizing: border-box;
        pointer-events: none;
        border:1px solid #dcdcdc;
        font-size: 12px;
        --align: bottom;
        --whitespace: 8px;
    }

    :host([type="dark"]) {
        font-weight: 600;
        background: rgb(67, 67, 67);
        color: #ffffff;
        min-width: 15px;
        min-height: 15px;
        padding: 5px 12px;
        border-radius: 20px;
        border: none;
    }
    `;

    #shadowRoot = null;

    constructor() {
        super();
        this.#shadowRoot = this.attachShadow({ mode: "closed" });
        this.#shadowRoot.adoptedStyleSheets = [sTooltipElement.#style];
        this.#shadowRoot.append(
            document.importNode(sTooltipElement.#template.content, true)
        );

        this.addEventListener('pointerover', () => {

        });

        this.addEventListener('pointerout', () => {

        });
    }

    connectedCallback() {
    }

    disconnectedCallback() {

    }

    attributeChangedCallback(name) {

    }
}

customElements.define("s-tooltip", sTooltipElement);

export default class Tooltip {
    event = null;
    current = null;
    timer = null;
    static #create = (event, content) => {
        const { clientX, clientY } = event;
        this.timer && clearTimeout(this.timer);
        this.current?.remove();
        this.current = document.createElement("s-tooltip");
        this.current.setAttribute('type', 'dark')
        document.body.append(this.current);
        this.current.innerHTML = content;
        const { right: r, bottom: b } = this.current.getBoundingClientRect();
        let dx = 0, dy = 0;
        r > window.innerWidth && (dx = r - window.innerWidth);
        b > window.innerWidth && (dy = b - window.innerWidth);
        this.current.style.setProperty('left', clientX - dx + 'px');
        this.current.style.setProperty('top', clientY - dy + 'px');
    };

    static #dismiss = () => {
        this.timer = setTimeout(() => {
            this.current?.remove();
            this.current = null;
        });
    }

    static show = (event, content) => {
        this.#create(event, content);
    };

    static dismiss = () => {
        this.#dismiss();
    };
}
