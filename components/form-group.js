export class FormGroup extends HTMLElement {
    static observedAttributes = ['name', 'min-length', 'max-length', 'type', 'required'];

    render() {
        this.shadowRoot.innerHTML = `

        `
    }

    attributeChangedCallback(name, oldValue, newValue) {

    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

}

customElements.define('form-group', FormGroup);