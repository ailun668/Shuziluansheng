import { html, css } from "../utils/template.js";

class sCheckboxElement extends HTMLElement {
    static observedAttributes = ["checked"];
    static #template = html`<template>
     <main>
        <div class="indicator">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none">
                <path fill="currentColor" d="M -4 -4 L 100 -4 L 100 100 L -4 100 L -4 -4 Z M 89.1 34.6 C 96.4 27 84.8 15.6 77.3 23.3 L 41.7 63.6 L 23.4 44.5 C 13.2 36.6 5.3 51 12.4 56.7 L 42.7 86.1 L 89.1 34.6 Z"></path>
            </svg>
        </div>
        <div class="description"><slot></slot></div>
     </main>
    </template>`;
    static #style = css`

    :host {
        display: block;
    }

    :host main{
        display: inline-flex;
        align-items: center;
    }

    :host .indicator{
        border: 1px solid #d1d1d1;
        border-radius: 6px;
        background: #ffffff;
        position: relative;
        width: 19px;
        height: 19px;
        box-sizing: border-box;
        overflow: hidden;
    }

    :host main:active .indicator{
        background: #d1d1d1;
    }

    :host svg{
        opacity: 0;
        animation: loadingAnimationIn .15s cubic-bezier(0.4, 0, 0.2, 1);
        animation-fill-mode: forwards;
        animation-iteration-count: 1;
    }
    
    :host svg{
        color: #4c8dff;
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
        this.#shadowRoot.adoptedStyleSheets = [sCheckboxElement.#style];
        this.#shadowRoot.append(
            document.importNode(sCheckboxElement.#template.content, true)
        );

    }

    connectedCallback() {
        this.#initEvelt();
    }

    disconnectedCallback() {

    }

    attributeChangedCallback(name) {
        name === 'checked' && this.#updateChecked();
    }

    #initEvelt = () => {
        const main = this.shadowRoot.querySelector('main');
        main.addEventListener('click', () => {
            if (this.getAttribute('checked') === 'true') {
                this.removeAttribute('checked');
            } else {
                this.setAttribute('checked', 'true');
            }
        })
    }

    #updateChecked = () => {
        const svg = this.shadowRoot.querySelector('svg');
        if (this.getAttribute('checked') === 'true') {
            svg.style.setProperty('animation-name', 'checkedAnimation');

        } else {
            svg.style.setProperty('animation-name', 'unCheckedAnimation');
        }
        this.dispatchEvent(new CustomEvent('change'));
    }
}

customElements.define("s-checkbox", sCheckboxElement);
