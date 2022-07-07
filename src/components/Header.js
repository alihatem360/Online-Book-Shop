import React, { Fragment } from "react";
import { useSelector, useState } from "react-redux";
import { useDispatch } from "react-redux";
import { loggedOut } from "../Store/authSlice";
const Header = () => {
  const dispatch = useDispatch();

  const { error } = useSelector((state) => state.book);
  const { isLoggedIn } = useSelector((state) => state.auths);

  return (
    <>
      {error && (
        <div class="alert alert-danger  m-0" role="alert">
          {error}
        </div>
      )}

      <nav className="navbar navbar-dark bg-dark">
        <span className="navbar-brand mb-0 h1">My Books</span>

        <button
          className="btn btn-outline-primary"
          type="submit"
          onClick={() => dispatch(loggedOut())}
        >
          {isLoggedIn ? " Log Out" : " Log In"}
        </button>
      </nav>
    </>
  );
};

export default Header;
