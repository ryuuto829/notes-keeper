// @flow
import styled from "styled-components";

const TextButton = styled.button`
  display: inline-block;
  margin-left: 4px;
  color: #7289da;
  font-size: inherit;
  padding: 0;
  width: auto;
  height: auto;
  outline: 0;
  border: none;
  background-color: transparent;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

export default TextButton;
