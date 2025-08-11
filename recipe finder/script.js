// Function to search for recipes
function searchRecipe() {
    let query = document.getElementById("searchInput").value.trim();

    if (query === "") {
        alert("Please enter a recipe name!");
        return;
    }

    // API call to TheMealDB
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
        .then(response => response.json())
        .then(data => {
            let resultsContainer = document.getElementById("recipeResults");
            resultsContainer.innerHTML = ""; // Clear old results

            if (data.meals) {
                data.meals.forEach(meal => {
                    let card = document.createElement("div");
                    card.classList.add("card");

                    card.innerHTML = `
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                        <h3>${meal.strMeal}</h3>
                        <p><strong>Category:</strong> ${meal.strCategory}</p>
                        <a href="${meal.strSource || '#'}" target="_blank">View Recipe</a>
                    `;

                    resultsContainer.appendChild(card);
                });
            } else {
                resultsContainer.innerHTML = `<p>No recipes found! Try another search.</p>`;
            }
        })
        .catch(error => {
            console.error("Error fetching recipes:", error);
            alert("Something went wrong. Please try again later.");
        });
}
