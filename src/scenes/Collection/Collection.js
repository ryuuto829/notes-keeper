// @flow
import React from "react";
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

import StyledTable from "./components/StyledTable";
import Table from "./Table";
import Checkbox from "./components/Checkbox";

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
  const data = React.useMemo(() => renderData(pages, selected, dispatch), [
    dispatch,
    pages,
    selected
  ]);

  const columns = React.useMemo(
    () => [
      {
        Header: (
          <Checkbox
            isChecked={selectedAll}
            onChecked={() =>
              selectedAll
                ? dispatch(removeSelectedAll())
                : dispatch(addSelectedAll())
            }
          />
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
    [dispatch, selectedAll]
  );

  return (
    <StyledTable>
      <Table columns={columns} data={data} />
    </StyledTable>
  );
}

export default Collection;
