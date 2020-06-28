import styled from 'styled-components';

export const StyledListContainer = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  font-size: 0.9rem;
  background-color: #36393f;
  color: #dcddde;
`;

export const StyledContentContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  position: relative;

  &:hover {
    background-color: rgba(4, 4, 5, 0.07);
  }

  &:hover div:last-of-type {
    display: flex;
  }
`;

export const StyledListContent = styled.div`
  padding-left: 5px;
  line-height: 1.4;
`;