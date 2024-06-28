document.addEventListener('DOMContentLoaded', function() {
    const countryForm = document.getElementById('countryForm');
    const countryInfo = document.getElementById('countryInfo');

    countryForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const countryName = document.getElementById('countryName').value.trim();
        if (countryName) {
            getCountryInfo(countryName);
        }
    });

    function getCountryInfo(countryName) {
        fetch(`https://restcountries.com/v3.1/name/${countryName}`)
            .then(response => response.json())
            .then(data => {
                if (data.status === 404) {
                    displayError('Country not found');
                } else {
                    displayCountryInfo(data[0]);
                }
            })
            .catch(error => {
                displayError('An error occurred while fetching data');
                console.error(error);
            });
    }

    function displayCountryInfo(country) {
        countryInfo.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${country.name.common}</h5>
                    <p class="card-text"><strong>Capital:</strong> ${country.capital}</p>
                    <p class="card-text"><strong>Region:</strong> ${country.region}</p>
                    <p class="card-text"><strong>Population:</strong> ${country.population}</p>
                    <p class="card-text"><strong>Languages:</strong> ${Object.values(country.languages).join(', ')}</p>
                    <p class="card-text"><strong>Flag:</strong></p>
                    <img src="${country.flags.svg}" alt="Flag of ${country.name.common}" class="img-fluid">
                </div>
            </div>
        `;
        countryInfo.style.display = 'block';
    }

    function displayError(message) {
        countryInfo.innerHTML = `<div class="alert alert-danger" role="alert">${message}</div>`;
        countryInfo.style.display = 'block';
    }
});
