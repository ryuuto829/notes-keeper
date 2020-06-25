import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ListItem from './ListItem';

/** Render all item from the redux store List */
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
        isEditable={editableID === itemID}
        key={itemID}
        id={itemID}
        content={currentItem.text} >
        {currentChildrens}
      </ListItem >
    );
  });
};

const List = ({ list, initialList, editableID }) => (
  <ul>
    {createList(initialList, list, editableID)}
  </ul>
);

const mapStateToProps = (state) => ({
  initialList: state.document.initialIDList,
  list: state.document.listByID,
  editableID: state.document.isEditable
});

List.propTypes = {
  list: PropTypes.objectOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    parent: PropTypes.string,
    children: PropTypes.arrayOf(PropTypes.string)
  })).isRequired,
  initialList: PropTypes.array.isRequired
};

export default connect(mapStateToProps)(List);
