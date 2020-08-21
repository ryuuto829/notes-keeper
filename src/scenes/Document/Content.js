// @flow
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  setEditable,
  selectDocumentEditable
} from "../../store/modules/document";
import Editor from "./Editor";

const Content = ({ text, id }) => {
  const dispatch = useDispatch();
  const isEditable = useSelector(selectDocumentEditable) === id;

  if (isEditable) {
    return <Editor id={id} defaultText={text} />;
  }

  return <span onClick={() => dispatch(setEditable({ id: id }))}>{text}</span>;
};

export default Content;
