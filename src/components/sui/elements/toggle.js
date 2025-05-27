import { html, css } from "../utils/template.js";

class sToggleElement extends HTMLElement {
    static observedAttributes = ["checked"];
    static #template = html`<template>
    <main>
       <div class="indicator">
            <div class="indicator-track">
                <div class="indicator-thumb"></div>
            </div>
       </div>
       <div class="description"><slot></slot></div>
    </main>
   </template>`;
    static #style = css`
    :host {
        display: block;
        position: relative;
        width: fit-content;
    }

    :host main{
        display: inline-flex;
        align-items: center;
    }

    :host .indicator{
        width: 42px;
        height: 20px;
        position: relative;
        display: flex;
        align-items: center;
    }

    :host .indicator-track{
        background: #448aff;
        box-shadow: 0 0 0 4px #448aff;
        display: flex;
        align-items: center;
        width: 100%;
        border-radius:999px;
    }

    :host .indicator-thumb{
        width: 18px;
        height: 18px;
        border-radius: 999px;
        background: rgb(255, 255, 255);
        box-shadow: rgb(255, 255, 255) 0px 0px 0px 2px, rgba(0, 0, 0, 0.38);
    }

    :host s-label {
        margin-left: 6px;
        padding:1px 0;
    }
  `;

    #shadowRoot = null;

    constructor() {
        super();

        this.#shadowRoot = this.attachShadow({ mode: "closed" });
        this.#shadowRoot.adoptedStyleSheets = [sToggleElement.#style];
        this.#shadowRoot.append(
            document.importNode(sToggleElement.#template.content, true)
        );

        this.#shadowRoot.querySelector('main').addEventListener('click', () => {
        });
    }

    connectedCallback() {

    }

    disconnectedCallback() { }

    attributeChangedCallback(name) {
    }

    #updateValue = (name) => {

    }
}

customElements.define("s-toggle", sToggleElement);
