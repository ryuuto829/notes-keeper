// @flow
import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { selectDocumentTitle, updateTitle } from "../../store/modules/document";

import Editor from "./Editor";

const Header = ({ id }) => {
  const dispatch = useDispatch();
  const title = useSelector(selectDocumentTitle);
  const [titleEditable, setTitleEditable] = useState(false);
  const [inputText, setInputText] = useState(title);

  const submitInputHandler = e => {
    e.preventDefault();
    setTitleEditable(false);
    dispatch(updateTitle({ title: inputText }));
  };

  if (titleEditable) {
    // return (
    //   <form onSubmit={submitInputHandler}>
    //     <input
    //       type="text"
    //       value={inputText}
    //       onChange={e => setInputText(e.currentTarget.value)}
    //     />
    //   </form>
    // );
    return <Editor id={id} text={inputText} setText={setInputText} />;
  }

  return <Title onClick={() => setTitleEditable(true)}>{title}</Title>;
};

const Title = styled.h1`
  margin: 20px 0;
  font-weight: 300;
  font-size: 26px;
`;

const TextField = styled.input`
  border: 0;
  outline: 0;
`;

export default Header;
