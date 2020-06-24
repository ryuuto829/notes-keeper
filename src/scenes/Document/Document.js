import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import ListItem from './components/List/ListItem';
import ListContainer from './components/List/ListContainer';

const createListItem = (partList, fullList) => {
  const items = partList.map(itemID => {
    const currentItem = fullList[itemID];
    const itemHasChildren = currentItem.children !== null ? true : false;

    let childrenItems = null;

    if (itemHasChildren) {
      childrenItems = createList(currentItem.children, fullList);
    }

    return (
      <ListItem
        key={itemID}
        id={itemID}
        hasChildren={itemHasChildren}
        content={currentItem.text}>
        {childrenItems}
      </ListItem>
    );
  });
  return items;
};

const createList = (partList, fullList) => (
  <ListContainer>
    {createListItem(partList, fullList)}
  </ListContainer>
);

const Document = ({ initialIDList, listByID }) => {
  const documentList = createList(initialIDList, listByID);

  return (
    <StyledWrapper>
      {documentList}
    </StyledWrapper >
  );
};

const StyledWrapper = styled.div`
  background-color: #36393f;
  max-width: 500px;
  margin: 20px auto;
`;

const mapStateToProps = state => ({
  initialIDList: state.document.initialIDList,
  listByID: state.document.listByID
});

export default connect(mapStateToProps)(Document);