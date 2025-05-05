class Validator {
    constructor(
        formSelector,
        passwordSelector,
        confirmPasswordSelector,
        submitButtonSelector,
        emailSelector,
        firstNameSelector,
        lastNameSelector,
        rangeSelector,
        valueSpanSelector
    ) {
        this.form = document.querySelector(formSelector);
        this.passwordInput = this.form.querySelector(passwordSelector);
        this.confirmPasswordInput = this.form.querySelector(confirmPasswordSelector);
        this.submitButton = document.querySelector(submitButtonSelector);
        this.emailInput = this.form.querySelector(emailSelector);
        this.firstNameInput = this.form.querySelector(firstNameSelector);
        this.lastNameInput = this.form.querySelector(lastNameSelector);
        this.genderInputs = this.form.querySelectorAll('input[name="gender"]');

        this.rangeInput = document.querySelector(rangeSelector);
        this.valueSpan = document.querySelector(valueSpanSelector);

        if (!this.form || !this.submitButton || !this.passwordInput || !this.confirmPasswordInput || !this.emailInput || !this.firstNameInput || !this.lastNameInput || this.genderInputs.length === 0 || !this.rangeInput || !this.valueSpan) {
            console.error('Форма або кнопка не знайдені!');
            return;
        }

        this.addEventListeners();


        window.addEventListener('unload', () => this.removeEventListeners());
    }

    addEventListeners() {
        const inputs = [
            this.emailInput,
            this.passwordInput,
            this.confirmPasswordInput,
            this.firstNameInput,
            this.lastNameInput];

        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearError(input));
        });


        this.genderInputs.forEach(input => {
            input.addEventListener('blur', () => this.validateGender());
            input.addEventListener('change', () => {
                this.validateGender();
            });
        });

        this.submitButton.addEventListener('click', (event) => {
            event.preventDefault();
            this.validateForm();
        });

        this.rangeInput.addEventListener('input', () => {
            this.updateRangeValue();
        });

        this.updateRangeValue();
    }

    removeEventListeners() {
        this.inputs.forEach(input => {
            input.removeEventListener('blur', () => this.validateField(input));
            input.removeEventListener('input', () => this.clearError(input));
        });

        this.genderInputs.forEach(input => {
            input.removeEventListener('blur', () => this.validateGender());
            input.removeEventListener('change', () => this.validateGender());
        });

        this.submitButton.removeEventListener('click', (event) => {
            event.preventDefault();
            this.validateForm();
        });

        this.rangeInput.removeEventListener('input', () => this.updateRangeValue());
    }


    updateRangeValue() {
        const value = this.rangeInput.value;
        this.valueSpan.textContent = this.formatValue(value);
    }

    formatValue(value) {
        const formattedValue = value / 1000;
        return formattedValue + 'K';
    }

    validateForm() {
        const fields = [
            this.emailInput,
            this.passwordInput,
            this.confirmPasswordInput,
            this.firstNameInput,
            this.lastNameInput
        ];
        let isValid = true;

        fields.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        if (!this.validateGender()) {
            isValid = false;
        }

        if (isValid) {
            alert("Форма валідна. Ви можете відправити її.");
            this.form.submit();
        }
    }

    validateField(input) {
        const value = input.value.trim();
        let message = "";

        if (this.isRequired(input, value)) {
            message = "Це поле є обов'язковим";
        } else if (input === this.emailInput && !this.isEmail(value)) {
            message = "Невірний формат електронної пошти";
        } else if (input === this.passwordInput && value.length < 6) {
            message = "Пароль повинен містити не менше 6 символів";
        } else if (input === this.confirmPasswordInput && value !== this.passwordInput.value) {
            message = "Паролі не співпадають";
        }

        return message ? (this.showError(input, message), false) : (this.clearError(input), true);
    }

    validateGender() {
        const isChecked = Array.from(this.genderInputs).some(input => input.checked);
        let genderError = document.querySelector('.gender-error');

        if (!isChecked) {
            this.showError(this.genderInputs[0], "Будь ласка, оберіть гендер");

        } else {
            if (genderError) {
                genderError.remove();
            }
        }
        return isChecked;
    }

    showError(input, message) {
        let error;

        // If it's gender, create a separate error for gender
        if (input === this.genderInputs[0]) {
            error = document.querySelector('.gender-error');
            if (!error) {
                error = document.createElement("div");
                error.classList.add("error-message", "gender-error");
                const genderContainer = document.querySelector('.gender-container');
                genderContainer.appendChild(error);
            }
        } else {
            error = input.nextElementSibling;
            // If the error message doesn't exist yet, create it
            if (!error || !error.classList.contains("error-message")) {
                error = document.createElement("div");
                error.classList.add("error-message");
                input.after(error);
            }
        }

        error.textContent = message;
        error.style.color = "red";
    }


    clearError(input) {
        if (input === this.genderInputs[0]) {
            let genderError = document.querySelector('.gender-error');
            if (genderError) {
                genderError.remove();
            }
        } else {
            let error = input.nextElementSibling;
            if (error && error.classList.contains("error-message")) {
                error.remove();
            }
        }
    }

    isRequired(input, value) {
        return input.required && value.length === 0;
    }

    isEmail(email) {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    }

    // Date validity method
    isValidDate(dateString) {
        const date = new Date(dateString);
        return date instanceof Date && !isNaN(date);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Validator('.form', '.password', '.confirm-password', '.btn-submit', '.email-input', '.first-name', '.last-name', '.income-range', '.btn-incom');
});
