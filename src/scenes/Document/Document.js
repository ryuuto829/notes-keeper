// @flow
import React from "react";
import styled from "styled-components";
// import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutRequest } from "../../store/modules/login"; // DELETE LATER
import {
  selectDocumentChildren,
  selectDocumentCollection
} from "../../store/modules/document";

import Content from "./Content";
import Header from "./Header";

const Document = () => {
  // const { id } = useParams();
  const dispatch = useDispatch();
  const content = useSelector(selectDocumentChildren);
  const collection = useSelector(selectDocumentCollection);

  const renderList = (list, parentId = null) => {
    return list.map(id => {
      const { content, children } = collection[id];
      return (
        <Container key={id}>
          <Content
            text={content}
            id={id}
            parentId={parentId}
            hasChildren={!!children}
          />
          {children && renderList(children, id)}
        </Container>
      );
    });
  };

  return (
    <main>
      <Header id={collection.id} />
      <div>{renderList(collection["id1"].children)}</div>
      {/*  */}
      <hr />
      <button onClick={() => dispatch(logoutRequest())}>Log out</button>
    </main>
  );
};

const Container = styled.div`
  margin-left: 40px;
  font-size: 14px;
`;

export default Document;
