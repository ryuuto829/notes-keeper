// @flow
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {
  selectPages,
  selectSelectedPages,
  selectSelectAll,
  addSelection,
  removeSelection,
  addSelectedAll,
  removeSelectedAll,
  updateList
} from "../../store/modules/collection";
import { selectUser } from "../../store/modules/login";
import { database } from "../../server/firebase";

import { Link } from "react-router-dom";

import Table from "./Table";
import Checkbox from "./components/Checkbox";
import PageTitle from "../../components/PageTitle";
import Scrollable from "../../components/Scrollable";
import NoDataFound from "./components/NoDataFound";
import Tooltip from "../../components/Tooltip";
import LoadingBar from "../../components/LoadingBar";

// Render a row in the table
const renderData = (
  data: Object<any>,
  selected: Array<any>,
  dispatch
): Array<any> => {
  if (!data) return null;

  // Add or remove id from selected pages
  const onChangeHandler = (id: string, isChecked: boolean) => {
    if (isChecked) {
      dispatch(removeSelection({ id: id }));
    } else {
      dispatch(addSelection({ id: id }));
    }
  };

  return Object.keys(data).map(id => {
    const { title, wordCount, updatedAt, createdAt } = data[id];
    const isChecked = selected.includes(id);

    return {
      selection: (
        <Checkbox
          isChecked={isChecked}
          onChecked={() => onChangeHandler(id, isChecked)}
        />
      ),
      title: (
        <StyledLink key={id} to={`page/${id}`}>
          {title || "No Title"}
        </StyledLink>
      ),
      wordCount: wordCount,
      updated: new Date(updatedAt).toLocaleDateString("en-GB"),
      created: new Date(createdAt).toLocaleDateString("en-GB")
    };
  });
};

function Collection() {
  const dispatch = useDispatch();
  const pages = useSelector(selectPages);
  const selected = useSelector(selectSelectedPages);
  const selectedAll = useSelector(selectSelectAll);
  const user = useSelector(selectUser);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const collectionData = {};

      await database
        .collection("users")
        .doc(user.uid)
        .collection("meta")
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            collectionData[doc.id] = { ...doc.data() };
          });
        });

      if (collectionData.length === 0) {
        setLoading(false);
      } else {
        dispatch(updateList({ list: collectionData }));
        setLoading(false);
      }
    };

    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const data = React.useMemo(
    () => renderData(pages, selected, dispatch),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selected, pages]
  );

  const columns = React.useMemo(
    () => [
      {
        Header: (
          <Tooltip
            content={selectedAll ? "Deselect All" : "Select All"}
            placement="right"
          >
            <Checkbox
              isChecked={selectedAll}
              onChecked={() =>
                selectedAll
                  ? dispatch(removeSelectedAll())
                  : dispatch(addSelectedAll())
              }
            />
          </Tooltip>
        ),
        accessor: "selection",
        disableSortBy: true
      },
      {
        Header: "TITLE",
        accessor: "title"
      },
      {
        Header: "WORD COUNT",
        accessor: "wordCount"
      },
      {
        Header: "UPDATED",
        accessor: "updated"
      },
      {
        Header: "CREATED",
        accessor: "created"
      }
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedAll]
  );

  if (loading) return <LoadingBar />;

  if (!data) return <NoDataFound />;

  return (
    <Scrollable horizontal>
      <Wrapper>
        <PageTitle title="Collection" />
        <Table columns={columns} data={data} />
      </Wrapper>
    </Scrollable>
  );
}

const Wrapper = styled.div`
  padding: 20px 20px 120px 20px;
  max-width: 1281px; /* DELETE LATER */
  margin: 0 auto; /* DELETE LATER */
`;

const StyledLink = styled(Link)`
  display: inline-block;
  text-decoration: none;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
  color: inherit;
`;

export default Collection;
