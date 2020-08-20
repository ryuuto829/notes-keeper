// @flow
import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import TextareaAutosize from "react-textarea-autosize";

import { updateContent, addItem } from "../../store/modules/document";

const Editor = ({ text, setText, closeEditor, id }) => {
  const dispatch = useDispatch();
  const editorRef = useRef();

  useEffect(() => {
    const onPressEnterHandler = e => {
      // On 'Enter' save changes, close editor, add new item below
      if (e.keyCode === 13) {
        closeEditor(false);
        dispatch(updateContent({ id: id, text: text }));
        dispatch(addItem({ parentId: id }));
      }

      // on 'Esc' save changes and close editor
      if (e.keyCode === 27) {
        closeEditor(false);
        dispatch(updateContent({ id: id, text: text }));
      }
    };

    // Global event listeners

    document.addEventListener("keydown", onPressEnterHandler, false);

    return () => {
      document.removeEventListener("keydown", onPressEnterHandler, false);
    };
  }, [closeEditor, dispatch, id, text]);

  return (
    <TextField
      ref={editorRef}
      value={text}
      onChange={e => setText(e.currentTarget.value)}
    ></TextField>
  );
};

const TextField = styled(TextareaAutosize)`
  width: 100%;
  overflow: hidden;
  border: 0;
  padding: 0;
`;

export default Editor;
