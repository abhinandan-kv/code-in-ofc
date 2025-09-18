import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../app/actions/action";
import UserDisplay from "./UserDisplay";

const UserLists = () => {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useSelector((state) => state.reducerName);
  console.log(data);
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <UserDisplay data={data} />
    </>
  );
};

export default UserLists;
