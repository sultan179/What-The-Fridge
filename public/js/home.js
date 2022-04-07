

const ingredientList = [];

$("#ingredient-button").on("click", function (e) {
  e.preventDefault();

  /** Get the input value */
  const ingredient = document.getElementById("ingredient").value;

  if (ingredient != "" && !ingredientList.includes(ingredient)) {
    //Add ingredient to ingredient lists
    ingredientList.push(ingredient);
    // console.log(ingredientList)

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

$(".home-button").on("click", function (e) {

   var searchParams = new URLSearchParams(window.location.search)
    searchParams.set("ingredients", ingredientList.toString());
    window.location =window.location.href + 'recipes'+'?' + searchParams.toString();



//    var element = document.querySelector('a');
//    console.log("53",ingredientList.toString())
//   // var url = new URL("/recipes?ingredients=");
// //  window.onload=()=>{
//    console.log("56",ingredientList.toString())
//   //  url.searchParams.append(ingredientList.toString());
//   element.href+= "ingredients=unsalted butter";
//   console.log("ingredList",ingredientList.toString())
// //  }
//   console.log("61",ingredientList.toString())
  
  // makeGetRequest();
  // window.onload=()=>{
  //   console.log("list",ingredientList)
    
  //  var element = document.querySelector('a[href="http://www.google.com"]');
  //  element.href = "http://stackoverflow.com";
  //  console.log("list",ingredientList)
//  };
  // document.getElementById('#href-link').href= 'http://localhost:3000/recipes'
  // =
  //        '/recipes?ingredients'+=ingredientList.toString()


  
  //references https://stackoverflow.com/questions/5999118/how-can-i-add-or-update-a-query-string-parameter





})

//   async function makeGetRequest() {

//   let res = await axios.get('http://localhost:3000/recipes/',{
//     params:{
//       ingredient:ingredientList.toString()
//     }
//   });

//   let data = res.data;
//   console.log("data",data);
// }


