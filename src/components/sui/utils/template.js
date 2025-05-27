const templateElement = document.createElement("template");

export const html = (strings, ...expressions) => {
  let parts = [];

  for (let i = 0; i < strings.length; i += 1) {
    parts.push(strings[i]);
    if (expressions[i] !== undefined) parts.push(expressions[i]);
  }

  const innerHTML = parts.join("");
  templateElement.innerHTML = innerHTML;
  const fragment = document.importNode(templateElement.content, true);

  if (fragment.children.length === 1) {
    return fragment.firstElementChild;
  }
  else {
    return fragment;
  }
};

export const css = (strings, ...expressions) => {
  let parts = [];

  for (let i = 0; i < strings.length; i += 1) {
    parts.push(strings[i]);
    if (expressions[i] !== undefined) parts.push(expressions[i]);
  }

  const cssText = parts.join("");
  const stylesheet = new CSSStyleSheet();
  stylesheet.replaceSync(cssText);
  return stylesheet;
};

export const svg = (strings, ...expressions) => {
  let parts = [];

  for (let i = 0; i < strings.length; i += 1) {
    parts.push(strings[i]);
    if (expressions[i] !== undefined) parts.push(expressions[i]);
  }

  const innerHTML = `<svg id="s-svg" xmlns="http://www.w3.org/2000/svg">${parts.join("")}</svg>`;

  templateElement.innerHTML = innerHTML;

  const fragment = document.importNode(templateElement.content, true);
  const stub = fragment.querySelector("svg#s-svg");

  if (stub.children.length === 1) {
    return stub.firstElementChild;
  }
  else {
    for (const child of [...stub.childNodes]) {
      fragment.appendChild(child);
    }

    stub.remove();
    return fragment;
  }
};