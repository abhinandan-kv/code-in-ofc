import { useEffect, useState } from "react";

const Todo = () => {
  const [value, setValue] = useState("");
  const [todoArr, setTodoArr] = useState(() => {
    const saved = localStorage.getItem("item");
    return saved ? JSON.parse(saved) : [];
  });

  function handleClick(e) {
    e.preventDefault();

    setTodoArr([...todoArr, value]);
    console.log("todoArr", todoArr);

    setValue("");
  }
  useEffect(() => {
    localStorage.setItem("item", JSON.stringify(todoArr));
  }, [todoArr]);

  return (
    <>
      <div>
        <h2>- Simple Todo -</h2>
        <form>
          <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
          <button type="submit" onClick={handleClick}>
            Submit
          </button>
        </form>
        {todoArr.length ? (
          <div>
            <h5>Your Tasks are:-</h5>
            {todoArr.map((val, idx) => {
              return (
                <>
                  <p key={idx}>{val}</p>
                  <br />
                </>
              );
            })}
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Todo;
