import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  toggleListEditable,
  removeListEditable,
  deleteListItem
} from '../../store/actions';

import ListItemContainer from './components/ListItemContainer';
import Input from './Input';
import BulletMarker from './components/BulletMarker';
import Popout from './components/Popout';

import {
  StyledContentContainer,
  StyledListContent
} from './components/ListItems';

const ListItem = ({ content, children, id, isEditable, toggleEditable, removeEditable, deleteItem }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [showSiblingInput, setShowSiblingInput] = useState(false);
  const [editItem, setEditItem] = useState(false);

  /** Setup listeners for global escape keydown */
  useEffect(() => {
    const escFunction = e => {
      if (e.code === 'Escape') {
        setShowInput(false);
        setShowSiblingInput(false);
        setEditItem(false);
        removeEditable();
      }
      if (e.code === 'Enter') {
        console.log('submit text to store')
      }
    };

    if (isEditable) {
      document.addEventListener("keydown", escFunction, false);
    }
    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, [isEditable]);

  const onMarkerClickHandler = () => {
    if (children) {
      setCollapsed(!collapsed);
    } else {
      if (!isEditable) {
        toggleEditable(id);
        setShowInput(true);
      } else {
        setShowInput(!showInput);
      }
      setEditItem(false);
      setShowSiblingInput(false);
    }
  };

  const onAddBtnClickHandler = () => {
    if (!isEditable) {
      toggleEditable(id);
    }
    if (children && !collapsed) {
      setShowInput(!showInput);
      setShowSiblingInput(false);
    } else {
      setShowSiblingInput(!showSiblingInput);
      setShowInput(false);
    }
    setEditItem(false);
  };

  const onEditBtnClickHandler = () => {
    if (!isEditable) {
      toggleEditable(id);
    }
    setEditItem(true);
    setShowInput(false);
    setShowSiblingInput(false);
  };

  const onDeleteBtnClickHandler = () => {
    deleteItem(id);
  };

  /** Add children Items */
  let childrenItems = null;
  if (children) {
    childrenItems = (
      <ListItemContainer
        hidden={collapsed}>
        {children}
      </ListItemContainer>
    );
  }

  /** Add nested input as a child */
  let nestedInput = null;
  if (showInput && !collapsed && isEditable) {
    nestedInput = (
      <ListItemContainer>
        <li>
          <Input
            closeInput={setShowInput}
            parentID={id}
            isChild={true} />
        </li>
      </ListItemContainer>
    );
  }

  /** Add sibling input as a sibling */
  let siblingInput = null;
  if (showSiblingInput && isEditable) {
    siblingInput = (
      <li>
        <Input
          closeInput={setShowSiblingInput}
          parentID={id}
          isChild={false} />
      </li>
    );
  }

  /** Show input when edit or content */
  let itemContent = (
    <StyledContentContainer>
      <BulletMarker
        hasChildren={children !== null}
        showedMarker={collapsed}
        clicked={onMarkerClickHandler} />
      {/* <button onClick={onMarkerClickHandler}>Marker</button> */}
      <StyledListContent>
        {content}
      </StyledListContent>
      <Popout
        added={onAddBtnClickHandler}
        edited={onEditBtnClickHandler}
        deleted={onDeleteBtnClickHandler} />
      {/* <button onClick={onAddBtnClickHandler}>Add</button>
      <button onClick={onEditBtnClickHandler}>Edit</button>
      <button onClick={onDeleteBtnClickHandler}>Delete</button> */}
    </StyledContentContainer>
  );

  if (editItem && isEditable) {
    itemContent = (
      <Input
        text={content}
        closeInput={setEditItem}
        parentID={id}
        isChild={false}
        isEdit={isEditable} />
    );
  }

  return (
    <React.Fragment>
      <li>
        {itemContent}
        {nestedInput}
        {childrenItems}
      </li>
      {siblingInput}
    </React.Fragment>
  );
};

const mapDispatchToProps = dispatch => ({
  toggleEditable: id => dispatch(toggleListEditable(id)),
  removeEditable: () => dispatch(removeListEditable()),
  deleteItem: id => dispatch(deleteListItem(id))
});

ListItem.propTypes = {
  content: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element
  ]),
  id: PropTypes.string.isRequired,
  isEditable: PropTypes.bool.isRequired,
  toggleEditable: PropTypes.func.isRequired
};

export default connect(null, mapDispatchToProps)(ListItem);
