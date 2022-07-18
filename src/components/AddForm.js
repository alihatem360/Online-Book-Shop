import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { insertBook } from "../Store/bookSclice";
import { useSelector } from "react-redux";
import { useState } from "react";
import {editeBooks} from "../Store/bookSclice";

const Addform = ({ bookInfo, Edit , setEdit}) => {


  const { isLoggedIn } = useSelector((state) => state.auths);
  const dispatch = useDispatch();

  const [EditedBook, setEditedBook] = useState({
    id: Edit ? bookInfo.id : "",
    title: Edit ? bookInfo.title : "",
    price: Edit ? bookInfo.price : "",
    description: Edit ? bookInfo.description : "",
  });

  const handleChange = (inputeEle) => {
    const Key = inputeEle.target.id;
    const value = inputeEle.target.value;

    setEditedBook((prevState) => {
      return { ...prevState, [Key]: value };
    });
  };



  const title = useRef(null);
  const price = useRef(null);
  const description = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const bookData = {
      title: title.current.value,
      price: price.current.value,
      description: description.current.value,
    };

    dispatch( Edit ? editeBooks(EditedBook) :insertBook(bookData));
    setEdit(!Edit);
    
    title.current.value = null;
    price.current.value = null;
    description.current.value = null;
  };

  return (
    <div className="row">
      <div className="col-6 offset-3 mt-3">
        <h2>Insert Book</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              ref={title}
              value={EditedBook.title}
              onChange={handleChange}
              />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              className="form-control"
              id="price"
              required
              ref={price}
              value={EditedBook.price}
              onChange={handleChange}

            />
          </div>
          <div className="form-group">
            <label htmlFor="Description">Description</label>
            <textarea
              className="form-control"
              id="description"
              rows="3"
              required
              ref={description}
              value={EditedBook.description}
              onChange={handleChange}
            ></textarea>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!isLoggedIn}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addform;
