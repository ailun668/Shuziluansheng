import { html, css } from "../utils/template.js";
//100%
class sBackdropElement extends HTMLElement {
  static #template = html`<template><slot></slot></template>`;
  static #style = css`
    :host {
      width:100%;
      height:100%;
      background: rgba(0, 0, 0, 0.4);
      position: fixed;
      left:0;
      top:0;
      font-size: 12px;
      user-select: none;
      z-index: 1001;
    }
  `;

  #shadowRoot = null;
  constructor() {
    super();
    this.#shadowRoot = this.attachShadow({ mode: "closed" });
    this.#shadowRoot.adoptedStyleSheets = [sBackdropElement.#style];
    this.#shadowRoot.append(
      document.importNode(sBackdropElement.#template.content, true)
    );
  }
}

customElements.define("s-backdrop", sBackdropElement);

