import { html, css } from "../utils/template.js";

class sLabelElements extends HTMLElement {
  static #template = html`<template><slot></slot></template>`;
  static #style = css`
    :host {
      display: block;
      line-height: 1.2;
      cursor: default;
      user-select: none;
      box-sizing: border-box;
    }
  `;

  #shadowRoot = null;

  constructor() {
    super();
    this.#shadowRoot = this.attachShadow({ mode: "closed" });
    this.#shadowRoot.adoptedStyleSheets = [sLabelElements.#style];
    this.#shadowRoot.append(
      document.importNode(sLabelElements.#template.content, true)
    );
  }
}

customElements.define("s-label", sLabelElements);
