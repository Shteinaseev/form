class FormsValidation {
  selectors = {
    root: '[data-js]',
    regForm: '[data-js-reg-form]',
    logForm: '[data-js-log-form]',
    fieldErrors: '[data-js-form-field-errors]',
    logLink: '[data-js-login-link]'
  }

  errorMessages = {
    valueMissing: () => 'Молимо вас да попуните ово поље',
    patternMismatch: ({ title }) => title || 'Подаци не одговарају формату',
    tooShort: ({ minLength }) => `Вредност је прекратка, минималан број знакова — ${minLength}`,
    tooLong: ({ maxLength }) => `Вредност је предугачка, ограничење броја знакова — ${maxLength}`,
  }

  constructor() {
    this.root = document.querySelector(this.selectors.root)
    this.logLink = document.querySelector(this.selectors.logLink);
    this.regForm = document.querySelector(this.selectors.regForm);
    this.logForm = document.querySelector(this.selectors.logForm);
    this.bindEvents()

  }

  manageErrors(fieldControlElement, errorMessages) {
    const fieldErrorsElement = fieldControlElement.parentElement.nextElementSibling

    fieldErrorsElement.innerHTML = errorMessages
      .map((message) => `<span class="field-errors">${message}</span>`)
      .join('')
  }

  validateField(fieldControlElement) {
    const errors = fieldControlElement.validity
    const errorMessages = []

    Object.entries(this.errorMessages).forEach(([errorType, getErrorMessage]) => {
      if (errors[errorType]) {
        errorMessages.push(getErrorMessage(fieldControlElement))
      }
    })


    this.manageErrors(fieldControlElement, errorMessages)

    const isValid = errorMessages.length === 0

    fieldControlElement.ariaInvalid = !isValid

    return isValid
  }

  onBlur(event) {
    const { target } = event
    const isFormField = target.closest(this.selectors.form)
    const isRequired = target.required

    if (isFormField && isRequired) {
      this.validateField(target)
    }
  }

  onChange(event) {
    const { target } = event
    const isRequired = target.required
    const isToggleType = ['radio', 'checkbox'].includes(target.type)

    if (isToggleType && isRequired) {
      this.validateField(target)
    }
  }

  onSubmit(event) {
    const isFormElement = event.target.matches(this.selectors.form)
    if (!isFormElement) {
      return
    }

    const requiredControlElements = [...event.target.elements].filter(({ required }) => required)
    let isFormValid = true
    let firstInvalidFieldControl = null

    requiredControlElements.forEach((element) => {
      const isFieldValid = this.validateField(element)

      if (!isFieldValid) {
        isFormValid = false

        if (!firstInvalidFieldControl) {
          firstInvalidFieldControl = element
        }
      }
    })

    if (!isFormValid) {
      event.preventDefault()
      firstInvalidFieldControl.focus()
    }
  }

  bindEvents() {
    document.addEventListener('blur', (event) => {
      this.onBlur(event)
    }, { capture: true })
    document.addEventListener('change', (event) => this.onChange(event))
    document.addEventListener('submit', (event) => this.onSubmit(event))
    this.logLink.addEventListener('click', () => {
      this.regForm.classList.toggle('disactive')
      this.logForm.classList.toggle('disactive')

    })
  }
}

new FormsValidation()
