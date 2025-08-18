const ENDPOINT = "https://dummyjson.com/ip";

import { useEffect, useState } from "react";
import axios from "axios";

const IpAddress = () => {
  const [data, setData] = useState(null);
  const [trimedIp, setTrimedIp] = useState('');

  useEffect(() => {
    axios
      .get(ENDPOINT)
      .then((res) => {
        console.log(res);
        setData(res.data.ip);

      })
      .catch((err) => console.error(err));
  }, []);
        // console.log("data:-",data)
        // let stringyIp = JSON.stringify(data.ip)
        // let ipLength= stringyIp.length
        // // let trimmedIp= 
        // console.log(stringyIp.slice(0,ipLength))
        // setTrimedIp(JSON.stringify(data.ip).slice(1,data.ip.length()-1));
        // setTrimedIp(trimedIp.slice(1));
        // setTrimedIp(trimedIp.slice(0, trimedIp.length - 1));
        // console.log("trimmed :-", trimedIp);
  // const stringyIp= JSON.stringify(data.ip)
  // const leftTrimIp =stringyIp.slice(1)
  // const RightTrimIp= leftTrimIp.slice(0,leftTrimIp.length-1)
  // console.log("data",RightTrimIp)

  return <div>{data ? JSON.stringify(data).slice(1,data.length+1) : "Loading..."}</div>;
};

export default IpAddress;
