import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const Getbooks = createAsyncThunk(
  "Getbooks",
  async function (q, { rejectWithValue }) {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}?${q}&key=${
          import.meta.env.VITE_APP_KEY
        }`
      );

      // if (!response.ok ){ throw new Error("Что то-пошло не так...")}

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const GetbooksById = createAsyncThunk(
  "GetbooksById",
  async function (id, { rejectWithValue }) {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes/${id}?key=AIzaSyBm7LPGUX-HirJoQAlne_qJjcLrCdSoO0g`
      );
      // if (!response.ok ){ throw new Error("Что то-пошло не так...")}
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


const slice = createSlice({
  name: "users",
  initialState: {
    books: [],
    book: {},
    newbooks: [],
    total: null,
    loading: false,
    errorMessage: "",
    idx: "",
    q: "",
    searchTerms: {
      category: "",
      order: "relevance",
    },
  },
  reducers: {
    handlechange(state, action) {
      state.searchTerms[action.payload.key] = action.payload.value;
    },
    handlechangeQ(state, action) {
      state.q = action.payload.value;
    },
  },
  extraReducers: {
    [Getbooks.pending]: (state) => {
      state.loading = true;
    },
    [Getbooks.fulfilled]: (state, action) => {
      state.loading = false;

      state.books = action.payload.items
        ? [...state.books, ...action.payload.items]
        : [];
      state.total = action.payload.totalItems;
    },
    [Getbooks.rejected]: (state, action) => {
      state.loading = false;
      state.errorMessage = action.payload;
      console.log(action.payload);
    },
    [GetbooksById.pending]: (state) => {
      state.loading = true;
    },

    [GetbooksById.fulfilled]: (state, action) => {
      state.loading = false;

      state.book = action.payload;
    },
    [GetbooksById.rejected]: (state, action) => {
      state.loading = false;

      state.errorMessage = action.payload;
      console.log(action.payload);
    },
    // [TodoGe.fulfilled]: (state, action) => {
    //   state.Todonew = action.payload;
    // },
  },
});

export const { handlechange, handlechangeQ } = slice.actions;

export default slice.reducer;
