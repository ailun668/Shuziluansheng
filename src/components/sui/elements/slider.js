import { html, css } from "../utils/template.js";

class sSliderElement extends HTMLElement {
    static observedAttributes = ["toggled"];
    static #template = html`<template>
        <main id="main" style="--computed-thumb-width: 20px; --computed-thumb-height: 20px;">
            <div id="tracks-and-thumbs">
            <div id="groove-track" part="track groove-track"></div>
            <div id="buffer-track" part="track buffer-track" style="left: 0%; width: 0%;"></div>
            <div id="range-track" part="track range-track" style="left: 23%; width: 48%;"></div>
            <div id="thumbs">
            <div id="start-thumb" class="thumb" part="thumb start-thumb" data-value="start" tabindex="0" style="left: 23%; z-index: 1;"></div>
            <div id="end-thumb" class="thumb" part="thumb end-thumb" data-value="end" tabindex="0" style="left: 71%; z-index: 0;"></div></div></div>
            <div id="ticks"></div>
            <div id="labels"><slot></slot></div>
        </main>
    </template>`;
    static #style = css`

  
  `;

    #shadowRoot = null;

    constructor() {
        super();
        this.#shadowRoot = this.attachShadow({ mode: "open" });
        this.#shadowRoot.adoptedStyleSheets = [sSliderElement.#style];
        this.#shadowRoot.append(
            document.importNode(sSliderElement.#template.content, true)
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

customElements.define("s-slider", sSliderElement);
