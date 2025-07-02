console.log("Script Started");

// 🖱️ Mouse Events
// Event	Description
// click	Fires when an element is clicked
// dblclick	Fires when an element is double-clicked
// mousedown	Fires when mouse button is pressed
// mouseup	Fires when mouse button is released
// mouseenter	Fires when mouse enters the element
// mouseleave	Fires when mouse leaves the element
// mousemove	Fires when the mouse is moved
// mouseover	Fires when the mouse is moved onto the element or its children
// mouseout	Fires when the mouse leaves the element or its children
// contextmenu	Fires when the right mouse button is clicked

let ClickButton = document.getElementById("single-click");
ClickButton.addEventListener("click", () => {
  ClickButton.style.color = "red";
  ClickButton.innerText = "onClick Event occured";
  console.log("onClick Event Happened");
});

let doubleClick = document.getElementById("double-click");
doubleClick.addEventListener("dblclick", () => {
  doubleClick.style.color = "gray";
  doubleClick.innerText = "doubleClick Happened";
  console.log("doubleClick Event Happened");
});

let MouseDown = document.getElementById("mouse-Down");
MouseDown.addEventListener("mousedown", () => {
  MouseDown.style.color = "red";
  MouseDown.innerText = "mouse down event happened";
  console.log("mouse down event happened");
});

let MouseUp = document.getElementById("mouse-Up");

MouseUp.addEventListener("mouseup", () => {
  MouseUp.style.color = "green";
  MouseDown.innerText = "Mouse Up event happened";
  console.log("mouse up event happened");
});

let MouseEnter = document.getElementById("mouse-enter");
MouseEnter.addEventListener("mouseenter", () => {
  MouseEnter.style.backgroundColor = "black";
  MouseEnter.style.color = "blue";
  console.log("mouse Enter event happened");
});

let mouseLeave = document.getElementById("mouse-leave");
mouseLeave.style.border = "2px solid black"; //to demostrate mouseLeaving the area ONLY

mouseLeave.addEventListener("mouseleave", () => {
  mouseLeave.style.backgroundColor = "Lavender ";
  mouseLeave.style.color = "green";
  console.log("MouseLeave event triggered");
});

let MouseMove = document.getElementById("mouse-move");
MouseMove.addEventListener("mousemove", (evt) => {
  MouseMove.style.backgroundColor = "red";
  MouseMove.style.color = "white";
  console.log("MouseMove triggered");
  console.log(`clientX:${evt.clientX}  clientY:${evt.clientY}`);
  MouseMove.innerText = `  MouseMove Event is Triggered inside this red area:
  clientX:${evt.clientX} 
  clientY:${evt.clientY}`;
});

let MouseOver = document.getElementById("mouse-over");
MouseOver.addEventListener("mouseover", () => {
  MouseOver.style.backgroundColor = "green";
  MouseOver.style.color = "white";
  console.log("mouseOver event triggered");
});

let MouseOut = document.getElementById("mouse-out");
MouseOut.addEventListener("mouseout", () => {
  MouseOut.style.backgroundColor = "lightblue";
  MouseOut.style.color = "DeepPink";
  console.log("MouseOut event occured");
});

let ContextMenu = document.getElementById("context-menu");
ContextMenu.addEventListener("contextmenu", () => {
  ContextMenu.style.backgroundColor = "GreenYellow";
  ContextMenu.style.fontSize = "50px";
  ContextMenu.innerText = "Uhh!!!! you right clicked me";
  console.log("ContextMenu triggered");
});

let darkModeToggle = document.getElementById("dark-mode");
let dark = false;

darkModeToggle.addEventListener("click", () => {
  toggle();
});

function toggle() {
  if (dark === false) {
    document.body.classList.add("darkmode");
    darkModeToggle.innerText = "Boom!~ Lights gone";
    darkModeToggle.style.cssText = "font-size:30px; color:black";
    console.log("Dark mode activated");

    dark = true;

    setTimeout(() => {
      darkModeToggle.textContent = "Want the lights back???"; 
    }, 3000);
    
  } else {
    document.body.classList.remove("darkmode");

    darkModeToggle.innerText = "Boom!~ Lights gone";
    darkModeToggle.style.cssText = "font-size:16px; color:black";

    console.log("Dark mode deactivated");

    dark = false;
  }
}

// setTimeout(()=>{  document.body.classList.add("darkmode")}
// ,5000)
