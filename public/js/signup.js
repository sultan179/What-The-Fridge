var loadFile = function (event) {
  var image = document.getElementById("profile-pic");
  var url = document.getElementById("image-url").value;
  console.log(url);
  if (isImgLink(url)) {
    image.src = url;
    image.setAttribute("class", "new-profile-pic");
  } else {
    image.src = "../img/profile.png";
    alert("Invalid Image URL");
  }
};

/**
 * Referenced from:
 * https://thewebdev.info/2021/08/15/how-to-verify-that-an-url-is-an-image-url-with-javascript/#:~:text=URL%20with%20JavaScript-,To%20verify%20that%20an%20URL%20is%20an%20image%20URL%20with,false%3B%20%7D%20return%20(url
 */

const isImgLink = (url) => {
  if (typeof url !== "string") {
    return false;
  }
  return (
    url.match(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gim) !== null
  );
};
