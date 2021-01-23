// @flow
import React, { useState } from "react";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
import { database } from "../server/firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../store/modules/login";
import Button from "../components/Button";

const DocumentNew = () => {
  const user = useSelector(selectUser);

  const [documentId, setDocumentId] = useState(null);

  const onAddNewDocumentHandler = async () => {
    const currentDate = Date.now();

    // Default document meta data
    const DOCUMENT_DATA = {
      title: "No Title",
      wordCount: 0,
      createdAt: currentDate,
      updatedAt: currentDate
    };

    // Generate document meta with unique id from firestore
    const collectionRef = await database
      .collection("users")
      .doc(user.uid)
      .collection("meta")
      .doc();

    // Set example title for new document
    collectionRef
      .set(DOCUMENT_DATA)
      .then(function(docRef) {
        // console.log("Document written with ID: ", docRef);
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });

    setDocumentId(collectionRef.id);
  };

  if (documentId) {
    return <Redirect to={`/page/${documentId}`} />;
  }

  return (
    <Wrapper>
      <Button clicked={onAddNewDocumentHandler}>Create new Document</Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 20px;
`;

export default DocumentNew;
