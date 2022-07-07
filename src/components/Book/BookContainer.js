import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getbooks , deleteSlice  , readBook} from "../../Store/bookSclice";

import BookInfo from "./BookInfo";
import BooksList from "./BooksList";

import "./book.css";

const PostContainer = () => {
  const { isLoading } = useSelector((state) => state.book);
  const { bookList } = useSelector((state) => state.book);
  const { isLoggedIn } = useSelector((state) => state.auths);
  const { bookInfo } = useSelector((state) => state.book);

  // console.log("from container  "  , bookList );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getbooks({ id: 1 }));
  }, [dispatch]);

  return (
    <Fragment>
      <hr className="my-5" />
      <div className="row">
        <div className="col">
          <BooksList
            isLoading={isLoading}
            bookList={bookList}
            isLoggedIn={isLoggedIn}
            deleteSlice ={deleteSlice}
            dispatch ={dispatch}
            readBook = {readBook}
          />
        </div>
        <div className="col side-line">
          <BookInfo 
          bookInfo = {bookInfo}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default PostContainer;
