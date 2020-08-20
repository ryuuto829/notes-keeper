// @flow
import React, { useState } from "react";
import Editor from "./Editor";

const Content = ({ text, id }) => {
  const [showEditor, setShowEditor] = useState(false);
  const [inputText, setInputText] = useState(text);

  if (showEditor) {
    return (
      <Editor
        id={id}
        text={inputText}
        setText={setInputText}
        closeEditor={setShowEditor}
      />
    );
  }

  return <span onClick={() => setShowEditor(!showEditor)}>{inputText}</span>;
};

export default Content;
