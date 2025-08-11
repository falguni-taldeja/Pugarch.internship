document.getElementById("searchForm").addEventListener("submit", function (event) {
    event.preventDefault();

    let query = document.getElementById("searchInput").value;
    let apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            let resultsContainer = document.getElementById("recipeResults");
            resultsContainer.innerHTML = "";

            if (data.meals) {
                data.meals.forEach(meal => {
                    let recipeCard = `
                        <div class="recipe-card">
                            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                            <h3>${meal.strMeal}</h3>
                            <a href="${meal.strSource || meal.strYoutube}" target="_blank">View Recipe</a>
                        </div>
                    `;
                    resultsContainer.innerHTML += recipeCard;
                });
            } else {
                resultsContainer.innerHTML = "<p>No recipes found. Try another search!</p>";
            }
        })
        .catch(error => {
            console.error("Error fetching recipes:", error);
        });
});
