document.addEventListener("DOMContentLoaded", () => {
    const emailInput = document.querySelector('.input-email');
    const subscribeButton = document.querySelector(".subscribe-button");

    subscribeButton.addEventListener('click', (event) => validateEmail(event));

    function validateEmail(event) {

        if (!emailInput.validity.valid) {
            emailInput.classList.add('error');
            event.preventDefault();
        } else {
            emailInput.classList.remove('error');
            alert('email successfully!');
        }
    }
});