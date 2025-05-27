import { html, css } from "../utils/template.js";

class sRadioElement extends HTMLElement {
    static observedAttributes = ["toggled"];
    static #template = html`<template>
     <main>
        <div class="indicator">
            <div class="indicator-dot"></div>
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
        border: 1px solid #d1d1d1;
        border-radius: 100%;
        background: #ffffff;
        position: relative;
        width: 19px;
        height: 19px;
        box-sizing: border-box;
        overflow: hidden;
    }

    :host([toggled]) .indicator-dot{
        width: 100%;
        height: 100%;
        background: rgb(76, 141, 255);
        position: relative;
    }

    :host([toggled]) .indicator-dot:after{
        content: "";
        position: absolute;
        background: rgb(255, 255, 255);
        left: calc(100% - 12.5px);
        top: calc(100% - 12.5px);;
        width: 8px;
        height: 8px;
        border-radius: 100%;
    }

    :host main:active .indicator{
        background: #d1d1d1;
    }

    @keyframes checkedAnimation {
        0% {
          opacity: 0;
          transform: scale(0.5);
        }
  
        100% {
          opacity: 1;
          transform: scale(1);
        }
    }

    @keyframes unCheckedAnimation {
        0% {
          opacity: 1;
          transform: scale(1);
        }
  
        100% {
          opacity: 0;
          transform: scale(0.5);
        }
    }
  `;

    #shadowRoot = null;

    constructor() {
        super();
        this.#shadowRoot = this.attachShadow({ mode: "open" });
        this.#shadowRoot.adoptedStyleSheets = [sRadioElement.#style];
        this.#shadowRoot.append(
            document.importNode(sRadioElement.#template.content, true)
        );

    }

    connectedCallback() {

    }

    disconnectedCallback() {

    }

    attributeChangedCallback(name) {
        name === 'toggled' && this.#updateValue();
    }

    #updateValue = () => {
        console.log('toggled');
    }

}

customElements.define("s-radio", sRadioElement);
