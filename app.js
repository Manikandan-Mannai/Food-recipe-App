const searchForm = document.querySelector('form');
const container = document.querySelector('.container');
const searchResultDiv = document.querySelector('.search-results');
let searchQuery = ' ';
const APP_ID = 'e734c255';
const APP_KEY = '0e0f987d89d55123a963f4efc0a81de6';


searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    searchQuery = e.target.querySelector('input').value;
    fetchAPI();
});
async function fetchAPI() {
    const URL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_KEY}&to=25`;
    const response = await fetch(URL);
    const data = await response.json();
    genHTML(data.hits);
}

function genHTML(results) {
    let generatedHTML = '';
    results.map(result => {
        generatedHTML +=
            `
        <div class="item" >
            <img src="${result.recipe.image}">
            <div class="flex-container">
                <h2 class="title">${result.recipe.label}</h2>
                <a href="${result.recipe.url}" target="_blank" class="btn btn-secondary">View Recipe</a>
            </div>
            <div class="status">
            <p class="item-data text-white">calories:${result.recipe.calories.toFixed(2)}</p>
                <p class="item-data text-white">healthLabels:${result.recipe.healthLabels[0]}</p>
                <p class="item-data text-white">cuisineType:${result.recipe.cuisineType}</p>
            </div>
        </div>
    `

    })
    searchResultDiv.innerHTML = generatedHTML;
}