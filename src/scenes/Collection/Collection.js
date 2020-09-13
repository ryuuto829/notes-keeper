// @flow
import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {
  selectPages,
  selectSelectedPages,
  selectSelectAll,
  addSelection,
  removeSelection,
  addSelectedAll,
  removeSelectedAll
} from "../../store/modules/collection";

import Table from "./Table";
import Checkbox from "./components/Checkbox";
import PageTitle from "../../components/PageTitle";
import Scrollable from "../../components/Scrollable";
import Tooltip from "../../components/Tooltip";

// Render a row
const renderData = (
  data: Object<any>,
  selected: Array<any>,
  dispatch
): Array<any> => {
  return Object.keys(data).map(id => {
    const { title, wordCount, updated, created } = data[id];
    const isChecked = selected.includes(id);

    // Add or remove id from selected pages
    const onChangeHandler = () => {
      if (isChecked) {
        dispatch(removeSelection({ id: id }));
        return;
      }
      dispatch(addSelection({ id: id }));
    };

    return {
      selection: <Checkbox isChecked={isChecked} onChecked={onChangeHandler} />,
      title: title,
      wordCount: wordCount,
      updated: updated,
      created: created
    };
  });
};

function Collection() {
  const dispatch = useDispatch();
  const pages = useSelector(selectPages);
  const selected = useSelector(selectSelectedPages);
  const selectedAll = useSelector(selectSelectAll);
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

export default Collection;
