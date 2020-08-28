// @flow
import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectDocumentCollection,
  selectDocumentId,
  selectDocumentTitle
} from "../../store/modules/document";

import ListItem from "./components/ListItem";
import Header from "./Header";
import Scrollable from "../../components/Scrollable";
import PageTitle from "../../components/PageTitle";
import NotFound from "./components/NotFound";

const Document = () => {
  const { id } = useParams();
  const documentId = useSelector(selectDocumentId);
  const title = useSelector(selectDocumentTitle);
  const collection = useSelector(selectDocumentCollection);

  if (id !== documentId) return <NotFound />;

  const renderList = (list: ?Array<string>) => {
    if (!list) return null;
    return list.map(id => {
      const { content, children, level } = collection[id];
      return (
        <ListItem key={id} id={id} level={level} content={content}>
          {children && renderList(children)}
        </ListItem>
      );
    });
  };

  return (
    <Scrollable>
      <Wrapper>
        <PageTitle title={title} />
        <Header />
        {/* $FlowFixMe we sure that document always has an entry point */}
        {renderList(collection[id].children) || null}
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
