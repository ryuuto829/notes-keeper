// @flow
import React, { useState, useRef } from "react";
import ReactMarkdown from "react-markdown/with-html";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  setEditable,
  selectDocumentEditable
} from "../../store/modules/document";
import { getSelectionOffsetRelativeTo } from "../../utils/cursorPersistent";
import styled from "styled-components";

import Editor from "./Editor";

// Select text like [[Text]]
const REGEX = /\[\[.*?\]\]/g;

// Replace [[Text]] with link for 'Text' page
const highlightPattern = (text, pattern) => {
  const splitText = text.split(pattern);

  if (splitText.length <= 1) {
    return (
      <ReactMarkdown
        source={text}
        unwrapDisallowed={true}
        allowedTypes={[
          "paragraph",
          "image",
          "strong",
          "blockquote",
          "link",
          "emphasis",
          "text"
        ]}
        renderers={{
          paragraph: React.Fragment,
          image: props => <StyledImage {...props} />
        }}
      />
    );
  }

  const matches = text.match(pattern);

  return splitText.reduce(
    (arr, element, index) =>
      matches[index]
        ? [
            ...arr,
            <ReactMarkdown
              key={index + "first"}
              source={element}
              renderers={{
                paragraph: React.Fragment
              }}
            />,
            <React.Fragment key={index}>
              <span style={{ color: "yellow" }}>[[</span>
              <Link to="/">
                {matches[index].replace("[[", "").replace("]]", "")}
              </Link>
              <span style={{ color: "yellow" }}>]]</span>
            </React.Fragment>
          ]
        : [
            ...arr,
            <ReactMarkdown
              key={index + "last"}
              source={element}
              renderers={{ paragraph: React.Fragment }}
            />
          ],
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

  const onClickHandler = e => {
    // Remember cursor position to set focus on textarea
    if (e.target.nodeName !== "IMG") {
      const position = getSelectionOffsetRelativeTo(parentWrapper.current);
      setCursorPosition(position);
    }

    dispatch(setEditable({ id: id }));
  };

  return (
    <div
      ref={parentWrapper}
      onClick={onClickHandler}
      style={{
        verticalAlign: "bottom",
        lineHeight: "1.3",
        display: "block",
        minHeight: "20px"
      }}
    >
      {text && highlightPattern(text, REGEX)}
    </div>
  );
};

const StyledImage = styled.img`
  max-width: 100%;
`;

export default Content;
