// @flow
import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  setEditable,
  selectDocumentEditable
} from "../../store/modules/document";
import { getSelectionOffsetRelativeTo } from "../../utils/cursorPersistent";

import Editor from "./Editor";
import Contents from "./components/Contents";

type Props = {
  text: string,
  id: string
};

const Content = (props: Props) => {
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
    <>
      {/* We need additional wrapper to get global cursor position */}
      <Container ref={parentWrapper} onClick={onClickHandler}>
        {text && <Contents text={text} />}
      </Container>
    </>
  );
};

const Container = styled.div`
  display: block;
  vertical-align: bottom;
  line-height: 1.5em;
  min-height: 20px;
  width: 100%;
  padding: 4px 0;
  white-space: pre-wrap;
  overflow-wrap: break-word;
`;

export default Content;
