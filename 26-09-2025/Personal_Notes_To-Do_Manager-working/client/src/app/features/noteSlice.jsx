import { createAsyncThunk, createSlice } from "@reduxjs/toolkit/react";
import axios from "axios";

const BASEURL = import.meta.env.VITE_BACKEND_URL;

const initialState = {
  notes: [],
  status: "idle",
  error: null,
};

export const fetchNotes = createAsyncThunk("note/fetchNotes", async () => {
  const response = await axios.get(`${BASEURL}/api/v1/note/get`, { withCredentials: true });
  console.log(response);
  return await response.json();
});

export const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    notesAdd: (state, action) => {
      state.notes.push(action.payload);
    },
    notesDelete: (state, action) => {
      const { noteid } = action.payload;
      const newNotes = state.notes.filter((t) => t.id !== noteid);
      state.notes = newNotes;
    },
  },
  extraReducers: (builders) => {
    builders
      .addCase(fetchNotes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.status = "success";
        state.notes = action.payload;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { notesAdd, notesDelete } = noteSlice.actions;

export default noteSlice.reducer;
