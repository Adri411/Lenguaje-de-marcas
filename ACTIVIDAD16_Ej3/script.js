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

/* Actualizar opciones del select de películas */
function updateMovieSelect(rate, coin) {
    const options = movieSelect.querySelectorAll('option');
    const names = [
        'Avengers: Endgame',
        'Jocker',
        'Toy Story 4',
        'The Lion King'
    ];
    options.forEach((opt, i) => {
        const convertedPrice = (BASE_PRICES[i] * rate).toFixed(2);
        opt.value = convertedPrice;
        opt.textContent = `${names[i]} (${convertedPrice} ${coin})`;
    });
}

/* guardar pelicula en localstorage */
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

/* Actualizar contador y total*/
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const count = selectedSeats.length;
    const price = parseFloat(movieSelect.value);
    const total = (count * price).toFixed(2);

    countEl.textContent = count;
    totalEl.textContent = total;
    coinEl.textContent  = currentCoin;

    // Guardar índices de asientos seleccionados
    const allSeats = document.querySelectorAll('.row .seat');
    const selectedIndexes = [...selectedSeats].map(seat =>
        [...allSeats].indexOf(seat)
    );
    localStorage.setItem('selectedSeats', JSON.stringify(selectedIndexes));

}

/* Restaurar estado desde localStorage */
function populateUI() {
    const savedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if (savedSeats && savedSeats.length > 0) {
        const allSeats = document.querySelectorAll('.row .seat');
        allSeats.forEach((seat, i) => {
            if (savedSeats.includes(i)) seat.classList.add('selected');
        });
    }
}

/* Click en asiento */
container.addEventListener('click', (e) => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }
});

/* Cambio de película */
movieSelect.addEventListener('change', updateSelectedCount);

/* Cambio de moneda */
currencySelect.addEventListener('change', async () => {
    const coin = currencySelect.value;
    cargando.style.display = 'block';

    try {
        const rates = await fetchRate('USD');
        currentRate = rates[coin];
        currentCoin = coin;

        updateMovieSelect(currentRate, currentCoin);
        updateSelectedCount();
    } catch (err) {
        console.error('Error al obtener tipo de cambio:', err);
    } finally {
        cargando.style.display = 'none';
    }
});

/* Carga inicial */
populateUI();
updateSelectedCount();