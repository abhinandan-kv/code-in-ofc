const ENDPOINT = "https://dummyjson.com/ip";

import { useEffect, useState } from "react";
import axios from "axios";

const IpAddress = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get(ENDPOINT)
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return <div>{data ? JSON.stringify(data.ip) : "Loading..."}</div>;
};

export default IpAddress;
