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
import shortId from "../../utils/shortID";

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

  const [inputText, setInputText] = useState(text);

  const onPressEnterHandler = useCallback(
    e => {
      const currentCursorPostion = e.target.selectionStart;
      const currentCursorEnd = e.target.selectionEnd;
      const inputLength = inputText.length;
      const isBlockEnd = inputLength === currentCursorEnd;
      const isBlockStart = currentCursorPostion === 0 && currentCursorEnd === 0;

      // On 'Enter'
      if (e.keyCode === 13) {
        e.preventDefault();

        if (inputLength !== 0) {
          dispatch(updateContent({ currentId: id, text: inputText }));

          // current item is not empty -> create new item
          if (isBlockEnd) {
            dispatch(addItem({ currentId: id, newItemId: shortId() }));
          } else {
            dispatch(
              splitItem({
                currentId: id,
                newItemId: shortId(),
                splitAt: currentCursorPostion
              })
            );

            setInputText(
              inputText.substring(currentCursorPostion, inputText.length)
            );
          }
        } else {
          dispatch(updateContent({ currentId: id, text: inputText }));
          // currrent item is empty -> change its position
          if (level > 1) {
            dispatch(moveUp({ currentId: id }));
          }
        }
      }

      // On 'Esc'
      if (e.keyCode === 27) {
        dispatch(updateContent({ currentId: id, text: inputText }));
        dispatch(removeEditable());
      }

      // On 'Backspace'
      if (e.keyCode === 8) {
        if (isBlockStart) {
          dispatch(updateContent({ currentId: id, text: inputText }));
          dispatch(mergeItem({ currentId: id }));
        }
      }

      // On 'Tab'
      if (e.keyCode === 9) {
        e.preventDefault();
        dispatch(updateContent({ currentId: id, text: inputText }));
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
  }, [onPressEnterHandler]);

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
