const input = document.getElementById("searchBox");
const resultsElement = document.getElementById("resultsDiv");

input.addEventListener("input", () => {
  const searchValue = input.value.trim();

  // If the input is empty, clear results and return early
  if (searchValue === "") {
    clearResults();
    return;
  }

  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`)
    .then((res) => res.json())
    .then((data) => {
      clearResults();

      if (data.meals) {
        data.meals.forEach((meal) => {
          const mealEl = document.createElement("div");

          mealEl.innerHTML = `<h3>${meal.strMeal}</h3>`;
          resultsElement.appendChild(mealEl);
          mealEl.classList.add("meal-name");

          const horizontalElements = document.createElement("div");
          horizontalElements.classList.add("horizontal-elements");
          mealEl.appendChild(horizontalElements);

          const mealImg = document.createElement("img");
          mealImg.classList.add("meal-img");
          horizontalElements.appendChild(mealImg);
          mealImg.src = meal.strMealThumb;

          const mealDetails = document.createElement("button");
          mealDetails.classList.add("meal-details");
          horizontalElements.appendChild(mealDetails);
          mealDetails.textContent = "Meal Details";

          mealDetails.addEventListener("click", () => {
            clearResults();
            openDetailsWindow(meal);
            resultsElement.style.backgroundColor = "gold";
          });
        });
      } else {
        console.log("No matching meals found");
      }
    })
    .catch((err) => console.error(err));
});

function clearResults() {
  while (resultsElement.firstChild) {
    resultsElement.removeChild(resultsElement.firstChild);
  }
}

function openDetailsWindow(meal) {
  const mealInformation = document.createElement("div");
  mealInformation.innerHTML = `<h3>${meal.strMeal}</h3>`;
  mealInformation.style.padding = "20px";
  resultsElement.appendChild(mealInformation);
  mealInformation.classList.add("meal-information");

  const mealImg = document.createElement("img");
  mealImg.classList.add("meal-img");
  mealInformation.appendChild(mealImg);
  mealImg.src = meal.strMealThumb;
  mealImg.style.marginLeft = "500px";

  const instHeading = document.createElement("h4");
  instHeading.textContent = "Instructions:";
  mealInformation.appendChild(instHeading);
  instHeading.style.marginLeft = "560px";
  instHeading.style.marginTop = "10px";

  const mealInstructions = document.createElement("div");
  mealInstructions.innerHTML = `${meal.strInstructions}`;
  mealInstructions.classList.add("meal-instructions");
  resultsElement.appendChild(mealInstructions);
  mealInstructions.style.padding = "10px";
  mealInstructions.style.marginTop = "0px";
}
