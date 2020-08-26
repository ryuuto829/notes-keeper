// @flow
import React, { useRef, useEffect, useCallback, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import TextareaAutosize from "react-textarea-autosize";
import {
  removeEditable,
  addItem,
  moveUp,
  moveDown,
  mergeItem,
  splitItem,
  updateContent
} from "../../store/modules/document";
import { v1 as uuidv4 } from "uuid";

const Editor = ({
  text,
  id,
  className,
  hasChildren,
  level,
  cursorPosition
}) => {
  const dispatch = useDispatch();
  const editorRef = useRef(null);
  const updatedText = useRef();

  const [inputText, setInputText] = useState(text);

  // Store the latest version of the store 'inputText'
  useEffect(
    () => () => {
      updatedText.current = inputText;
    },
    [inputText]
  );

  // On component unmount we save changes in content to the store,
  // we can not dispatch 'inputTex', because it'll send the old (initial) state,
  // that's why we use 'useRef' to get access to the latest state value
  useEffect(() => {
    return () => {
      dispatch(updateContent({ currentId: id, text: updatedText.current }));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPressEnterHandler = useCallback(
    e => {
      const currentCursorPostion = e.target.selectionStart;
      const currentCursorEnd = e.target.selectionEnd;
      const inputLength = inputText.length;
      const isBlockEnd = inputLength === currentCursorPostion;

      // On 'Enter' save changes, close editor, add new item below
      if (e.keyCode === 13) {
        e.preventDefault();
        if (inputLength !== 0) {
          // current item is not empty -> create new item
          if (isBlockEnd) {
            dispatch(addItem({ currentId: id, newItemId: uuidv4() }));
          } else {
            dispatch(updateContent({ currentId: id, text: inputText }));
            dispatch(
              splitItem({
                currentId: id,
                newItemId: uuidv4(),
                splitAt: currentCursorPostion
              })
            );
            setInputText(
              inputText.substring(currentCursorPostion, inputText.length)
            );
          }
        } else {
          // currrent item is empty -> change its position
          if (level > 1) {
            dispatch(moveUp({ currentId: id }));
          }
        }
      }

      // On 'Esc' save changes and close editor
      if (e.keyCode === 27) {
        dispatch(removeEditable());
      }

      // On 'Backspace'
      if (e.keyCode === 8) {
        if (currentCursorPostion === 0 && currentCursorEnd === 0) {
          dispatch(updateContent({ currentId: id, text: inputText }));
          dispatch(mergeItem({ currentId: id }));
        }
      }

      // On 'Tab' raise item up
      if (e.keyCode === 9) {
        // Prevent losing focus
        e.preventDefault();

        dispatch(moveDown({ currentId: id }));
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [inputText]
  );

  useEffect(() => {
    // Setup global event listeners
    document.addEventListener("keydown", onPressEnterHandler, false);

    return () => {
      document.removeEventListener("keydown", onPressEnterHandler, false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Receive cursor position as a prop, then set focus on textarea
  // and move cursor to given position
  useEffect(() => {
    editorRef.current.focus();
    editorRef.current.selectionStart = cursorPosition;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TextField
      ref={editorRef}
      className={className}
      value={inputText}
      onChange={e => setInputText(e.currentTarget.value)}
    />
  );
};

const TextField = styled(TextareaAutosize)`
  width: 100%;
  overflow: hidden;
  border: 0;
  outline: 0;
  padding: 0;
  margin: 0;
  line-height: 20px;
  font: inherit;
  background-color: grey;
  color: inherit;
  resize: none;
  line-height: 1.3;
  vertical-align: bottom;
`;

export default Editor;
