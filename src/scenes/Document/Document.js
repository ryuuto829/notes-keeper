// @flow
import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectDocumentCollection } from "../../store/modules/document";

import ListItem from "./ListItem";
import Header from "./Header";
import Scrollable from "../../components/Scrollable";

const Document = () => {
  const { id } = useParams();
  const collection = useSelector(selectDocumentCollection);

  const renderList = (list: Array<string>) => {
    return list.map(id => {
      const { content, children, level } = collection[id];
      return (
        <ListItem key={id} id={id} level={level} content={content}>
          {children && renderList(children, id)}
        </ListItem>
      );
    });
  };

  return (
    <Scrollable>
      <Wrapper>
        <Header id={collection.id} />
        {renderList(collection[id].children)}
      </Wrapper>
    </Scrollable>
  );
};

const Wrapper = styled.main`
  padding: 0 20px;
  padding-bottom: 120px;

  @media (max-width: 600px) {
    padding: 0 10px;
  }
`;

export default Document;
