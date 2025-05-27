import { html, css } from "../utils/template.js";

class sInputElements extends HTMLElement {
  static observedAttributes = ["placeholder", "value", "modelvalue"];
  static #template = html`<template
    ><slot></slot>
    <main><input /></main
  ></template>`;
  static #style = css`
    :host {
      background: rgba(0, 0, 0, 0.08);
      border-radius: 6px;
      display: block;
      position: relative;
      height: 32px;
      box-sizing: border-box;
      font-size: 12.5px;
    }

    :host main {
      display: flex;
      align-items: center;
      width: 100%;
      height: 100%;
    }

    :host(:focus) {
      outline: 2px solid var(--s-primary-color);
      outline-offset: -1px;
    }

    :host input {
      width: 100%;
      height: 100%;
      padding: 0px 6px;
      box-sizing: border-box;
      color: inherit;
      background: 0px 0px;
      border: none;
      outline: 0px;
      font-family: inherit;
      font-size: inherit;
      font-weight: inherit;
      text-align: inherit;
      cursor: inherit;
    }

    ::selection {
      color: var(--s-selection-color);
      background-color: var(--s-selection-background-color);
    }

    :host([error]) ::selection {
      color: white;
      background-color: #d50000;
    }
  `;

  #shadowRoot = null;

  constructor() {
    super();
    this.#shadowRoot = this.attachShadow({ mode: "closed" });
    this.#shadowRoot.adoptedStyleSheets = [sInputElements.#style];
    this.#shadowRoot.append(
      document.importNode(sInputElements.#template.content, true)
    );

    const input = this.#shadowRoot.querySelector("input");

    // this.addEventListener("click", (event) => this.#onClick(event));
    // this.addEventListener("pointerenter", () => this.#onPointerEnter());
    // this.addEventListener("pointerleave", () => this.#onPointerLeave());
    // this.addEventListener("focusin", (event) => this.#onFocusIn(event));
    // this.addEventListener("focusout", (event) => this.#onFocusOut(event));
    // this.addEventListener("keydown", (event) => this.#onKeyDown(event));

    input.addEventListener("change", (event) => this.#onInputChange(event));
    input.addEventListener("input", (event) => this.#onInputInput(event));
    input.addEventListener("search", (event) => this.#onInputSearch(event));
  }

  #onInputChange = (event) => {
    console.log("change");
  };

  #onInputInput = (event) => {
    const input = this.#shadowRoot.querySelector("input");
    this.setAttribute("modelValue", input.value);
    this.setAttribute("value", input.value);
    this.dispatchEvent(new CustomEvent("input", { bubbles: true }));
  };

  #onInputSearch = (event) => {
    console.log("search");
  };

  connectedCallback() { }

  disconnectedCallback() { }

  attributeChangedCallback(name) {
    name === "placeholder" && this.#updatePlaceholder();
    name === "value" && this.#updateValue();
    name === "modelvalue" && this.#updateModelvalue();
  }

  #updatePlaceholder = () => {
    const placeholder = this.getAttribute("placeholder");
    const input = this.#shadowRoot.querySelector("input");
    input.setAttribute("placeholder", placeholder);
  };

  #updateValue = () => {
    const value = this.getAttribute("value");
    const input = this.#shadowRoot.querySelector("input");
    input.setAttribute("value", value);
  };

  #updateModelvalue = () => {
    const value = this.getAttribute("modelvalue");
    const input = this.#shadowRoot.querySelector("input");
    input.setAttribute("value", value);
  };
}

customElements.define("s-input", sInputElements);
