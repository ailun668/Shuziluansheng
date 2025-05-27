import camera from '../spinner/camera.svg';
import gooeyRing from '../spinner/gooeyRing.svg';
import message from '../spinner/message.svg';
import spinner from '../spinner/spinner.svg';
import spin from '../spinner/spin.svg';
import tail from '../spinner/tail.svg';
import { html } from "../utils/template.js";
//100%
class sSpinnerElement extends HTMLElement {
    static observedAttributes = ["name"];
    static #template = html`<template><slot></slot></template>`;

    #shadowRoot = null;

    constructor() {
        super();

        this.#shadowRoot = this.attachShadow({ mode: "open" });
        this.#shadowRoot.append(
            document.importNode(sSpinnerElement.#template.content, true)
        );
    }

    connectedCallback() {

    }

    disconnectedCallback() { }

    attributeChangedCallback(name) {
        name === 'name' && this.#typeUpdate(name);
    }

    #typeUpdate = () => {
        const image = document.createElement('img');
        switch (this.getAttribute('name')) {
            case 'gooeyRing':
                image.src = gooeyRing;
                break;
            case 'camera':
                image.src = camera;
                break;
            case 'message':
                image.src = message;
                break;
            case 'spinner':
                image.src = spinner;
                break;
            case 'spin':
                image.src = spin;
                break;
            case 'tail':
                image.src = tail;
                break;
            default:
        }
        image.setAttribute('width', 34);
        image.setAttribute('height', 34);
        this.append(image);
    }

}

customElements.define("s-spinner", sSpinnerElement);