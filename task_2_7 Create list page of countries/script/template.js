function createCountryCard(country) {
    return `
        <div class="country">
            <img class="country-img" src="${country.flag}" alt="Flag of ${country.name}">
            <div class="country-info">
                <h3 class="country-name">${country.name}</h3>
                <p class="info-item">
                    <span class="info-label">Population:</span> 
                    ${country.population}
                </p>
                <p class="info-item">
                    <span class="info-label">Region:</span>
                    ${country.region}
                </p>
                <p class="info-item">
                    <span class="info-label">Capital:</span> 
                    ${country.capital}
                </p>
            </div>
        </div>
    `;
}
