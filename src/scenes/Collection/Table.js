// @flow
import React from "react";
import styled from "styled-components";
import { useTable, useSortBy } from "react-table";
import { Link } from "react-router-dom";

import LeftArrow from "../../shared/icons/LeftArrow";
import StyledTable, { TableHeader } from "./components/StyledTable";

const Table = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable(
    {
      columns,
      data,
      autoResetSortBy: false // We're not reseting sorting after changing data
    },
    useSortBy
  );

  // We don't want to render all 2000 rows for this example, so cap
  // it at 20 for this use case
  const firstPageRows = rows.slice(0, 20);

  return (
    <>
      <StyledTable {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                // Add the sorting props to control sorting
                <TableHeader
                  isSorted={column.isSorted}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render("Header")}
                  {/* Add a sort direction indicator */}
                  {column.id !== "selection" ? (
                    <>
                      <TopArrow
                        fill={
                          column.isSorted && column.isSortedDesc
                            ? "#dcddde"
                            : "#8e9297"
                        }
                        size={16}
                      />
                      <BottomArrow
                        fill={
                          column.isSorted && !column.isSortedDesc
                            ? "#dcddde"
                            : "#8e9297"
                        }
                        size={16}
                      />
                    </>
                  ) : null}
                </TableHeader>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {firstPageRows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>
                      {cell.column.id === "title" ? (
                        <StyledLink to="/">{cell.render("Cell")}</StyledLink>
                      ) : (
                        cell.render("Cell")
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </StyledTable>
    </>
  );
};

const TopArrow = styled(LeftArrow)`
  transform: rotate(90deg);
`;
const BottomArrow = styled(LeftArrow)`
  transform: rotate(270deg);
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

export default Table;
