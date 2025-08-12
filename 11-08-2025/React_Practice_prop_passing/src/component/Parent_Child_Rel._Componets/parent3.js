import Child3 from "./child3";
import { DataContext } from "../../utils/context";
import { useState } from "react";

const Parent3 = () => {
  const [mydata, setMyData] = useState({value1:"my lil cat", value2:"Data from parent to child ", value3:'using ContextApi', flag:false})


  return (
    <>
      <DataContext.Provider value={{mydata, setMyData}}>
        <div>
          <Child3 />
        </div>
      </DataContext.Provider>
    </>
  );
};

export default Parent3;
