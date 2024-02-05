
// taking elements input in form of variables
const input = document.getElementById("searchBox");
const resultsElement = document.getElementById("resultsDiv");


// adding event listener to the input ie once the value is input by the user it will apply event listener
input.addEventListener("input", () => {
  const searchValue = input.value.trim();

  // If the input is empty, clear results and return early
  if (searchValue === "") {
    clearResults();
    return;
  }

  // using fetch API to connect with the meal database
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`)
    .then((res) => res.json())
    .then((data) => {
      // clearing previous results once data is fetched
      clearResults();

      // checking if meals prop in data exist or not and then proceeding
      if (data.meals) {
        data.meals.forEach((meal) => {

          // creating div element for each meal
          const mealEl = document.createElement("div");
          mealEl.innerHTML = `<h3>${meal.strMeal}</h3>`;
          resultsElement.appendChild(mealEl);
          mealEl.classList.add("meal-name");

          // food pic and more details as horizontal elements
          const horizontalElements = document.createElement("div");
          horizontalElements.classList.add("horizontal-elements");
          mealEl.appendChild(horizontalElements);

          // meal image 
          const mealImg = document.createElement("img");
          mealImg.classList.add("meal-img");
          horizontalElements.appendChild(mealImg);
          mealImg.src = meal.strMealThumb;

          // creating meal details button and adding it to horizontal elements
          const mealDetails = document.createElement("button");
          mealDetails.classList.add("meal-details");
          horizontalElements.appendChild(mealDetails);
          mealDetails.textContent = "Meal Details";

          // adding event listener to the meal details button
          mealDetails.addEventListener("click", () => {

             // clearing previous results once meal details is clicked
            clearResults();

            // new window opening
            openDetailsWindow(meal);
            resultsElement.style.backgroundColor = "gold";
          });
        });
      } else {
        // if meals doesnt exist in data
        console.log("No matching meals found");
      }
    })
    // if some error come in fetching data 
    .catch((err) => console.error(err));
});

// clear results function
function clearResults() {
  while (resultsElement.firstChild) {
    resultsElement.removeChild(resultsElement.firstChild);
  }
}

// open details window function
function openDetailsWindow(meal) {

  // meal information div element
  const mealInformation = document.createElement("div");
  mealInformation.innerHTML = `<h3>${meal.strMeal}</h3>`;
  mealInformation.style.padding = "20px";
  resultsElement.appendChild(mealInformation);
  mealInformation.classList.add("meal-information");


  // meal image creating and adding to meal-img class
  const mealImg = document.createElement("img");
  mealImg.classList.add("meal-img");
  mealInformation.appendChild(mealImg);
  mealImg.src = meal.strMealThumb; //giving source to img
  mealImg.style.marginLeft = "500px"; //setting margin


  // creating instHeading element with h4 heading
  const instHeading = document.createElement("h4");
  instHeading.textContent = "Instructions:";
  mealInformation.appendChild(instHeading);
  instHeading.style.marginLeft = "560px";
  instHeading.style.marginTop = "10px";

  // creating mealInstructions element with div element adding it to meal-instructions classlist
  const mealInstructions = document.createElement("div");
  mealInstructions.innerHTML = `${meal.strInstructions}`;
  mealInstructions.classList.add("meal-instructions");
  resultsElement.appendChild(mealInstructions);
  mealInstructions.style.padding = "10px";
  mealInstructions.style.marginTop = "0px";
}