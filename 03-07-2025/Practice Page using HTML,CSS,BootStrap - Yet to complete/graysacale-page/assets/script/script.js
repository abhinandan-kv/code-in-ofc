let navbar = document.getElementById("Navbar");
let navbarItems = document.querySelectorAll(".custom-Navbar-color");
console.log(navbarItems)
console.log("got the navbar");
window.addEventListener("scroll", function () {
  if (window.scrollY > 100) {
    navbar.classList.add("custom-Navbar");
    navbarItems.forEach((items) => {
      items.classList.add("newColor");
      console.log("added")
    });

    // console.log(scrollY);
  } else {
    navbar.classList.remove("custom-Navbar");
    navbarItems.forEach((items)=>{
        items.classList.remove("newColor")
    })
  }
});
