function onClick() {
  console.log("Button clicked");
  getData();
}

function throttleFn(funcName, delay) {
  let throttleFlag = null;
  return (...args) => {
    if (throttleFlag === null) {
      funcName(...args);
      throttleFlag = setTimeout(() => {
        throttleFlag = null;
      }, delay);
    }
  };
}

//simple example for throttle fn
async function getData(e) {
  const api = "https://picsum.photos/v2/list";

  const response = await fetch(api);
  const result = await response.json();
  console.log(result);

  result.map((val, idx) => {
    const photoChild = document.createElement("img");

    console.log(val.download_url);
    photoChild.src = val.download_url;
    photoChild.setAttribute("style", "height:200px; width:400px");
    parentDiv.appendChild(photoChild);
  });
}

const btn = document.getElementById("simplebtn");
btn.addEventListener("click", throttleFn(onClick, 5000));

const parentDiv = document.getElementById("parentDiv");
