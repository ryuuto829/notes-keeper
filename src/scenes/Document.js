import React from 'react';
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { selectDocumentById } from '../store/reducers/document';
import { logout } from '../store/reducers/auth';

const Document = () => {
  const { id } = useParams();
  const pages = useSelector(selectDocumentById);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>My Main Page Title</h1>
      <div>Current page has id = " {id} "</div>
      {/* <div>{pages[id].text || 'HOME PAGE'}</div> */}
      <button onClick={() => dispatch(logout())}>Log out</button>
    </div>
  );
};

export default Document;
