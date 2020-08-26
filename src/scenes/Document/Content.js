// @flow
import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  setEditable,
  selectDocumentEditable
} from "../../store/modules/document";
import { getSelectionOffsetRelativeTo } from "../../utils/cursorPersistent";

import Editor from "./Editor";

// Select text like [[Text]]
const REGEX = /\[\[.*?\]\]/g;

// Replace [[Text]] with link for 'Text' page
const highlightPattern = (text, pattern) => {
  const splitText = text.split(pattern);

  if (splitText.length <= 1) return text;

  const matches = text.match(pattern);

  return splitText.reduce(
    (arr, element, index) =>
      matches[index]
        ? [
            ...arr,
            element,
            <React.Fragment key={index}>
              <span style={{ color: "yellow" }}>[[</span>
              <Link to="/">
                {matches[index].replace("[[", "").replace("]]", "")}
              </Link>
              <span style={{ color: "yellow" }}>]]</span>
            </React.Fragment>
          ]
        : [...arr, element],
    []
  );
};

const Content = props => {
  const { text, id } = props;

  const dispatch = useDispatch();
  const parentWrapper = useRef();
  const isEditable = useSelector(selectDocumentEditable) === id;

  const [cursorPosition, setCursorPosition] = useState(0);

  if (isEditable) {
    return <Editor {...props} cursorPosition={cursorPosition} />;
  }

  const onClickHandler = () => {
    // Remember cursor position to set focus on textarea
    const position = getSelectionOffsetRelativeTo(parentWrapper.current);
    setCursorPosition(position);

    dispatch(setEditable({ id: id }));
  };

  return (
    <>
      {/* We need additional parent wrapper for receiving global <div>
      cursor position instead of local <span> */}
      <div ref={parentWrapper}>
        <span
          style={{
            verticalAlign: "bottom",
            lineHeight: "1.3",
            display: "block",
            minHeight: "20px"
          }}
          onClick={onClickHandler}
        >
          {highlightPattern(text, REGEX)}
        </span>
      </div>
    </>
  );
};

export default Content;
