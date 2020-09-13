import styled from "styled-components";

export const StyledTable = styled.table`
  font-size: 12px;
  width: 100%;
  border-spacing: 0;
  border-bottom: thin solid hsl(0deg 0% 100% / 6%);
  min-width: 610px;
  margin: 0 auto;
  text-align: center;
  position: relative;

  tr {
    :last-child {
      td {
        border-bottom: 0;
      }
    }

    &:hover {
      background-color: rgb(0 0 0 / 10%);
    }
  }

  th,
  td {
    min-width: 140px;
    margin: 0;
    padding: 0.5rem;
    border-bottom: thin solid hsl(0deg 0% 100% / 6%);

    &:first-child {
      min-width: 50px;
    }

    &:nth-child(2) {
      text-align: left;
    }
  }

  td {
    &:nth-child(2) {
      font-size: 14px;
      cursor: pointer;
      max-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
`;

export const TableHeader = styled.th`
  user-select: none;
  background-color: #2f3136;
  color: ${props => (props.isSorted ? "#dcddde" : "#8e9297")};
`;

export default StyledTable;
