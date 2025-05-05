async function fetchCountries() {
    try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        if (!response.ok) throw new Error("Data loading error");
        const data = await response.json();

        let countriesData = data.map(country => ({
            name: country.name.common,
            region: country.region,
            population: country.population.toLocaleString(),
            capital: country.capital ? country.capital[0] : "Unknown",
            flag: country.flags.svg || country.flags.png
        }));
        return countriesData;
        // renderCountries();
    } catch (error) {
        console.error("Error loading countries:", error);
        countriesContainer.innerHTML = "<p>Failed to load data.</p>";
    }
}