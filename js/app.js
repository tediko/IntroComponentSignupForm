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

// Fn to hide invalid message from screen
const hideInvalidMsg = (input) => {
    input.parentElement.classList.remove('active');
        invalidMsg.forEach(msg => {
            if (input.dataset.input === msg.dataset.invalMsg) {
                msg.classList.remove('active');
            }
        })
}

// Validate email input and add invalid class if input is invalid
const validateEmail = (input) => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!emailRegex.test(input.value) || input.value == '') {
        showInvalidMsg(input);
        return false;
    } else {
        hideInvalidMsg(input);
        return true;
    }
}

// Validate form for empty inputs and invalid emails
const validateForm = (event) => {
    event.preventDefault(); // prevent from submitting a form before validate all inputs
    let emptyCheck = 0; // helper flag for checking if all inputs are filled.
    const numOfInputs = inputs.length; // Number of input fields to check if all are filled. 
    let isEmailValid; // Returns true or false based on validateEmail function return.

    inputs.forEach(input => {
        if (input.value === null || input.value === '') {
            showInvalidMsg(input);
        } else if (input.value !== '' && input.dataset.input !== 'email') {
            hideInvalidMsg(input);
        } else if (input.dataset.input === 'email') {
            validateEmail(input);
            isEmailValid = validateEmail(input);
        }
    })

    // Check if all inputs are filled
    inputs.forEach(input => {
        if (input.value !== '') {
            emptyCheck++;
        }
    })

    //if all inputs are filled and email is valid form is submiting.
    if (emptyCheck === numOfInputs && isEmailValid) { 
        form.submit();
    }
}

function validateInput() {
    if (this.value === null || this.value === '') {
        showInvalidMsg(this);
    } else if (this.value !== '' && this.dataset.input !== 'email') {
        hideInvalidMsg(this);
    } else if (this.dataset.input === 'email') {
        validateEmail(this);
    }
}

submitBtn.addEventListener('click', validateForm);
inputs.forEach(input => 
    input.addEventListener('input', validateInput));