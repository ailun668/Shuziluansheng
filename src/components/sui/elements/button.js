import { html, css } from "../utils/template.js";
//100%
class sButtonElement extends HTMLElement {
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
      transition: background-color 100ms linear;
      background: #ebebeb;
      color: #252b3a;
    }

    :host([disabled]) {
      pointer-events: none;
      opacity: 0.5;
    }

    :host([hidden]) {
      display: none;
    }

    :host(:hover){
      background: #dcdcdc;
    }

    :host(:active){
      transform: scale(0.96);
      background: #c2c2c2;
    }

    :host([type="primary"]){
      background: var(--s-primary-color);
      color:#fff;
    }

    :host([type="primary"]:hover){
      background: var(--s-primary-hover-color);
    }

    :host([type="primary"]:active){
      background: var(--s-primary-active-color);
    }

    :host([type="secondary"]){
      background: var(--s-secondary-color);
      color:#fff;
    }

    :host([type="secondary"]:hover){
      background: var(--s-secondary-hover-color);
    }

    :host([type="secondary"]:active){
      background: var(--s-secondary-active-color);
      color:#fff;
    }

    :host([type="tertiary"]){
      background: var(--s-tertiary-color);
      color:#fff;
    } 

    :host([type="tertiary"]:hover){
      background: var(--s-tertiary-hover-color);
      color:#fff;
    }

    :host([type="tertiary"]:active){
      background: var(--s-tertiary-active-color);
      color:#fff;
    }

    :host([type="danger"]){
      background: var(--s-danger-color);
      color:#fff;
    }

    :host([type="danger"]:hover){
      background: var(--s-danger-hover-color);
      color:#fff;
    }

    :host([type="danger"]:active){
      background: var(--s-danger-active-color);
      color:#fff;
    }

    :host([type="success"]){
      background: var(--s-success-color);
      color:#fff;
    }

    :host([type="success"]:hover){
      background: var(--s-success-hover-color);
      color:#fff;
    }

    :host([type="success"]:active){
      background: var(--s-success-active-color);
      color:#fff;
    }

    :host([type="warning"]){
      background: var(--s-warning-color);
      color:#fff;
    }

    :host([type="warning"]:hover){
      background: var(--s-warning-hover-color);
      color:#fff;
    }

    :host([type="warning"]:active){
      background: var(--s-warning-active-color);
      color:#fff;
    }

    :host([type="info"]){
      background: var(--s-info-color);
      color:#fff;
    }

    :host([type="info"]:hover){
      background: var(--s-info-hover-color);
      color:#fff;
    }

    :host([type="info"]:active){
      background: var(--s-info-active-color);
      color:#fff;
    }

    :host([type="dark"]){
      background: var(--s-dark-color);
      color:#fff;
    }

    :host([type="dark"]:hover){
      background: var(--s-dark-hover-color);
      color:#fff;
    }

    :host([type="dark"]:active){
      background: var(--s-dark-active-color);
      color:#fff;
    }

    :host([type="text"]){
      background: none;
      color:var(--s-primary-color);
    }

    // :host([fill="outline"]){
    //   background: none;
    //   color:var(--s-primary-color);
    //   border:1px solid var(--s-primary-color);
    // }

    // :host([type="secondary"][fill="outline"]){
    //   background: none;
    //   color:var(--s-secondary-color);
    //   border:1px solid var(--s-secondary-color);
    // }

    // :host([type="tertiary"][fill="outline"]){
    //   background: none;
    //   color:var(--s-tertiary-color);
    //   border:1px solid var(--s-tertiary-color);
    // }

    // :host([type="danger"][fill="outline"]){
    //   background: none;
    //   color:var(--s-danger-color);
    //   border:1px solid var(--s-danger-color);
    // }

    // :host([type="warning"][fill="outline"]){
    //   background: none;
    //   color:var(--s-warning-color);
    //   border:1px solid var(--s-warning-color);
    // }

    // :host([type="info"][fill="outline"]){
    //   background: none;
    //   color:var(--s-info-color);
    //   border:1px solid var(--s-info-color);
    // }

    // :host([type="dark"][fill="outline"]){
    //   background: none;
    //   color:var(--s-dark-color);
    //   border:1px solid var(--s-dark-color);
    // }

    // :host([type="success"][fill="outline"]){
    //   background: none;
    //   color:var(--s-success-color);
    //   border:1px solid var(--s-success-color);
    // }

    // :host([type="success"][fill="outline"]){
    //   background: none;
    //   color:var(--s-success-color);
    //   border:1px solid var(--s-success-color);
    // }

    :host([size="mini"]){
      padding: 2px 6px;
    }

    :host([size="small"]){
      padding: 4px 8px;
    }

    :host([size="large"]){
      padding: 12px 16px;
    }
  `;

  #shadowRoot = null;

  constructor() {
    super();

    this.#shadowRoot = this.attachShadow({ mode: "closed" });
    this.#shadowRoot.adoptedStyleSheets = [sButtonElement.#style];
    this.#shadowRoot.append(
      document.importNode(sButtonElement.#template.content, true)
    );

  }

  connectedCallback() {

  }

  disconnectedCallback() {

  }

  attributeChangedCallback(name) {

  }
}

customElements.define("s-button", sButtonElement);
