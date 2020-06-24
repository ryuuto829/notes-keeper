import React, { useState } from 'react';
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
      console.log('Collapse children')
      setCollapsed(!collapsed);
    } else {
      console.log('Show input')
      setShowInput(!showInput);
    }
  };

  const onAddBtnClickHandler = () => {
    if (children) {
      if (collapsed) {
        console.log("add below as a sibling")
        setShowSiblingInput(!showSiblingInput);
      } else {
        console.log("add below as a child")
        setShowInput(!showInput);
      }
    } else {
      console.log("add below as a sibling")
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

export default ListItem;