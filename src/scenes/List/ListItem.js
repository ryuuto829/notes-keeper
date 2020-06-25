import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toggleListEditable } from '../../store/actions/index';

import ListContainer from './ListContainer';
import Input from './Input';

const ListItem = ({ content, children, id, isEditable, toggleEditable }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [showSiblingInput, setShowSiblingInput] = useState(false);
  const [editItem, setEditItem] = useState(false);

  const onMarkerClickHandler = () => {
    if (children) {
      setCollapsed(!collapsed && !isEditable);
    } else {
      setShowInput(!showInput && !isEditable);
      toggleEditable(!showInput);
    }
  };

  const onAddBtnClickHandler = () => {
    if (children) {
      if (collapsed) {
        setShowSiblingInput(!showSiblingInput && !isEditable);
        toggleEditable(!showSiblingInput);
      } else {
        setShowInput(!showInput && !isEditable);
        toggleEditable(!showInput);
      }
    } else {
      setShowSiblingInput(!showSiblingInput && !isEditable);
      toggleEditable(!showSiblingInput);
    }
  };

  const onEditBtnClickHandler = () => {
    setEditItem(!editItem && !isEditable);
    toggleEditable(!editItem);
  };

  /** Add children Items */
  let childrenItems = null;
  if (children) {
    childrenItems = (
      <ListContainer hidden={collapsed}>
        {children}
      </ListContainer>
    );
  }

  /** Add nested input as a child */
  let nestedInput = null;
  if (showInput && !collapsed) {
    nestedInput = (
      <ListContainer>
        <li>
          <Input
            closeInput={setShowInput}
            parentID={id}
            isChild={true} />
        </li>
      </ListContainer>
    );
  }

  /** Add sibling input as a sibling */
  let siblingInput = null;
  if (showSiblingInput) {
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
    <div>
      <button onClick={onMarkerClickHandler}>Marker</button>
      <span> {content} </span>
      <button onClick={onAddBtnClickHandler}>Add</button>
      <button onClick={onEditBtnClickHandler}>Edit</button>
    </div>
  );
  if (editItem) {
    itemContent = (
      <Input
        text={content}
        closeInput={setEditItem}
        parentID={id}
        isChild={false}
        isEdit={true} />
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

const mapStateToProps = state => ({
  isEditable: state.document.isEditable
});

const mapDispatchToProps = dispatch => ({
  toggleEditable: isEditable => dispatch(toggleListEditable(isEditable))
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

export default connect(mapStateToProps, mapDispatchToProps)(ListItem);
