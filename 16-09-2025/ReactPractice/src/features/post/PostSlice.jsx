import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  //   {
  //     id: 1,
  //     name: undefined,
  //     paragraph: undefined,
  //   },
];

export const PostSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    addNewPost: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addNewPost } = PostSlice.actions;

export default PostSlice.reducer;
