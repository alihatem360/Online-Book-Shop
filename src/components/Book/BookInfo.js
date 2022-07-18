import React, { Fragment, useState } from "react";
import Addform from "../AddForm";
const BookInfo = ({ bookInfo }) => {
  const [Edit, setEdit] = useState(false);

  const hanleEditBook = () => {
    setEdit(!Edit);
  };

  return (
    <Fragment>
      <h2>Book Details</h2>

      {Edit ? (
        <>
       <Addform bookInfo={bookInfo} Edit={Edit}  setEdit={setEdit}/>
        </>
      ) : (
        <>
          {Object.keys(bookInfo).length > 0 ? (
            <div key={bookInfo.id}>
              <p className="fw-bold">Title: {bookInfo.title} </p>
              <p className="fw-light">Description: {bookInfo.description}</p>
              <p className="fst-italic">Price: {bookInfo.price}</p>
              <button className="btn btn-primary" onClick={hanleEditBook}>
                Edit
              </button>
            </div>
          ) : (
            <div className="alert alert-secondary" role="alert">
              <b> There is no book selected yet. Please select!</b>
            </div>
          )}
        </>
      )}
    </Fragment>
  );
};

export default BookInfo;
