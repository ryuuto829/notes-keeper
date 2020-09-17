// @flow
import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
// import { selectDocumentTitle } from "../../store/modules/document";
import { selectDocumentTitle } from "../../store/modules/ui";

const Header = () => {
  // const title = useSelector(selectDocumentTitle);
  const title = useSelector(selectDocumentTitle);
  // const [titleEditable, setTitleEditable] = useState(false);
  // const [inputText, setInputText] = useState(title);

  return <Title>{title || "No Title"}</Title>;
};

const Title = styled.h1`
  margin: 20px 0;
  font-weight: 300;
  font-size: 26px;
`;

export default Header;
