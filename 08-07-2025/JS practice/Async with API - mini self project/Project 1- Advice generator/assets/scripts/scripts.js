const api = "https://api.adviceslip.com/advice";

let resultShow = document.getElementById("resultShow");
let resultId = document.getElementById("resultId");
let callBtn = document.getElementById("callBtn");
let tooltip = document.getElementById("tooltip")


let advice, id;

async function getAdvice(callback) {
  let result = await fetch(api);

  // console.log(result);

  let parsedResult = await result.json();

  // console.log(parsedResult);
  // console.log(parsedResult.slip);

  advice = parsedResult.slip.advice;
  id = parsedResult.slip.id;

  callback();
}

function putValues() {
  resultShow.innerText = advice;
  resultShow.classList.remove("skeleton", "skeleton-text");
  resultId.innerText = id;
  resultId.classList.remove("skeleton", "skeleton-id");
}

function handleClick() {
  getAdvice(putValues);
  callBtn.setAttribute("disabled", true);
  callBtn.innerHTML = "Please Read thoroughly";

  resultShow.classList.add("skeleton", "skeleton-text");
  resultId.classList.add("skeleton", "skeleton-id");

  bootstrap.Tooltip.getInstance(tooltip)?.dispose();
  tooltip.removeAttribute("data-bs-toggle")
  
  setTimeout(() => {
    callBtn.removeAttribute("disabled");
    callBtn.innerText = "Another Advice?";
    console.log("10s passed");
  }, 10000);
}
