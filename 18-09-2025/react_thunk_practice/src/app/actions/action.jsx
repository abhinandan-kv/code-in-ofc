import axios from "axios";

export const FETCH_DATA_REQUEST = () => ({ type: "FETCH_DATA_REQUEST" });
export const FETCH_DATA_SUCCESS = (data) => ({
  type: "FETCH_DATA_SUCCESS",
  payload: data,
});
export const FETCH_DATA_FAILURE = (error) => ({
  type: "FETCH_DATA_ERROR",
  payload: error,
});

export const fetchData = () => {
  return async (dispatch) => {
    dispatch(FETCH_DATA_REQUEST());
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      dispatch(FETCH_DATA_SUCCESS(response.data));
    } catch (err) {
      dispatch(FETCH_DATA_FAILURE(err.message));
    }
  };
};
