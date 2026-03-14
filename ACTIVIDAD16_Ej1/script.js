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

