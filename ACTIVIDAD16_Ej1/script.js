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

function checkEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase())
}


function checkPasswordsMatch(password, confirmPassword) {
    if (password.value !== confirmPassword.value) {
        showError(confirmPassword, 'Passwords do not match');
        return false;
    }
    return true;
}

function checkAge(input) {
    if (input.value.trim() == '') {
        showError(input, 'Age is required');
        return false;
    }

    const age = Number(input.value);

    if (age < 0) {
        showError(input, 'Age must be 0 or greater');
        return false;
    }

    if (age >= 999) {
        showError(input, 'Age must be less than 999');
        return false;
    }

    showSuccess(input);
    return true;
}

function checkURL(input) {
    const re = /^([a-zA-Z][a-zA-Z0-9+\-.]*:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)*$/;

    if (!re.test(input.value.trim())) {
        showError(input, 'URL is not valid');
        return false;
    } else {
        showSuccess(input);
        return true;
    }
}

const form = document.getElementById('form');

form.addEventListener('submit', function (e) {
    e.preventDefault();


checkRequired([username, email, password, confirmpassword, age, personalurl])
checkLength(username, 3, 15)
checkLength(password, 6, 25)
checkPasswordsMatch(password,confirmpassword)
checkAge(age)
checkURL(personalurl)
});