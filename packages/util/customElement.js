export default (name, cl) => {
  if (!window.customElements.get(name)) {
    window.customElements.define(name, cl);
  }
  else {
    console.warn(`${name} has been defined twice`);
  }
};

