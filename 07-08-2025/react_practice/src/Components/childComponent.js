import { useEffect, useState } from "react";

function Child({ input, date }) {
  const [historyArr, setHistoryArr] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : [];
  });

  let date2 = new Date();
  let date1 = new Date(date);

  date1 = date1.getTime();
  date2 = date2.getTime();
  const dateDifferenceInMS = date2 - date1;
  //   console.log(dateDifferenceInMS, "name is-",input);

  useEffect(() => {
    const newHistory = [...historyArr, { input, date }];
    setHistoryArr(newHistory);
    localStorage.setItem("user", JSON.stringify(newHistory));
    // eslint-disable-next-line
  }, [input, date]);

  return (
    <>
      <div>
        <h3>From Child Components</h3>
        <p>{`Your name is ${input} and you are ${dateDifferenceInMS} milliseconds older :|`}</p>
        <div id="child_history_wrapper">
            <h4>History User:-</h4>
            {historyArr.map((value, idx)=>{
                return <p key={idx}>{`Your name is ${value.input} and your dob is ${value.date}`}</p>
            })}
        </div>
      </div>
    </>
  );
}

export default Child;
