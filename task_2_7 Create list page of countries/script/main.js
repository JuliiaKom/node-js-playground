document.addEventListener("DOMContentLoaded", async function () {
    const countriesContainer = document.querySelector("#countries");
    const searchInput = document.querySelector("#search");
    const searchButton = document.querySelector("#searchButton");
    const dropdown = document.querySelector(".dropdown");
    const toggleButton = document.querySelector(".dropdown-toggle");
    const dropdownMenu = document.querySelector(".dropdown-menu");
    const arrowIcon = document.querySelector(".arrow");
    const themeToggleButton = document.querySelector("#themeToggle");
    const body = document.body;

    let countriesData = [];
    let currentRegion = "";

    // Retrieve countries based on search and filtering by region
    function renderCountries() {
        const searchText = searchInput.value.toLowerCase();
        countriesContainer.innerHTML = countriesData
            .filter(country => country.name.toLowerCase().includes(searchText))
            .filter(country => !currentRegion || country.region === currentRegion)
            .map(country =>
                createCountryCard(country)
            )
            .join("");
    }

    searchInput.addEventListener("input", renderCountries);

    // don`t reset results when pressing Enter
    searchInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            renderCountries();
        }
    });

    // Handler for clicking the search button
    if (searchButton) {
        searchButton.addEventListener("click", function (event) {
            event.preventDefault();
            renderCountries();
        });
    }

    // Change theme
    function changeTheme() {
        const isLight = document.body.classList.toggle("light-theme");
        document.body.classList.toggle("dark-theme", !isLight);
        themeToggleButton.classList.toggle("light", isLight);
        themeToggleButton.classList.toggle("dark", !isLight);
    }

    themeToggleButton.addEventListener("click", changeTheme);
    body.classList.add("light-theme");
    themeToggleButton.classList.add("light");

    // Logic for the dropdown menu
    toggleButton.addEventListener("click", function () {
        dropdown.classList.toggle("open");
        arrowIcon.classList.toggle("rotated");
    });

    document.addEventListener("click", function (event) {
        if (!dropdown.contains(event.target) && !toggleButton.contains(event.target)) {
            dropdown.classList.remove("open");
            arrowIcon.classList.remove("rotated");
        }
    });
    // Event handler for region selection
    const regionItems = document.querySelectorAll(".dropdown-item");
    regionItems.forEach(item => {
        item.addEventListener("click", function () {
            currentRegion = item.textContent;

            toggleButton.innerHTML = `${currentRegion} <span class="arrow rotated"></span>`;
            renderCountries();

            dropdown.classList.remove("open");
            arrowIcon.classList.add("rotated");
        });
    });

    countriesData = await fetchCountries();
    renderCountries();
});
