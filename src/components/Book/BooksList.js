import React from "react";

const BooksList = ({
  isLoading,
  bookList,
  isLoggedIn,
  deleteSlice,
  dispatch,
  readBook,
}) => {
  const bookListContainer = bookList.length
    ? bookList.map((item) => (
        <li
          className="list-group-item d-flex  justify-content-between align-items-center"
          key={item.id}
        >
          <div>{item.title}</div>
          <div className="btn-group" role="group">
            <button
              type="button"
              className="btn btn-primary"
              disabled={!isLoggedIn}
              onClick={() => dispatch(readBook(item))}
            >
              Read
            </button>
            <button
              type="button"
              className="btn btn-danger"
              disabled={!isLoggedIn}
              onClick={() => dispatch(deleteSlice(item.id))}
            >
              Delete
            </button>
          </div>
        </li>
      ))
    : "there is no book list available";
  return (
    <div>
      <h2>Books List</h2>

      {isLoading ? (
        <b>is loading...........</b>
      ) : (
        <>
          <ul className="list-group">{bookListContainer}</ul>
        </>
      )}
    </div>
  );
};

export default BooksList;
