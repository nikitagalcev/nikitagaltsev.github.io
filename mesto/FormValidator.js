class FormValidator {

  static _errorMessages = {
    empty: 'Это обязательное поле',
    length: 'Должно быть от 2 до 30 символов',
    notUrl: 'Введите ссылку'
  };

  constructor(form) {
    this.form = form;
    this.button = this.form.querySelector('.popup__button');
    this.checkInputValidity = this.checkInputValidity.bind(this);
    this.inputs = this.form.querySelectorAll('.popup__input');
  }

  setSubmitButtonState(status) {
    if (status) {
      this.button.classList.remove('popup__button_active');
      this.button.disabled = true;
      this.button.style.cursor = 'not-allowed';
    } else {
      this.button.classList.add('popup__button_active');
      this.button.disabled = false;
      this.button.style.cursor = 'pointer';
    };
  }

  checkFormValidity() {
    if (this.form.checkValidity()) {
      this.setSubmitButtonState(false);
    } else {
      this.setSubmitButtonState(true);
    }
  }

  checkInputValidity(event) {
    const currentInput = event.target;
    const errorElem = currentInput.parentNode.querySelector(`#error-${currentInput.id}`);

    if ((currentInput.type !== 'url') && currentInput.value.length === 0) {
      currentInput.setCustomValidity(FormValidator._errorMessages.empty);
      this.checkFormValidity();
    } else if ((currentInput.type !== 'url') && (currentInput.validity.tooShort || currentInput.validity.tooLong)) {
      currentInput.setCustomValidity(FormValidator._errorMessages.length);
      this.checkFormValidity();
    } else if ((currentInput.type == 'url') && currentInput.validity.typeMismatch ) {
      currentInput.setCustomValidity(FormValidator._errorMessages.notUrl);
      this.checkFormValidity();
    } else {
      currentInput.setCustomValidity('');
      this.checkFormValidity();
    }
    errorElem.textContent = currentInput.validationMessage;
  }

  setEventListeners() {
    this.inputs.forEach(item => item.addEventListener('input', this.checkInputValidity));
  }

  resetErrors() {
    this.form.querySelectorAll('.error-message').forEach(item => {
      item.textContent = '';
    });
  }
}