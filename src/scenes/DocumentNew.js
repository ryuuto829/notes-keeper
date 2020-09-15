// @flow
import React from "react";
import { database } from "../server/firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../store/modules/login";

const DocumentNew = () => {
  const user = useSelector(selectUser);

  const onAddNewDocumentHandler = async () => {
    console.log("[DocumentNew] start creation");
    const currentDate = new Date();

    const DOCUMENT_DATA = {
      title: "No Title",
      wordCount: 0,
      createdAt: currentDate,
      updatedAt: currentDate
    };

    let count = 0;
    if (count < 1) {
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
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });

      await console.log(collectionRef);

      count++;
    }
    console.log("[DocumentNew] end creation");
  };

  return <button onClick={onAddNewDocumentHandler}>Create new Document</button>;
};

export default DocumentNew;
