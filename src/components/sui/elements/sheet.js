import { html, css } from "../utils/template.js";
//100%
class sSheetElement extends HTMLElement {
  static observedAttributes = ["header"];
  static #template = html`<template>
    <s-backdrop></s-backdrop>
    <main>
      <div class="sheet-group">
        <div class="sheet-header"></div>
      </div>
      <div class="sheet-group-cancel"></div>
    </main>
  </template>`;
  static #style = css`
    :host s-backdrop {
        display: none;
        animation-name: backdropShow;
        animation-fill-mode: forwards;
        animation-iteration-count: 1;
        animation-duration: 0.25s;
        animation-timing-function cubic-bezier(0.4, 0, 0.2, 1);
    }

    :host([open]) s-backdrop{
      display: block;
    }

    :host main {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      z-index: 20002;
      animation-name: sheetOpen;
      animation-iteration-count: 1;
      animation-duration: 0.25s;
      animation-timing-function cubic-bezier(0.4, 0, 0.2, 1);
      animation-fill-mode: forwards;
      animation-iteration-count: 1;
      padding: 0 8px;
      pointer-events: none;
      box-sizing: border-box;
      display: none;
    }

    :host([open]) main {
      display: block;
    }

    :host main .sheet-group,
    :host main .sheet-group-cancel {
      border-radius: 8px;
      overflow: hidden;
      margin-bottom: 8px;
    }

    :host main .sheet-group .sheet-header {
      font-size: 14px;
      color: #999999;
      padding: 10px 0;
      text-align: center;
      background: #fff;
      border-bottom: 1px solid #e7e7e7;
      display: block;
    }

    :host([header]) main .sheet-group .sheet-header {
      display: block;
    }

    :host main .sheet-group button,
    :host main .sheet-group-cancel button {
      display: block;
      position: relative;
      width: 100%;
      border: 0;
      outline: none;
      background: #ffffff;
      color: var(--s-primary-color);
      font-family: inherit;
      overflow: hidden;
      cursor: pointer;
      padding: 8px 0;
      min-height: 56px;
      font-size: 18px;
      pointer-events: all;
      font-weight: 500;
    }

    :host main .sheet-group-cancel button {
      color: #eb445a;
    }

    :host main .sheet-group button:active,
    :host main .sheet-group-cancel button:active {
      box-shadow: inset 0 0 6px #cccccc;
    }

    :host main .sheet-group button:hover {
      background: #f3f7fd;
    }

    :host main .sheet-group-cancel button:hover {
      background: #fdf2f3;
    }

    @keyframes sheetOpen {
      0% {
        opacity: 0;
        transform: translateY(100%);
      }

      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes sheetClose {
      0% {
        opacity: 1;
        transform: translateY(0);
      }

      100% {
        opacity: 0;
        transform: translateY(100%);
      }
    }

    @keyframes backdropShow {
        0% {
            opacity: 0;
        }

        100% {
            opacity: 1;
        }
    }

    @keyframes backdropHide {
        0% {
            opacity: 1;
        }

        100% {
            opacity: 0;
        }
    }
  `;

  #shadowRoot = null;

  constructor() {
    super();
    this.#shadowRoot = this.attachShadow({ mode: "closed" });
    this.#shadowRoot.adoptedStyleSheets = [sSheetElement.#style];
    this.#shadowRoot.append(
      document.importNode(sSheetElement.#template.content, true)
    );
  }

  static open = false;
  #open = false;
  get open() {
    return this.#open;
  }
  set open(e) {
    this.#open = e;
    if (e) {
      this.setAttribute('open', '');
      this.#shadowRoot
        .querySelector("s-backdrop")
        .addEventListener("click", () => {
          this.#dismiss();
        });
    } else {
      this.#dismiss();
    }
  }

  connectedCallback() { }

  disconnectedCallback() { }

  attributeChangedCallback(name) {
    name === "header" && this.#setHeader();
  }

  static buttons = [];
  #buttons = [];

  get buttons() {
    return this.#buttons;
  }

  set buttons(e) {
    this.#setButtons(e);
    this.#buttons = [e];
  }

  #setHeader() {
    this.#shadowRoot.querySelector(".sheet-header").innerHTML =
      this.getAttribute("header");
  }

  #setButtons(buttons) {
    buttons.forEach((item) => {
      const button = document.createElement("button");
      button.innerHTML = item.text;
      !item.disabled &&
        item.click &&
        button.addEventListener("click", (e) => {
          e.stopPropagation();
          item.click(item, e);
          this.#dismiss();
        });
      if (item.role === "cancel") {
        this.#shadowRoot.querySelector(".sheet-group-cancel").append(button);
      } else {
        this.#shadowRoot.querySelector(".sheet-group").append(button);
      }
    });
  }

  #dismiss() {
    const backdrop = this.#shadowRoot.querySelector("s-backdrop");
    backdrop.style.setProperty("animation-name", "backdropHide");
    const main = this.#shadowRoot.querySelector("main");
    main.style.setProperty("animation-name", "sheetClose");
    main.addEventListener("animationend", () => this.hasAttribute("dismiss-remove") && this.remove());
  }
}

customElements.define("s-sheet", sSheetElement);

export default class Sheet {
  static create = ({ buttons, header }) => {
    const sheet = document.createElement("s-sheet");
    document.body.append(sheet);
    sheet.setAttribute("dismiss-remove", "");
    header && sheet.setAttribute("header", header);
    buttons && (sheet.buttons = buttons);
    sheet.open = true;
  };
}
