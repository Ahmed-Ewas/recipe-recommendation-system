const apiKey = "4d63d7063cd645ac8450faf5c5d85c5a";
const ingredientInput = document.getElementById('ingredients');
const submitBtn = document.getElementById('submitBtn');
const resultsDiv = document.getElementById('results');

// Function to get recipe suggestions from Spoonacular API
async function getRecipesFromAPI() {
    const userIngredients = ingredientInput.value.toLowerCase().split(',').map(ingredient => ingredient.trim()).join(',');

    if (userIngredients === "") {
        resultsDiv.innerHTML = "<p>Please enter some ingredients.</p>";
        return;
    }

    // Show loading spinner
    document.getElementById('loading').style.display = 'block';
    resultsDiv.innerHTML = '';  // Clear previous results

    const apiUrl = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${userIngredients}&number=5&apiKey=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Hide loading spinner once the data is fetched
        document.getElementById('loading').style.display = 'none';

        if (data.length === 0) {
            resultsDiv.innerHTML = "<p>No recipes found. Try different ingredients.</p>";
        } else {
            displayResults(data);
        }
    } catch (error) {
        document.getElementById('loading').style.display = 'none';
        console.error("Error fetching data from Spoonacular API:", error);
        resultsDiv.innerHTML = "<p>There was an error fetching recipes. Please try again later.</p>";
    }
}

// Function to display recipe results
function displayResults(recipes) {
    resultsDiv.innerHTML = recipes.map(recipe => {
        return `
            <div class="recipe-card">
                <h3>${recipe.title}</h3>
                <img src="https://spoonacular.com/recipeImages/${recipe.id}-312x231.jpg" alt="${recipe.title}" />
                <p><strong>Ingredients Used:</strong> ${recipe.usedIngredients.map(ingredient => ingredient.name).join(', ')}</p>
                <p><strong>Missing Ingredients:</strong> ${recipe.missedIngredients.map(ingredient => ingredient.name).join(', ')}</p>
                <p><strong>Link:</strong> <a href="https://spoonacular.com/recipes/${recipe.title}-${recipe.id}" target="_blank">View Recipe</a></p>
            </div>
        `;
    }).join('');
}

// Event listener for the button
submitBtn.addEventListener('click', getRecipesFromAPI);
