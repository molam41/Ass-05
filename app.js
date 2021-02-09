
function searchFood(){
  const inputText = document.getElementById("inputText").value
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputText}`)
  .then(res => res.json())
  .then(data => {
    searchMeal(data.meals);
  })
}

const searchMeal = meals =>{

  const allMeals = document.getElementById('meals')
  const individualItemToRemove = document.getElementById('individualItem')
  allMeals.innerHTML = ""
  individualItemToRemove.innerHTML = ""

  if(meals != null){
    meals.forEach(meal => {
      const mealIngradient = []
      const mealKeys = Object.keys(meal);
      let i = 1;
      var requiredMealKey;

      mealKeys.forEach(mealKey =>{
        if(mealKey.slice(0, 13) == "strIngredient"){
          requiredMealKey = 'strIngredient' + i++;
          if (meal[requiredMealKey] != "") {
          mealIngradient.push(meal[requiredMealKey]);           
          }
        }
      })

      allMeals.innerHTML = allMeals.innerHTML + ` 
      <div class="food-details" onclick="displayIndividualItemDetails('${meal.strMeal}', '${meal.strMealThumb}', '${mealIngradient}')">
        <img src="${meal.strMealThumb}" alt="" />
        <h3>${meal.strMeal}</h3>
      </div>
      `
    });   
  } else {
    alert("There is no such food available here.")
  }

}

const displayIndividualItemDetails = (mealName, mealImage, mealIngradient) => {
  const individualItem = document.getElementById('individualItem')
  let ul = document.createElement('ul');
  const mealIngradientArray = mealIngradient.split(",")

  mealIngradientArray.forEach(Ingradient =>{
    let li = document.createElement('li');
    li.innerText = Ingradient;
    ul.appendChild(li);
  })
  individualItem.innerHTML = ` 
    <div class="food-details">
      <img src="${mealImage}" alt="" />
      <h3>${mealName}</h3>
      <h2>Ingredients</h2>
      </div>
    ` 
    individualItem.appendChild(ul)
}