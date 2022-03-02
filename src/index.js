export default class DOMWalker {
  constructor(target, url) {
    this.target = target;
    this.url = url;
    this.dom;

    this.fetchDom();
  }

  fetchDom() {
    fetch(this.url)
      .then((response) => response.text())
      .then(
        (html) =>
          (this.dom = new DOMParser()
            .parseFromString(html, "text/html")
            .querySelector("body"))
      )
      .then(() => this.refreshDom());
  }

  walkDom(el, callback) {
    callback(el);

    el = el.firstElementChild;

    while (el) {
      this.walkDom(el, callback);

      el = el.nextElementSibling;
    }
  }

  rebuildDom(el) {
    let dataReactive = el.dataset.reactive;

    if (dataReactive) {
      let targetEl = document.querySelector(this.target);
      let currentEl = targetEl.querySelector(`[data-reactive=${dataReactive}]`);

      currentEl.outerHTML = el.outerHTML;
    }
  }

  refreshDom() {
    this.walkDom(this.dom, (el) => this.rebuildDom(el));
  }
}
