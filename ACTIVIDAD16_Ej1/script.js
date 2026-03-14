    const username       = document.getElementById('username');
    const email          = document.getElementById('email');
    const password       = document.getElementById('password');
    const confirmpassword = document.getElementById('confirmpassword');
    const age            = document.getElementById('age');
    const personalurl    = document.getElementById('personalurl');

function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success'
}

function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error'
    const small = formControl.querySelector('small');
    small.innerText = message;
}

function checkRequired(inputArr) {
  inputArr.forEach(function(input) {
    if (input.value.trim() == '') {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input, `${getFieldName(input)} must be at least ${min} characters`);
        return false;
    } else if (input.value.length > max) {
        showError(input, `${getFieldName(input)} must be less than ${max} characters`);
        return false;
    }
    return true;
}

