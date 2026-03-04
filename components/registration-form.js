export class RegistrationForm extends HTMLElement {
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

customElements.define('registration-form', RegistrationForm);