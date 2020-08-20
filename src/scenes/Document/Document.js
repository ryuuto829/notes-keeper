// @flow
import React from "react";
import styled from "styled-components";
// import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutRequest } from "../../store/modules/login"; // DELETE LATER
import {
  selectDocumentTitle,
  selectDocumentChildren,
  selectDocumentCollection
} from "../../store/modules/document";

import Content from "./Content";

const Document = () => {
  // const { id } = useParams();
  const dispatch = useDispatch();
  const title = useSelector(selectDocumentTitle);
  const content = useSelector(selectDocumentChildren);
  const collection = useSelector(selectDocumentCollection);

  const renderList = list => {
    return list.map(id => {
      const { content, children } = collection[id];
      return (
        <Container key={id}>
          <Content text={content} id={id} />
          {children && renderList(children)}
        </Container>
      );
    });
  };

  return (
    <main>
      <h1>{title}</h1>
      <div>{renderList(content)}</div>
      {/*  */}
      <hr />
      <button onClick={() => dispatch(logoutRequest())}>Log out</button>
    </main>
  );
};

const Container = styled.div`
  margin-left: 40px;
`;

export default Document;
