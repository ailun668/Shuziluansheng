import './backdrop'
import './spinner'
import { html, css } from '../utils/template.js'

class sLoadingElement extends HTMLElement {
  static observedAttributes = ['type']
  static #template = html`<template>
    <s-backdrop></s-backdrop>
    <div class="loading-inner">
      <s-spinner></s-spinner>
      <span class="loading-text">loading...</span>
    </div>
  </template>`
  static #style = css`
    :host {
      display: flex;
      justify-content: center;
      align-items: center;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 40004;
    }

    :host .loading-inner {
      background: #ffff;
      border-radius: 8px;
      position: relative;
      z-index: 40005;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: auto;
      min-width: auto;
      max-width: 270px;
      height: auto;
      max-height: 90%;
      padding: 6px;
      color: #333333;
      animation: loadingAnimationIn 0.15s cubic-bezier(0.4, 0, 0.2, 1);
      animation-fill-mode: forwards;
      animation-iteration-count: 1;
    }

    :host s-spinner {
      margin: 12px auto 6px auto;
    }

    :host .loading-text {
      display: block;
      width: 70px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      text-align: center;
      font-size: 12px;
    }

    :host([type='dark']) .loading-inner {
      background: rgba(0, 0, 0, 0.6);
      color: #fff;
    }

    @keyframes loadingAnimationIn {
      0% {
        opacity: 0;
        transform: scale(1.2);
      }

      100% {
        opacity: 1;
        transform: scale(1);
      }
    }

    @keyframes loadingAnimationOut {
      0% {
        opacity: 1;
        transform: scale(1);
      }

      100% {
        opacity: 0;
        transform: scale(0.8);
      }
    }
  `
  #shadowRoot = null
  constructor() {
    super()

    this.#shadowRoot = this.attachShadow({ mode: 'open' })
    this.#shadowRoot.adoptedStyleSheets = [sLoadingElement.#style]
    this.#shadowRoot.append(document.importNode(sLoadingElement.#template.content, true))
  }
}

customElements.define('s-loading', sLoadingElement)

export default class Loading {
  loading = void 0
  static #create = (title, name, type) => {
    this.loading = document.createElement('s-loading')
    const spinner = this.loading.shadowRoot.querySelector('s-spinner')
    spinner.setAttribute('name', name || 'spinner')
    type && this.loading.setAttribute('type', type)
    title && (this.loading.shadowRoot.querySelector('.loading-text').innerHTML = title)
    document.body.append(this.loading)
  }

  static show = (title, name, type) => {
    this.#create(title, name, type)
    return this
  }

  static dismiss = () => {
    const inner = this.loading.shadowRoot.querySelector('.loading-inner')
    inner.style.setProperty('animation-name', 'loadingAnimationOut')
    let animationEvent
    inner.addEventListener(
      'animationend',
      (animationEvent = () => {
        this.loading.remove()
        inner.removeEventListener('animationend', animationEvent)
      }),
    )
  }
}
