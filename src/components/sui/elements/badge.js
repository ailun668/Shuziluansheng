import { html, css } from "../utils/template.js";

class sBadgeElement extends HTMLElement {
  static #template = html`<template><slot></slot></template>`;
  static #style = css`
    :host {
      display: inline-block;
      user-select: none;
      box-sizing: border-box;
      padding: 8px 12px;
      border-radius: 4px;
      cursor:pointer;
      font-weight:500;
      margin-inline: 2px;
      font-size: 14px;
      transition: background-color , opacity 100ms linear ;
      background: var(--s-primary-color);
      color: #fff;
    }
  `;

  #shadowRoot = null;

  constructor() {
    super();

    this.#shadowRoot = this.attachShadow({ mode: "closed" });
    this.#shadowRoot.adoptedStyleSheets = [sBadgeElement.#style];
    this.#shadowRoot.append(
      document.importNode(sBadgeElement.#template.content, true)
    );

  }

  connectedCallback() {

  }

  disconnectedCallback() {

  }

  attributeChangedCallback(name) {

  }
}

customElements.define("s-badge", sBadgeElement);
