// @flow
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { database } from "../server/firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../store/modules/login";

const DocumentNew = () => {
  const user = useSelector(selectUser);

  const [documentId, setDocumentId] = useState(null);

  const onAddNewDocumentHandler = async () => {
    const currentDate = Date.now();

    const DOCUMENT_DATA = {
      wordCount: 0,
      createdAt: currentDate,
      updatedAt: currentDate
    };

    // Generate document meta with unique id
    const collectionRef = await database
      .collection("users")
      .doc(user.uid)
      .collection("meta")
      .doc();

    // Set example title for new document
    await collectionRef
      .set(DOCUMENT_DATA)
      .then(function(docRef) {
        console.log("Document written with ID: ", docRef);
        setDocumentId(collectionRef.id);
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
  };

  if (documentId) {
    return <Redirect to={`/pages/${documentId}`} />;
  }

  return <button onClick={onAddNewDocumentHandler}>Create new Document</button>;
};

export default DocumentNew;
