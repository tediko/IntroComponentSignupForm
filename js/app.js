const form = document.querySelector('[data-form]');
const inputs = document.querySelectorAll('[data-input]');
const invalidMsg = document.querySelectorAll('[data-inval-msg]');
const submitBtn = document.querySelector('[data-cta]');

// Fn to display invalid message on screen
const showInvalidMsg = (input) => {
    input.parentElement.classList.add('active');
        invalidMsg.forEach(msg => {
            if (input.dataset.input === msg.dataset.invalMsg) {
                msg.classList.add('active');
            }
        })
}

// Fn to hide invalid message on screen
const hideInvalidMsg = (input) => {
    input.parentElement.classList.remove('active');
        invalidMsg.forEach(msg => {
            if (input.dataset.input === msg.dataset.invalMsg) {
                msg.classList.remove('active');
            }
        })
}

// Validate input and add invalid class to form if input is invalid
const validateEmail = (input) => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!emailRegex.test(input.value) || input.value == '') {
        showInvalidMsg(input);
    } else {
        hideInvalidMsg(input);
        return true;
    }
}

const validateForm = (event) => {
    let emptyCheck = false;
    event.preventDefault();

    inputs.forEach(input => {
        if (emptyCheck && validateEmail(input) == true) {
            form.submit();
        }
        if (input.value === null || input.value === '') {
            showInvalidMsg(input);
        } else if (input.value !== '' && input.dataset.input !== 'email') {
            hideInvalidMsg(input);
            emptyCheck = true;
        } else if (input.dataset.input === 'email') {
            validateEmail(input);
        }
    })
}

submitBtn.addEventListener('click', validateForm);