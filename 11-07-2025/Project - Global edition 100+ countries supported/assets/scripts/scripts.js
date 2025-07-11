const BASE_ENDPOINT = "https://date.nager.at/api/v3/publicholidays/"; //date-nager api

let container = document.getElementById("container");

async function getData(year,country) {
  console.log(year,country);
  await fetch(`${BASE_ENDPOINT}${year}/${country}`)
    .then(async (response) => {
      let data = await response.json();
      //console.log(data);
      setData(data);
    })
    .catch((err) => console.error(err.messege));
}

function setData(data) {
  // console.log("inside setdata", data);

  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  for (let ele of data) {
    //console.log(ele.name, ele.date, typeof ele.name);
    const div = document.createElement("div");
    const span = document.createElement("span");
    const para = document.createElement("p");

    div.appendChild(span);
    div.appendChild(para);

    container.appendChild(div);

    div.classList.add("d-flex", "flex-row", "justify-content-between", "text-center", "align-items-center", "m-2");
    span.classList.add("border-bottom", "border-3", "text-center", "p-0", "align-items-center");
    para.classList.add("border-bottom", "border-3", "text-center", "p-0", "m-0", "align-items-center");

    span.textContent = `${ele.date}`;
    para.textContent = `${ele.name}`;
  }
}

// // SetData for debugging starts
// function setData() {
//   let container = document.getElementById("container");

//   for (let i = 0; i < 10; i++) {
//     const div = document.createElement("div");
//     const span = document.createElement("span");
//     const para = document.createElement("p");

//     div.appendChild(span);
//     div.appendChild(para);

//     container.appendChild(div);

//     div.classList.add("d-flex", "flex-row", "justify-content-around");
//     span.classList.add("bg-primary", "border-bottom" , "border-3");
//     para.classList.add("bg-secondary", "border-bottom", "border-3");

//     span.textContent = "SPAN CONTENT";
//     para.textContent = "PARA CONTENT";

//   }
// }

function handleClick() {
  let inputDate = document.getElementById("inputDate");
  let selectedCountry = document.getElementById("CountryPicker");
  let Country = selectedCountry.value;
  // slicing results
  let year = inputDate.value.slice(0, 4);
  let month = inputDate.value.slice(5, 7);
  let day = inputDate.value.slice(8, 10);
  // let result = inputDate.value;
  // console.log(result.length)
  console.log("Year:- ", year, "Month", month, "Day", day);
  console.log(inputDate.value, inputDate.defaultValue);
  console.log(Country);

  getData(year,Country);

  // setData();
}
