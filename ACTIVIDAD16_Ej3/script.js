const container     = document.querySelector('.container');
const seats         = document.querySelectorAll('.row .seat:not(.occupied)');
const countEl       = document.getElementById('count');
const totalEl       = document.getElementById('total');
const coinEl        = document.getElementById('coin');
const movieSelect   = document.getElementById('movie');
const currencySelect = document.getElementById('currency-one');
const cargando      = document.getElementById('cargando');

/*  Precios base en USD  */
const BASE_PRICES = [10, 12, 8, 9];

/* Estado */
let currentRate = 1;
let currentCoin = 'USD';

/* Caché de tipos de cambio */
const cache = {};

async function fetchRate(baseCurrency) {
    
    if (cache[baseCurrency]) {
        return cache[baseCurrency].rates;
    }
    const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`);
    if (!res.ok) throw new Error(`Error del servidor: ${res.status}`);
    const data = await res.json();
    cache[baseCurrency] = { rates: data.rates };
    return data.rates;
}