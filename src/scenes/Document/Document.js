// @flow
import React from "react";
import styled from "styled-components";
// import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDocumentChildren,
  selectDocumentCollection
} from "../../store/modules/document";

import Content from "./Content";
import Header from "./Header";
import Scrollable from "../../components/Scrollable";

const Document = () => {
  // const { id } = useParams();
  // const dispatch = useDispatch();
  const collection = useSelector(selectDocumentCollection);

  const renderList = list => {
    return list.map(id => {
      const { content, children, level } = collection[id];
      return (
        <Container key={id}>
          <Content
            text={content}
            id={id}
            level={level}
            hasChildren={!!children}
          />
          {children && renderList(children, id)}
        </Container>
      );
    });
  };

  return (
    <Scrollable>
      <Wrapper>
        <Header id={collection.id} />
        <div>{renderList(collection["id1"].children)}</div>
      </Wrapper>
    </Scrollable>
  );
};

const Container = styled.div`
  margin-left: 40px;
  font-size: 14px;
  min-height: 20px;
`;

const Wrapper = styled.main`
  padding: 0 20px;
`;

export default Document;
