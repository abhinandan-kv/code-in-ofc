import { useState } from "react";
import AddProductForm from "./Component/AddProductForm";
import ProductDisplay from "./Component/ProductDisplay";

function App() {
  const [addBtn, setAddBtn] = useState(false);

  function handleClick(e) {
    e.preventDefault();
    setAddBtn(!addBtn);
  }

  return (
    <>
      <div className="bg-gray-900 w-full h-full">
        <h1 className="text-5xl text-center justify-center mb-3 text-gray-500 dark:text-gray-400">
          <a className="font-semibold text-gray-900 underline decoration-double dark:text-white decoration-indigo-500">
            Best
          </a>{" "}
          Product Site
        </h1>
        <AddProductForm isOpen={addBtn} clickHandler={handleClick} />
        <ProductDisplay />
      </div>
    </>
  );
}

export default App;
