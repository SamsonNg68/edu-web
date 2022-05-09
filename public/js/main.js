
// sticky navbar

var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;

window.onscroll = function () {
  isScrolled();
};

function isScrolled() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
}

//slider background
var slideIndex = 0;
showDivs(slideIndex);
carousel();

function plusDivs(n) {
  showDivs((slideIndex += n));
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("mySlides");
  if (n > x.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = x.length;
  }
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  x[slideIndex - 1].style.display = "block";
}

//auto carousel

function carousel() {
  var i;
  var x = document.getElementsByClassName("mySlides");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > x.length) {
    slideIndex = 1;
  }
  x[slideIndex - 1].style.display = "block";
  setTimeout(carousel, 8000); // Change image every 2 seconds
}

// menu responsive icon
// let navbarBtn = document.querySelector(".navbar-list");

// document.querySelector("#menu-btn").onclick = () => {
//   navbarBtn.classList.toggle("active");
//   //   navbarBtn.classList.toggle("active");
// };

// window.onscroll = () => {
//   navbarBtn.classList.remove("active");
// };


//pagination
// function showHidePagination(){
//   if(document.getElementsByClassName('advise-item').length < 6){
//     document.getElementById('pagination').style.display='none'
//   } else{
//     document.getElementById('pagination').style.display='display'
//   }
// }
// showHidePagination()
