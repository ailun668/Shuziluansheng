import { html } from "../utils/template.js";
//100%
class sButtonsElement extends HTMLElement {
  static #template = html`<template><slot></slot></template>`;

  #shadowRoot = null;

  constructor() {
    super();

    this.#shadowRoot = this.attachShadow({ mode: "closed" });
    this.#shadowRoot.append(
      document.importNode(sButtonsElement.#template.content, true)
    );
    this.addEventListener('click', this.#click);
  }

  connectedCallback() { }

  disconnectedCallback() {
    this.removeEventListener('click', this.#click);
  }

  attributeChangedCallback() { }

  #click = (events) => {
    this.childNodes.forEach(child => {
      child.removeAttribute('toggled');
      child === events.target && child.setAttribute('toggled', '');
    })
  }
}

customElements.define("s-buttons", sButtonsElement);
