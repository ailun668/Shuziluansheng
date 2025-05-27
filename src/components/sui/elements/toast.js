import { html, css } from '../utils/template.js';
//100%
class sToastElement extends HTMLElement {
	static observedAttributes = ['opend'];
	static #template = html`<template><slot></slot></template>`;
	static #style = css`
		:host {
			border-radius: 20px;
			font-weight: 600;
			position: fixed;
			min-width: 15px;
			min-height: 15px;
			bottom: 50%;
			left: 50%;
			transform: translateX(-50%);
			padding: 5px 12px;
			box-sizing: border-box;
			color: rgba(255, 255, 255, 0.9);
			background: rgb(67, 67, 67);
			font-size: 12px;
			user-select: none;
			transition: transform 0.15s cubic-bezier(0.4, 0, 0.2, 1) 0s;
			opacity: 0;
			transform: translate(-50%, 60px);
			z-index: 3009;
		}

		:host([position='bottom']) {
			bottom: 15px;
		}

		:host([size='larger']) {
			padding: 6px 20px;
		}

		:host([type='danger']) {
			background: var(--s-danger-color);
		}

		:host([type='warning']) {
			background: var(--s-warning-color);
		}

		:host([type='success']) {
			background: var(--s-success-color);
		}

		:host([opend]) {
			animation: toastAnimation 3.15s cubic-bezier(0.4, 0, 0.2, 1);
			animation-fill-mode: forwards;
			animation-iteration-count: 1;
		}

		@keyframes toastAnimation {
			0% {
				opacity: 0;
				transform: translate(-50%, 60px);
			}

			10% {
				opacity: 1;
				transform: translate(-50%, 0);
			}

			90% {
				opacity: 1;
				transform: translate(-50%, 0);
			}

			100% {
				opacity: 0;
				transform: translate(-50%, 60px);
			}
		}
	`;

	#shadowRoot = null;
	#animationEvent = null;

	set opend(val) {
		val ? this.setAttribute('opend', '') : this.removeAttribute('opend');
		this.style.removeProperty('animation-name');
	}

	get opend() {
		return this.hasAttribute('opend');
	}

	constructor() {
		super();

		this.#shadowRoot = this.attachShadow({ mode: 'closed' });
		this.#shadowRoot.adoptedStyleSheets = [sToastElement.#style];
		this.#shadowRoot.append(
			document.importNode(sToastElement.#template.content, true)
		);
	}

	connectedCallback() {}

	disconnectedCallback() {}

	attributeChangedCallback(name) {
		name === 'opend' && this.#open();
	}

	#open = () => {
		this.addEventListener(
			'animationend',
			(this.#animationEvent = () => {
				this.opend = false;
				this.removeEventListener('animationend', this.#animationEvent);
			})
		);
	};
}

customElements.define('s-toast', sToastElement);

export default class Toast {
	event = null;
	static #create = ({ message, type, position, size }) => {
		const toast = document.createElement('s-toast');
		type && toast.setAttribute('type', type);
		position && toast.setAttribute('position', position);
		size && toast.setAttribute('size', size);
		document.body.append(toast);
		toast.addEventListener(
			'animationend',
			(this.event = () => {
				toast.remove();
				toast.removeEventListener('animationend', this.event);
			})
		);
		toast.innerHTML = message;
		toast.opend = true;
	};

	static info = ({ message, duration, position, size }) => {
		this.#create({ message, duration, type: 'info', position, size });
	};

	static success = ({ message, duration, position, size }) => {
		this.#create({ message, duration, type: 'success', position, size });
	};

	static error = ({ message, duration, position, size }) => {
		this.#create({ message, duration, type: 'danger', position, size });
	};

	static warning = ({ message, duration, position, size }) => {
		this.#create({ message, duration, type: 'warning', position, size });
	};
}
