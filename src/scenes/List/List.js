import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ListItem from './ListItem';

/** Render all item from the redux store List */
const createList = (partList, fullList) => {
  return partList.map(itemID => {
    const currentItem = fullList[itemID];
    let currentChildrens = null;

    if (currentItem.children) {
      currentChildrens = createList(currentItem.children, fullList);
    }
    return (
      <ListItem
        key={itemID}
        id={itemID}
        content={currentItem.text} >
        {currentChildrens}
      </ListItem >
    );
  });
};

const List = ({ list, initialList }) => (
  <ul>
    {createList(initialList, list)}
  </ul>
);

const mapStateToProps = (state) => {
  return {
    initialList: state.document.initialIDList,
    list: state.document.listByID
  }
};

List.propTypes = {
  list: PropTypes.objectOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    parent: PropTypes.string,
    children: PropTypes.arrayOf(PropTypes.string)
  })).isRequired,
  initialList: PropTypes.array.isRequired
};

export default connect(mapStateToProps)(List);
