const currencyEl_one = document.getElementById('currency-one');
const currencyEl_two = document.getElementById('currency-two');
const amountEl_one = document.getElementById('amount-one');
const amountEl_two = document.getElementById('amount-two');

const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');

const cargando = document.getElementById('cargando');


const loadingOverlay = document.getElementById('loading-overlay');
const errorBanner = document.getElementById('error-banner');
const errorText = document.getElementById('error-text');
const errorClose = document.getElementById('error-close');


function showLoading() {
    cargando.style.display = 'flex';          // indicador inline original
    loadingOverlay.style.display = 'flex';    // overlay nuevo
}

function hideLoading() {
    cargando.style.display = 'none';
    loadingOverlay.style.display = 'none';
}

function showApiError(message) {
    errorText.textContent = message;
    errorBanner.style.display = 'flex';
}

function hideApiError() {
    errorBanner.style.display = 'none';
    errorText.textContent = '';
}

/* Validacion de negativos */

function validateAmount(input) {
    const wrapper = input.parentElement;
    const value = parseFloat(input.value);

    if (input.value !== '' && value < 0) {
        wrapper.className = 'currency error';
        return false;
    }
    wrapper.className = 'currency';
    return true;
}

// Bloquear la tecla '-' directamente en el teclado
amountEl_one.addEventListener('keydown', (e) => { if (e.key == '-' || e.key == 'e') e.preventDefault(); });
amountEl_two.addEventListener('keydown', (e) => { if (e.key == '-' || e.key == 'e') e.preventDefault(); });

/* calcular */

async function calculate() {
    const currency_one = currencyEl_one.value;
    const currency_two = currencyEl_two.value;

    hideApiError();
    showLoading();

    try {
        const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`);
        if (!res.ok) throw new Error(`Error del servidor: ${res.status}`);

        const data = await res.json();
        const rate = data.rates[currency_two];

        if (rate == undefined) throw new Error(`No se encontró la divisa ${currency_two}`);

        rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;
        amountEl_two.value = (amountEl_one.value * rate).toFixed(2);

    } catch (err) {
        showApiError(`Error al consultar la API: ${err.message}`);
    } finally {
        hideLoading(); // se ejecuta siempre, cuando el fetch termina
    }
}


// ── Carga inicial ─────────────────────────────────────────────────────────────
calculate();