// ======================= METHOD 1 =========================
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
console.log(1);

async function myFun() {
  await new Promise((resolve) =>
    setTimeout(() => {
      console.log(2);
      resolve();
    }, 1000)
  );
}

(async () => {
  await myFun();
  console.log(3);
})();

// // ======================= METHOD 2 =========================
// // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

// Promise.allSettled([
//     Promise.resolve("1"),
//     Promise.resolve("2"),
//     Promise.resolve("3")
// ])
//     .then((results) => console.log(results));
