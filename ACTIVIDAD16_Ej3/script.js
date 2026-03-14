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
