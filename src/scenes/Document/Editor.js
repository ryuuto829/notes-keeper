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
  splitItem
} from "../../store/modules/document";

// import { updateContent, addItem, addChild } from "../../store/modules/document";

const Editor = ({ text, id, className, parentId, hasChildren }) => {
  const dispatch = useDispatch();
  const editorRef = useRef();

  const [inputText, setInputText] = useState(text);

  const onPressEnterHandler = useCallback(
    e => {
      const currentCursorPostion = e.target.selectionStart;
      const inputLength = inputText.length;
      const isBlockEnd = inputLength === currentCursorPostion;

      // On 'Enter' save changes, close editor, add new item below
      if (e.keyCode === 13) {
        if (inputLength !== 0) {
          // current item is not empty -> create new item
          if (isBlockEnd) {
            dispatch(
              addItem({
                currentId: id
              })
            );
          } else {
            dispatch(
              splitItem({
                currentId: id,
                splitAt: currentCursorPostion
              })
            );
          }
        } else {
          // currrent item is empty -> change its position
          dispatch(
            moveUp({
              currentId: id
            })
          );
        }
      }

      // On 'Esc' save changes and close editor
      if (e.keyCode === 27) {
        dispatch(removeEditable({ id: id, text: inputText }));
      }

      // On 'Backspace'
      if (e.keyCode === 8) {
        if (currentCursorPostion === 0) {
          dispatch(mergeItem({ currentId: id }));
        }
      }

      // On 'Tab' raise item up
      if (e.keyCode === 9) {
        // Prevent losing focus
        e.preventDefault();

        dispatch(
          moveDown({
            currentId: id
          })
        );
      }
    },

    // Array of dependencies shoud be empty to setup global listeners
    // on useEffect only once to avoid re-redndering useEffect
    // on every keystroke, eslint thinks differently.

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [inputText]
  );

  useEffect(() => {
    // Global event listeners
    document.addEventListener("keydown", onPressEnterHandler, false);

    return () => {
      document.removeEventListener("keydown", onPressEnterHandler, false);
    };
  }, [onPressEnterHandler]);

  return (
    <TextField
      autoFocus
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
  padding: 0;
  line-height: 20px;
`;

export default Editor;
