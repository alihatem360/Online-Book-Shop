import { configureStore } from "@reduxjs/toolkit";
import book from "./bookSclice";
import auths from "./authSlice";
import report from "./reportSlice";

export default configureStore({
  reducer: { book, auths, report },
});
