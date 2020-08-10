import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutRequest } from "../store/modules/login";

const Document = () => {
  const { id } = useParams();
  // const pages = useSelector(selectDocumentById);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>My Main Page Title</h1>
      <div>Current page has id = " {id} "</div>
      <button onClick={() => dispatch(logoutRequest())}>Log out</button>
    </div>
  );
};

export default Document;
