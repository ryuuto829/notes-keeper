import React, { useState } from 'react';
import PropTypes from 'prop-types';

import ListContainer from './ListContainer';
import Input from './Input';

const ListItem = ({ content, children, id }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [showSiblingInput, setShowSiblingInput] = useState(false);

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
          parentID={id}
          isChild={false} />
      </li>
    );
  }

  const onMarkerClickHandler = () => {
    if (children) {
      setCollapsed(!collapsed);
    } else {
      setShowInput(!showInput);
    }
  };

  const onAddBtnClickHandler = () => {
    if (children) {
      if (collapsed) {
        setShowSiblingInput(!showSiblingInput);
      } else {
        setShowInput(!showInput);
      }
    } else {
      setShowSiblingInput(!showSiblingInput);
    }
  };

  return (
    <React.Fragment>
      <li>
        <div>
          <button onClick={onMarkerClickHandler}>Marker</button>
          <span> {content} </span>
          <button onClick={onAddBtnClickHandler}>Add</button>
        </div>
        {nestedInput}
        {childrenItems}
      </li>
      {siblingInput}
    </React.Fragment>
  );
};

ListItem.propTypes = {
  content: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element
  ]),
  id: PropTypes.string.isRequired
};

export default ListItem;
