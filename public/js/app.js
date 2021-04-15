$(document).ready(function () {
    $('nav a[href="/' + location.pathname.split("/")[1] + '"]:first-child').addClass('active');
});

async function fetchForecast() {
    const inputAddress = document.querySelector('[name="address"]');
    const forecastDiv = document.querySelector('#forecast')
    const loadingAnimation = document.querySelector('.lds-ripple')
    const address = inputAddress.value;
    if (!forecastDiv.classList.contains('hidden')) {
        forecastDiv.classList.add('hidden')
    }
    loadingAnimation.classList.remove('hidden')
    const response = await fetch(`http://localhost:3000/weather?address=${address}`);
    const data = await response.json();
    loadingAnimation.classList.add('hidden')
    if (data.error) {
        forecastDiv.innerHTML = `<span class="error">${data.error}</span>`;
        forecastDiv.classList.remove('hidden');
        return;
    }
    const { location, forecast } = data;

    forecastDiv.innerHTML = `
    <h3>${location}</h3>
    <p>${forecast}</p>
    `
    forecastDiv.classList.remove('hidden')

}




// MUTATION OBSERVER FUNCTION - WAITING FOR ELEMENT TO LOAD 
// callback function when geoLocation is found/loaded

// set up the mutation observer
const observer = new MutationObserver(function (mutations, obj) {
    // `mutations` is an array of mutations that occurred
    // `obj` is the MutationObserver instance
    const weatherForm = document.querySelector('form');
    if (weatherForm) {
        weatherForm.addEventListener('submit', (e) => {
            e.preventDefault();
            fetchForecast()
        })
        obj.disconnect(); // stop observing
        return;
    }
});
// start observing
observer.observe(document, {
    childList: true,
    subtree: true
});