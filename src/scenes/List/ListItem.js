import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  addListItem,
  editListItem,
  toggleListEditable,
  removeListEditable,
  deleteListItem
} from '../../store/actions';

import ListContent from './components/ListContent';
import ListItemContainer from './components/ListItemContainer';
import Input from './components/Input';

const INPUT_TYPES = {
  childInput: 'childInput',
  siblingInput: 'siblingInput',
  editInput: 'editInput'
};

const ListItem = ({
  content,
  children,
  id,
  isEditable,
  toggleEditable,
  removeEditable,
  deleteItem, addItem,
  editItem
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [showedInput, setShowedInput] = useState(null);
  const inputField = useRef(null);

  /** Setup listeners for global escape keydown */
  useEffect(() => {
    const escFunction = e => {
      if (e.key === 'Escape') {
        setShowedInput(null);
        removeEditable();
      }

      if (e.key === 'Enter') {
        const inputText = inputField.current.textContent;

        if (showedInput === INPUT_TYPES.editInput) {
          editItem(inputText, id);
        } else {
          addItem(inputText, id, showedInput === INPUT_TYPES.childInput);
        }

        setShowedInput(null);
        removeEditable();
      }
    };

    if (isEditable) {
      document.addEventListener("keydown", escFunction, false);
    }

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, [removeEditable, isEditable, addItem, editItem, id, showedInput]);

  const onMarkerClickHandler = () => {
    if (children) {
      setCollapsed(!collapsed);
      removeEditable();
    } else {
      if (!isEditable) {
        toggleEditable(id);
        setShowedInput(INPUT_TYPES.childInput);
      } else {
        setShowedInput(INPUT_TYPES.childInput === showedInput ? null : INPUT_TYPES.childInput);
      }
    }
  };

  const onAddBtnClickHandler = () => {
    if (!isEditable) toggleEditable(id);
    if (children && !collapsed) {
      setShowedInput(INPUT_TYPES.childInput === showedInput ? null : INPUT_TYPES.childInput);
    } else {
      setShowedInput(INPUT_TYPES.siblingInput === showedInput ? null : INPUT_TYPES.siblingInput);
    }
  };

  const onEditBtnClickHandler = () => {
    if (!isEditable) toggleEditable(id);
    setShowedInput(INPUT_TYPES.editInput);
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
  if (showedInput === INPUT_TYPES.childInput && !collapsed && isEditable) {
    nestedInput = (
      <ListItemContainer>
        <li>
          <Input ref={inputField} />
        </li>
      </ListItemContainer>
    );
  }

  /** Add sibling input as a sibling */
  let siblingInput = null;
  if (showedInput === INPUT_TYPES.siblingInput && isEditable) {
    siblingInput = (
      <li>
        <Input ref={inputField} />
      </li>
    );
  }

  /** Show input when edit or content */
  let itemContent = (
    <ListContent
      hasChildren={children !== null}
      showedMarker={collapsed}
      clicked={onMarkerClickHandler}
      added={onAddBtnClickHandler}
      edited={onEditBtnClickHandler}
      deleted={onDeleteBtnClickHandler}
      content={content} />
  );

  if (showedInput === INPUT_TYPES.editInput && isEditable) {
    itemContent = (
      <Input
        ref={inputField}
        text={content} />
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
  addItem: (text, parentID, isChild) => dispatch(addListItem(text, parentID, isChild)),
  editItem: (text, parentID) => dispatch(editListItem(text, parentID)),
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
  toggleEditable: PropTypes.func.isRequired,
  removeEditable: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired
};

export default connect(null, mapDispatchToProps)(ListItem);
