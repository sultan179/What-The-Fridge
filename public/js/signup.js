var loadFile = function (event) {
  var image = document.getElementById("profile-pic");
  image.src = URL.createObjectURL(event.target.files[0]);
  image.setAttribute("class", "new-profile-pic");
};
