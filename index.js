const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const places = [];

fetch(endpoint)
    .then(response => response.json())
    .then(data => places.push(...data));

function findMatches(wordToMatch, places) {
    return places.filter(place => {
        const regex = new RegExp(wordToMatch, 'gi');
        return place.city.match(regex) || place.state.match(regex);
    });
}

function displayMatches() {
    const matchArray = findMatches(this.value, places);
    const html = matchArray.map(place => {
        return `
            <li>
                <span class="name">${place.city}, ${place.state}<span>
                <span class="population">${place.population}<span>
            </li>
        `;
    }).join('');
    suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);
