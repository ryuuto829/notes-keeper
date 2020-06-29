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

const INPUT_TYPES = {
  childInput: 'childInput',
  siblingInput: 'siblingInput',
  editInput: 'editInput'
};

const ListItem = ({ content, children, id, isEditable, toggleEditable, removeEditable, deleteItem }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [showedInput, setShowedInput] = useState(null);

  /** Setup listeners for global escape keydown */
  useEffect(() => {
    console.log('effect')
    const escFunction = e => {
      if (e.code === 'Escape') {
        setShowedInput(null);
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
  }, [removeEditable, isEditable]);

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
          <Input
            closeInput={setShowedInput}
            parentID={id}
            isChild={true} />
        </li>
      </ListItemContainer>
    );
  }

  /** Add sibling input as a sibling */
  let siblingInput = null;
  if (showedInput === INPUT_TYPES.siblingInput && isEditable) {
    siblingInput = (
      <li>
        <Input
          closeInput={setShowedInput}
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
      <StyledListContent>
        {content}
      </StyledListContent>
      <Popout
        added={onAddBtnClickHandler}
        edited={onEditBtnClickHandler}
        deleted={onDeleteBtnClickHandler} />
    </StyledContentContainer>
  );

  if (showedInput === INPUT_TYPES.editInput && isEditable) {
    itemContent = (
      <Input
        text={content}
        closeInput={setShowedInput}
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
  toggleEditable: PropTypes.func.isRequired,
  removeEditable: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired
};

export default connect(null, mapDispatchToProps)(ListItem);
