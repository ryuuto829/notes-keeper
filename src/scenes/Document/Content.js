// @flow
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  setEditable,
  selectDocumentEditable
} from "../../store/modules/document";
import Editor from "./Editor";

const Content = props => {
  const { text, id } = props;
  const dispatch = useDispatch();
  const isEditable = useSelector(selectDocumentEditable) === id;

  if (isEditable) {
    return <Editor {...props} />;
  }

  return <span onClick={() => dispatch(setEditable({ id: id }))}>{text}</span>;
};

export default Content;
