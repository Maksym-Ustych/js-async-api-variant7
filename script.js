/**
 * Практична робота 10.2
 * Варіант 7: Country Explorer
 * Async/Await + Fetch API
 */

const API_ALL =
    "https://restcountries.com/v3.1/all?fields=name,capital,region,population,flags";

const API_NAME =
    "https://restcountries.com/v3.1/name/";

async function loadCountries() {

    const status =
        document.getElementById("status");

    const countriesBlock =
        document.getElementById("countries");

    try {

        status.textContent =
            "Завантаження країн...";

        countriesBlock.innerHTML = "";

        const response =
            await fetch(API_ALL);

        if (!response.ok) {

            throw new Error(
                "Не вдалося завантажити список країн"
            );
        }

        const countries =
            await response.json();

        const sortedCountries =
            countries
                .sort((a, b) =>
                    a.name.common.localeCompare(
                        b.name.common
                    )
                )
                .slice(0, 20);

        renderCountries(sortedCountries);

        status.textContent =
            "Країни успішно завантажено";

        console.log(
            "Список країн:",
            sortedCountries
        );

    } catch (error) {

        status.textContent =
            "Помилка: " + error.message;

        console.error(error);
    }
}

async function searchCountry() {

    const searchValue =
        document
            .getElementById("searchInput")
            .value
            .trim();

    const status =
        document.getElementById("status");

    const countriesBlock =
        document.getElementById("countries");

    if (!searchValue) {

        status.textContent =
            "Введіть назву країни";

        return;
    }

    try {

        status.textContent =
            "Пошук країни...";

        countriesBlock.innerHTML = "";

        const response =
            await fetch(
                API_NAME +
                searchValue +
                "?fields=name,capital,region,population,flags"
            );

        if (!response.ok) {

            throw new Error(
                "Країну не знайдено"
            );
        }

        const countries =
            await response.json();

        renderCountries(countries);

        status.textContent =
            "Результат пошуку";

        console.log(
            "Знайдені країни:",
            countries
        );

    } catch (error) {

        status.textContent =
            "Помилка: " + error.message;

        console.error(error);
    }
}

function renderCountries(countries) {

    const countriesBlock =
        document.getElementById("countries");

    countriesBlock.innerHTML =
        countries.map(country => {

            const name =
                country.name.common;

            const capital =
                country.capital
                    ? country.capital[0]
                    : "Немає даних";

            const region =
                country.region || "Немає даних";

            const population =
                country.population.toLocaleString();

            const flag =
                country.flags.svg
                    ? country.flags.svg
                    : country.flags.png;

            return `
                <div class="card">

                    <img
                        src="${flag}"
                        alt="Прапор ${name}"
                    >

                    <h3>${name}</h3>

                    <p>
                        <strong>Столиця:</strong>
                        ${capital}
                    </p>

                    <p>
                        <strong>Регіон:</strong>
                        ${region}
                    </p>

                    <p>
                        <strong>Населення:</strong>
                        ${population}
                    </p>

                </div>
            `;
        }).join("");
}

loadCountries();