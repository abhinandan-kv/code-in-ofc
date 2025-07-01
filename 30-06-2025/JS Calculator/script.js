AOS.init({ duration: 2000 });

let displayInput = document.getElementById("input-display");
let displayResult = document.getElementById("result-display");

function appendButton(input) {
  displayInput.value += input;
  displayResult.value = "";
}

function clearInput() {
  displayInput.value = "";
}

function deleteInput() {
  let val = displayInput.value;
  displayInput.value = val.slice(0, -1);
}

function calculate() {
  try {
    let result = eval(displayInput.value);
    displayInput.value = "";
    displayResult.value = result;
  } catch (error) {
    displayInput.innerText = `Error`;
  }
}
