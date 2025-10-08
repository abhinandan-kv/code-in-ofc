import React from "react";
import { QueryClient, useQuery } from "@tanstack/react-query";
import axios from "axios";

const queryClient = new QueryClient();

const fetchData = async () => {
  const { data } = await axios.get("https://pokeapi.co/api/v2/pokemon");
  //   console.log(data);
  return data.results;
};
let result = new Map();

const fetchImg = async (key, value) => {
  const { data } = await axios.get(value.url);
//   console.log(data.sprites);
  await result.set(key, data.sprites);
};
// yet to implement this

const Api = () => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["data"],
    queryFn: fetchData,
  });

  if (data) {
    Object.entries(data).map(async ([key, value]) => {
      await fetchImg(key, value);
    });
  }
  console.log(result);
  //   console.log(data);
  if (isPending) return <p>...Loading.</p>;
  if (error) return <p>Error, {error.message}</p>;

  return (
    <div>
      {data &&
        data.map((item, idx) => (
          <div key={idx}>
            {item.name} - <a>{item.url}</a>
            {}
          </div>
        ))}
    </div>
  );
};

export { queryClient };
export default Api;
