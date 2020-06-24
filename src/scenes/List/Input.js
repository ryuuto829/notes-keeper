import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNewListItem } from '../../store/actions/index';

const Input = ({ addNewItem, parentID, isChild }) => {
  const [inputText, setInputText] = useState('');

  const onInputSubmitHandler = e => {
    e.preventDefault();
    addNewItem(inputText, parentID, isChild);
  };

  return (
    <form onSubmit={e => onInputSubmitHandler(e)} >
      <input
        type="text"
        value={inputText}
        onChange={e => setInputText(e.target.value)} />
    </form>
  );
};

const mapDispatchToProps = dispatch => ({
  addNewItem: (text, parentID, isChild) => dispatch(addNewListItem(text, parentID, isChild))
});

Input.propTypes = {
  addNewItem: PropTypes.func.isRequired,
  parentID: PropTypes.string,
  isChild: PropTypes.bool.isRequired,
};

export default connect(null, mapDispatchToProps)(Input);
