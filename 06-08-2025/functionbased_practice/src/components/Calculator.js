import { useEffect, useState } from "react";

export default function Calculator() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("history");
    return saved ? JSON.parse(saved) : [];
  });

  function handleClick(e) {
    const value = e.target.value;
    let result;

    if (value === "=") {
      try {
        if (input !== undefined) {
          // eslint-disable-next-line
          result = eval(input);
          setInput(result.toString());
          if (typeof result === "number") {
            setHistory([...history, `${input}=${result}`]);
          }
          // console.log(history);
        }
      } catch {
        setInput("Error");
      }
    } else {
      setInput(input + value);
    }
  }
  function handleClear() {
    setInput("");
  }
  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(history));
  }, [history]);

  return (
    <>
      <div>
        <h2>- Simple Calculator -</h2>
        <div>
          <input type="text" value={input} readOnly />
          <div>
            <button value="/" onClick={handleClick}>
              /
            </button>
            <button value="*" onClick={handleClick}>
              *
            </button>
            <button value="-" onClick={handleClick}>
              -
            </button>
            <button value="+" onClick={handleClick}>
              +
            </button>
          </div>
          <div>
            <button value="7" onClick={handleClick}>
              7
            </button>
            <button value="8" onClick={handleClick}>
              8
            </button>
            <button value="9" onClick={handleClick}>
              9
            </button>
          </div>
          <div>
            <button value="4" onClick={handleClick}>
              4
            </button>
            <button value="5" onClick={handleClick}>
              5
            </button>
            <button value="6" onClick={handleClick}>
              6
            </button>
          </div>
          <div>
            <button value="1" onClick={handleClick}>
              1
            </button>
            <button value="2" onClick={handleClick}>
              2
            </button>
            <button value="3" onClick={handleClick}>
              3
            </button>
          </div>
          <div>
            <button value="0" onClick={handleClick}>
              0
            </button>
            <button value="." onClick={handleClick}>
              .
            </button>
            <button value="=" onClick={handleClick}>
              =
            </button>
            <button onClick={handleClear}>C</button>
          </div>
        </div>

        {history ? (
          <div>
            <h5>Results:-</h5>
            {history.map((val, idx) => {
              return <p key={idx}>{val}</p>;
            })}
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
