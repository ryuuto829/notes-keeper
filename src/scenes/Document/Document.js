// @flow
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectDocumentCollection,
  selectDocumentId,
  selectDocumentTitle
} from "../../store/modules/document";
import { initializingSuccess, selectDocument } from "../../store/modules/ui";
import { database } from "../../server/firebase";
import { selectUser } from "../../store/modules/login";

import Scrollable from "../../components/Scrollable";
import PageTitle from "../../components/PageTitle";
import HelpPopover from "../../components/HelpPopover";
import ListItem from "./components/ListItem";
import Header from "./Header";
import NotFound from "./components/NotFound";

const Document = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  // const documentId = useSelector(selectDocumentId);
  // const title = useSelector(selectDocumentTitle);
  const title = null;
  // const collection = useSelector(selectDocumentCollection);
  const collection = null;
  const document = useSelector(selectDocument);
  const user = useSelector(selectUser);

  const [currentDocument, setCurrentDocument] = useState(null);

  useEffect(() => {
    let unsubscribe;
    try {
      // Fetch document from firestore
      unsubscribe = database
        .collection("users")
        .doc(user.uid)
        .collection("meta")
        .doc(id)
        .onSnapshot(function(doc) {
          const userData = doc.data();

          console.log("Current data: ", userData);

          setCurrentDocument(userData);
          dispatch(initializingSuccess({ document: userData }));
        });
    } catch (error) {
      console.log(error);
    }

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // if (id !== document.id) return <NotFound />;

  if (!currentDocument) {
    return <NotFound />;
  }

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
        <PageTitle title={title || "No Title"} />
        <Header />
        {/* $FlowFixMe we sure that document always has an entry point */}
        {collection ? renderList(collection[id].children) : null}
        <HelpPopover />
      </Wrapper>
    </Scrollable>
  );
};

const Wrapper = styled.main`
  padding: 0 20px 120px 20px;

  @media (max-width: 600px) {
    padding: 0 10px 120px 10px;
  }
`;

export default Document;
