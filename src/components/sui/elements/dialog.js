class Dialog {
  static #dialog = void 0;

  static showModal({ content, okText, cancelText, ok, cancel, hasCancel = true, closeOnClickModal = true, closeOnPressEscape = true }) {
    this.#dialog = document.createElement('dialog');

    const main = document.createElement('main');
    this.#dialog.append(main);
    main.innerHTML = content;

    const footer = document.createElement('footer');
    this.#dialog.append(footer);

    if (hasCancel) {
      const cBtn = document.createElement('s-button');
      cBtn.innerHTML = cancelText || 'cancel';
      cBtn.onclick = () => cancel(this);
      footer.append(cBtn);
    }

    const oBtn = document.createElement('s-button');
    oBtn.setAttribute('type', 'primary');
    oBtn.innerHTML = okText || 'ok';
    oBtn.onclick = () => ok(this);
    footer.append(oBtn);

    closeOnClickModal && (this.#dialog.onclick = (event) => event.target.tagName.toLowerCase() === "dialog" && this.close());

    this.#dialog.append(footer);
    document.body.append(this.#dialog);
    this.#dialog.showModal();

    if (closeOnPressEscape) {
      let a;
      let b;
      window.addEventListener('keydown', a = (event) => {
        if (event.keyCode === 27) {
          this.close();
          window.addEventListener('keyup', b = () => {
            window.removeEventListener('keydown', a);
            window.removeEventListener('keyup', b);
          })
        }
      })
    }
  }

  static close = () => {
    this.#dialog.close();
    // this.#dialog.remove();
  }

  static confirm = ({ content, okText, cancelText, ok, cancel, closeOnClickModal }) => {
    this.showModal({ content, okText, cancelText, ok, cancel, closeOnClickModal, hasCancel: true });
  }

  static alert = ({ content, okText, ok, closeOnClickModal }) => {
    this.showModal({ content, okText, ok, closeOnClickModal, hasCancel: false });
  }
}

export default Dialog;
