import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import ListItem from './components/List/ListItem';
import ListContainer from './components/List/ListContainer';
import Input from './components/Input';

const StyledWrapper = styled.div`
  background-color: #36393f;
  max-width: 500px;
  margin: 20px auto;
`;

const Document = ({ headList, listByID }) => {

  const createList = (list, allList) => {

    return list.map(itemID => {
      const currentItem = allList[itemID];
      let child = null;

      if (currentItem.hasChildren) {
        child = createList(currentItem.children, allList);
      }

      return (
        <ListContainer key={itemID}>
          <ListItem
            hasChildren={currentItem.hasChildren}
            content={currentItem.text}>
            {child}
          </ListItem>
        </ListContainer>
      );
    });
  };

  const documentList = createList(headList, listByID);

  return (
    <StyledWrapper>
      <Input />
      {documentList}
    </StyledWrapper >
  );
};

const mapStateToProps = state => ({
  headList: state.document.headIDList,
  listByID: state.document.listByID
});

export default connect(mapStateToProps)(Document);