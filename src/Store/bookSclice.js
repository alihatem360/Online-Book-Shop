import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { logInsert } from "./reportSlice";

export const getbooks = createAsyncThunk(
  "book/getBooks",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const result = await fetch("http://localhost:3009/book");
      const books = await result.json();
      return books;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

//////// insertBook sclis

export const insertBook = createAsyncThunk(
  "book/insertBook",
  async (dataBody, thunkAPI) => {
    const { rejectWithValue, getState, dispatch } = thunkAPI;

    try {
      dataBody.username = getState().auths.name;
      const result = await fetch("http://localhost:3009/book", {
        method: "POST",
        body: JSON.stringify(dataBody),
        headers: {
          "Content-Type": "application/json ; charset=utf-8",
        },
      });

      const data = await result.json();
      dispatch(logInsert({ name: "insert book", status: "success" }));
      return data;
    } catch (err) {
      dispatch(logInsert({ name: "insert book", status: "failed" }));

      return rejectWithValue(err.message);
    }
  }
);

///// delete slice

export const deleteSlice = createAsyncThunk(
  "book/delete",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      await fetch(`http://localhost:3009/book/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json ; charset=utf-8",
        },
      });
      return id;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

///////////// read book
export const readBook = createAsyncThunk(
  "book/readBook",
  async (item, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      await fetch(`http://localhost:3009/book/${item.id}`, {
        method: "Get",
        headers: {
          "Content-Type": "application/json ; charset=utf-8",
        },
      });
      return item;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

/////////////////////////////

const BookSclice = createSlice({
  name: "book",
  initialState: { bookList: [], isLoading: false, error: null, bookInfo: [] },
  extraReducers: {
    [getbooks.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
      console.log(action);
    },
    [getbooks.fulfilled]: (state, action) => {
      state.isLoading = false;

      //   console.log("from reducer" + state.books);
      console.log("after action ", action);
      // console.log( "after state " , state.bookList);
      state.bookList = action.payload;
      // console.log( "after state " , state.bookList);
    },
    [getbooks.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      console.log(action);
    },

    [insertBook.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    [insertBook.fulfilled]: (state, action) => {
      state.bookList.push(action.payload);
    },

    [insertBook.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [deleteSlice.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    [deleteSlice.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.bookList = state.bookList.filter(
        (element) => element.id !== action.payload
      );
    },

    [deleteSlice.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [readBook.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.bookInfo = action.payload;
    },
  },
});

export default BookSclice.reducer;
