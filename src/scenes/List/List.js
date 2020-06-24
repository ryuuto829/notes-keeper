import React from 'react';
import { connect } from 'react-redux';
import ListItem from './ListItem';

const List = ({ list, initialList }) => {

  const foo = (partList, fullList) => {
    return partList.map(itemID => {
      const currentItem = fullList[itemID];
      let currentChildrens = null;

      if (currentItem.children) {
        currentChildrens = foo(currentItem.children, fullList);
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
  }

  const renderedList = foo(initialList, list);

  return (
    <ul>
      {renderedList}
    </ul>
  );
};

const mapStateToProps = (state) => {
  return {
    initialList: state.document.initialIDList,
    list: state.document.listByID
  }
}

export default connect(mapStateToProps)(List);