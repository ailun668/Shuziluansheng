import { html, css } from "../utils/template.js";
//100%
class sContextmenuElement extends HTMLElement {
    static observedAttributes = [];
    static #template = html`<template>
        <main></main>
    </template>`;
    static #style = css`

    :host s-backdrop {
       opacity: 0;
       display: none;
    }
    
    :host([open]) s-backdrop {
        display: block;
    }

    :host main {
      position: fixed;
      left: 120px;
      top: 102px;
      width: fit-content;
      z-index: 20002;
      animation: contextmenuOpen 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      animation-fill-mode: forwards;
      animation-iteration-count: 1;
      pointer-events: none;
      box-sizing: border-box;
      box-shadow: 0 0 8px #ccc;
      background-color: #fcfcfc;
      border-radius: 12px;
      padding: 4px;
      display: none;
    }

    :host([open]) main {
        display: block;
    }

    :host main button {
        align-items: center;
        border-radius: 12px;
        display: flex;
        font-size: 13px;
        min-height: 28px;
        padding: 2px 12px;
        border: none;
        pointer-events: all;
        width: 100%;
        background: none;
    }

    :host main button:hover {
        background: #efefef;
    }

    :host main button[disabled]:hover {
        background: none;
    }

    @keyframes contextmenuOpen {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }

    @keyframes contextmenuClose {
        0% {
          opacity: 1;
        }
        100% {
          opacity: 0;
        }
      }

  `;

    #shadowRoot = null;
    mouseevent = null;
    #clickEvent = null;
    #contextmenuEvent = null;

    constructor() {
        super();
        this.#shadowRoot = this.attachShadow({ mode: "closed" });
        this.#shadowRoot.adoptedStyleSheets = [sContextmenuElement.#style];
        this.#shadowRoot.append(
            document.importNode(sContextmenuElement.#template.content, true)
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
            // this.#shadowRoot
            //     .querySelector("s-backdrop")
            //     .addEventListener("click", () => {
            //         this.#dismiss();
            //     });
            window.addEventListener('click', this.#clickEvent = () => this.#dismiss());

            setTimeout(() => {
                window.addEventListener('contextmenu', this.#contextmenuEvent = () => {
                    this.#dismiss();
                });
            });
            const { clientX, clientY } = this.mouseevent;
            const main = this.#shadowRoot.querySelector('main');

            const { width, height } = main.getBoundingClientRect();

            const dx = window.innerWidth - (clientX + width);
            const dy = window.innerHeight - (clientY + height);

            const padding = 6;

            const left = dx < 0 ? clientX + dx - padding : clientX;
            const top = dy < 0 ? clientX + dy - padding : clientY;

            main.style.left = `${left}px`;
            main.style.top = `${top}px`;
        } else {
            this.#dismiss();
        }
    }

    connectedCallback() { }
    disconnectedCallback() {
        window.removeEventListener('click', this.#clickEvent);
        window.removeEventListener('contextmenu', this.#contextmenuEvent);
    }
    attributeChangedCallback() { }

    static buttons = [];
    #buttons = [];

    get buttons() {
        return this.#buttons;
    }

    set buttons(e) {
        this.#setButtons(e);
        this.#buttons = [e];
    }

    #setButtons = (buttons) => {
        buttons.forEach((item) => {
            const button = document.createElement("button");
            button.innerHTML = item.text;
            item.disabled && button.setAttribute('disabled', '');
            item.click &&
                button.addEventListener("click", (e) => {
                    e.stopPropagation();
                    item.click(item, e);
                    this.#dismiss();
                });
            this.#shadowRoot.querySelector("main").append(button);
        });
    }

    #dismiss = () => {
        const main = this.#shadowRoot.querySelector("main");
        main.style.setProperty("animation-name", "contextmenuClose");
        main.addEventListener("animationend", () => this.hasAttribute("dismiss-remove") && this.remove());
    }
}

customElements.define("s-contextmenu", sContextmenuElement);

export default class Contextmenu {
    static create = ({ ev, buttons }) => {
        const contextmenu = document.createElement("s-contextmenu");
        document.body.append(contextmenu);
        contextmenu.mouseevent = ev;
        contextmenu.setAttribute("dismiss-remove", "");
        buttons && (contextmenu.buttons = buttons);
        contextmenu.open = true;
    };
}
