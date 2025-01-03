// Prices
const ingredientPrices = {
    lettuce: 1,
    cheese: 2,
    patty: 3,
    tomato: 1.5,
  };
  let totalIngredientPrice = 0;
  const basePrice = 3;
// Helper Functions
function getIngredients(selector) {
  const sandwich = document.getElementById('sandwich');
  return sandwich.querySelectorAll(selector);
}
function formatIngredientName(name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}
function updatePriceForIngredient(type, isAdding) {
  if (ingredientPrices[type]) {
    totalIngredientPrice += isAdding ? ingredientPrices[type] : -ingredientPrices[type];
    updateAllPrices();
  }
}
//url encoded query string
function buildQueryParams(params) {
  return Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
}
// Main Functions
function addIngredient(type) {
  const sandwich = document.getElementById('sandwich');
  const ingredient = document.createElement('div');
  ingredient.className = type;
  sandwich.insertBefore(ingredient, sandwich.lastElementChild);

  updatePriceForIngredient(type, true);
}
function removeIngredient(type) {
  const ingredients = getIngredients(`.${type}`);
  if (ingredients.length > 0) {
    ingredients[ingredients.length - 1].remove();
    updatePriceForIngredient(type, false);
  }
}
function clearSandwich() {
  const ingredients = getIngredients('.lettuce, .cheese, .patty, .tomato');
  ingredients.forEach(ingredient => ingredient.remove());
  totalIngredientPrice = 0;
  updateAllPrices();
}
function updateAllPrices() {
  const ingredientsPriceElement = document.getElementById('ingredients-price');
  const totalPriceElement = document.getElementById('total-price');
  const ingredientsTotalElement = document.getElementById('ingredients-total');
  const finalTotalElement = document.getElementById('final-total');

  const formattedIngredientsPrice = `$${totalIngredientPrice.toFixed(2)}`;
  const formattedFinalPrice = `$${(basePrice + totalIngredientPrice).toFixed(2)}`;

  if (ingredientsPriceElement) ingredientsPriceElement.textContent = formattedIngredientsPrice;
  if (totalPriceElement) totalPriceElement.textContent = formattedFinalPrice;
  if (ingredientsTotalElement) ingredientsTotalElement.textContent = formattedIngredientsPrice;
  if (finalTotalElement) finalTotalElement.textContent = formattedFinalPrice;
}
function placeOrer() {
  const ingredientsSummaryElement = document.getElementById('ingredients-summary');
  ingredientsSummaryElement.innerHTML = '';
  const ingredients = getIngredients('.lettuce, .cheese, .patty, .tomato');
  ingredients.forEach((ingredient) => {
    const ingredientDiv = document.createElement('div');
    ingredientDiv.textContent = formatIngredientName(ingredient.className);
    ingredientsSummaryElement.appendChild(ingredientDiv);
  });
  updateAllPrices();
}
function redirectToOrderPage() {
  const ingredients = Array.from(getIngredients('.lettuce, .cheese, .patty, .tomato')).map((ingredient) => ingredient.className);

  const queryParams = buildQueryParams({
    ingredients: ingredients.join(','),
    ingredientsTotal: totalIngredientPrice.toFixed(2),
    finalTotal: (basePrice + totalIngredientPrice).toFixed(2),
  });
  window.location.href = `order.html?${queryParams}`;
}

