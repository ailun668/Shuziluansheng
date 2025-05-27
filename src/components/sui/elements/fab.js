import { html, css } from "../utils/template.js";

class sFabElement extends HTMLElement {
  // static observedAttributes = ["disabled", "size"];
  static #template = html`<template><slot></slot></template>`;
  static #style = css`
    :host {
      display: inline-block;
      background: #f4f5f8;
      color:#000000;
      user-select: none;
      box-sizing: border-box;
      padding: 13px;
      font-size: 16px;
      border-radius: 14px;
      cursor:pointer;
      font-weight:500;
      margin-inline: 2px;
      transition: background-color, opacity 100ms linear;
    }
  `;

  #shadowRoot = null;

  constructor() {
    super();

    this.#shadowRoot = this.attachShadow({ mode: "closed" });
    this.#shadowRoot.adoptedStyleSheets = [sFabElement.#style];
    this.#shadowRoot.append(
      document.importNode(sFabElement.#template.content, true)
    );

  }

  connectedCallback() {

  }

  disconnectedCallback() {

  }

  attributeChangedCallback(name) {

  }
}

customElements.define("s-fab", sFabElement);
