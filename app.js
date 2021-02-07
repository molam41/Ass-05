const searchItem = document.getElementById("searchedFood");
const mealsContainer = document.getElementById("meals-container");
const detailsContainer = document.getElementById("details");
const notFoundText = document.getElementById("not-found");

function searchBtn() {
  let searchItemValue = searchItem.value;
  if (searchItemValue == "") {
    alert("You have to write something");
    return false;
  }

  if (detailsContainer.hasChildNodes()) {
    detailsContainer.innerHTML = "";
  }
  if (mealsContainer.hasChildNodes()) {
    mealsContainer.innerHTML = "";
  }

  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchItemValue}`)
  .then((res) => res.json())
  .then((data) => {
    validate(data);

    data.meals.forEach((meal) => {
      let domStr = `<img src="${meal.strMealThumb}"><h3>${meal.strMeal}</h3>`;
      const singleMeal = document.createElement("div");
      singleMeal.classList.add("single-meal");
      singleMeal.innerHTML = domStr;
      mealsContainer.prepend(singleMeal);
      searchItem.value = "";
      singleMeal.addEventListener("click", function () {
        getDetails(meal);
      });
    });
  });
}


const getDetails = (meal) => {
  let mealName = meal.strMeal;
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
    .then((res) => res.json())
    .then((data) => {
      let allDetails = `<img src="${data.meals[0].strMealThumb}"> <h3>${data.meals[0].strMeal}</h3><h4>Ingredients</h4>`;
      detailsContainer.innerHTML = allDetails;
      window.scrollTo({ top: 0, behavior: "smooth" });
      for (const [key, value] of Object.entries(data.meals[0])) {
        for (let i = 1; i < 25; i++) {
          if (key === `strIngredient${i}` && value !== "" && value !== null) {
            let li = document.createElement("li");
            li.innerText = `${value}`;
            detailsContainer.appendChild(li);
          }
        }
      }
    });
};

const validate = (data) => {
  console.log(data);
  if (data.meals == null) {
    notFoundText.style.display = "block";
  }
    else {
      notFoundText.style.display = "none";
    };
};

