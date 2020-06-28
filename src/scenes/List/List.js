import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { StyledListContainer } from './components/ListItems';
import ListItem from './ListItem';

/** Render all items from the redux store List */
const createList = (partList, fullList, editableID) => {
  return partList.map(itemID => {
    const currentItem = fullList[itemID];
    let currentChildrens = null;

    if (currentItem.children) {
      currentChildrens = createList(currentItem.children, fullList, editableID);
    }
    return (
      <ListItem
        key={itemID}
        id={itemID}
        isEditable={editableID === itemID}
        content={currentItem.text} >
        {currentChildrens}
      </ListItem >
    );
  });
};

const List = ({ list, initialList, editableID }) => {
  const listItems = createList(initialList, list, editableID);
  return (
    <StyledListContainer>
      {listItems}
    </StyledListContainer>
  );
};

const mapStateToProps = (state) => ({
  initialList: state.list.initialIDList,
  list: state.list.listByID,
  editableID: state.list.isEditable
});

List.propTypes = {
  list: PropTypes.objectOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    parent: PropTypes.string,
    children: PropTypes.arrayOf(PropTypes.string)
  })).isRequired,
  initialList: PropTypes.array.isRequired,
  editableID: PropTypes.string
};

export default connect(mapStateToProps)(List);
