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

type Props = {
  text: string,
  id: string,
  hasChildren?: boolean,
  level?: number,
  cursorPosition?: number
};

const Editor = ({ text, id, hasChildren, level, cursorPosition }: Props) => {
  const dispatch = useDispatch();
  const editorRef = useRef();

  const [inputText, setInputText] = useState(text);

  const onPressHandler = useCallback(
    (e: KeyboardEvent) => {
      // $FlowFixMe listeners add native event, but not synthetic
      const currentCursorPostion = e.target.selectionStart;
      // $FlowFixMe listeners add native event, but not synthetic
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
          if (level && level > 1) {
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
    // $FlowFixMe listeners add native event, but not synthetic
    document.addEventListener("keydown", onPressHandler, false);

    return () => {
      document.removeEventListener("keydown", onPressHandler, false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onPressHandler]);

  // Receive cursor position as a prop, then set focus on textarea
  // and move cursor to given position
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.focus();
      editorRef.current.selectionStart = cursorPosition;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editorRef]);

  return (
    <TextField
      // $FlowFixMe
      ref={editorRef}
      value={inputText}
      onChange={e => setInputText(e.currentTarget.value)}
      onBlur={() => {
        dispatch(updateContent({ currentId: id, text: inputText }));
        dispatch(removeEditable());
      }}
    />
  );
};

const TextField = styled(TextareaAutosize)`
  overflow: hidden;
  border: 0;
  outline: 0;
  margin: 0;
  font: inherit;
  background-color: initial;
  color: inherit;
  resize: none;
  display: block;
  vertical-align: bottom;
  line-height: 1.5em;
  min-height: 20px;
  width: 100%;
  padding: 4px 0;
  white-space: pre-wrap;
  overflow-wrap: break-word;
`;

export default Editor;
