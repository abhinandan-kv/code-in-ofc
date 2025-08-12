import { useContext } from "react";
import { DataContext } from "../../utils/context";

const Child3 = () => {
  const { mydata, setMyData } = useContext(DataContext);
//   console.log(mydata);
  let str1 = mydata.value2;
  let str2 = mydata.value3;
  let str3 = str1.concat(str2);
//   console.log(str3);

  return (
    <>
      <p>{mydata.value1}</p>
      {!mydata.flag ? <p>{str1}</p> : ""}

      {mydata.flag ? <p>{str3}</p> : ""}
      <button onClick={() => setMyData({ ...mydata, flag: true })}>Using What?</button>
    </>
  );
};
export default Child3;
