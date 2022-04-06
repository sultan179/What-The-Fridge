const ingredientList = [];

$("#ingredient-button").on("click", function (e) {
  e.preventDefault();

  /** Get the input value */
  const ingredient = document.getElementById("ingredient").value;

  if (ingredient != "" && !ingredientList.includes(ingredient)) {
    //Add ingredient to ingredient lists
    ingredientList.push(ingredient);
    console.log(ingredientList)

    //Create html item
    const tag = document.createElement("div");
    tag.setAttribute("id", "ingredient-" + ingredient);
    tag.setAttribute("class", "ingredient-tag");

    const label = document.createTextNode(ingredient);

    //button for removing the item
    const button = document.createElement("button");
    button.innerHTML =
      '<i class="fa-solid fa-xmark text-white" aria-hidden="true"></i>';
    button.setAttribute("class", "ingredient-exit");
    button.onclick = function (e) {
      e.preventDefault();

      /** Remove item from HTML */
      document.getElementById("ingredient-" + ingredient).remove();

      /** Remove Item from Ingredient List */
      var index = ingredientList.indexOf(ingredient);
      if (index !== -1) {
        ingredientList.splice(index, 1);
      }
    };

    tag.appendChild(label);
    tag.appendChild(button);

    document.getElementById("ingredient-group").appendChild(tag);
  } else if (ingredientList.includes(ingredient)) {
    alert("Please try a different ingredient!");
  }
  
});

