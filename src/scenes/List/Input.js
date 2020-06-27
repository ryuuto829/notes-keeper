import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNewListItem, removeListEditable } from '../../store/actions/index';

const Input = ({ addNewItem, parentID, isChild, closeInput, text, isEdit, removeEditable }) => {
  const [inputText, setInputText] = useState(text || '');

  const onInputSubmitHandler = e => {
    e.preventDefault();
    addNewItem(inputText, parentID, isChild, isEdit);
    removeEditable();
    closeInput(false);
  };

  return (
    <form onSubmit={e => onInputSubmitHandler(e)} >
      <input
        type="text"
        value={inputText}
        onChange={e => setInputText(e.target.value)} />
      <div>escape to cancel • enter to save</div>
    </form>
  );
};

const mapDispatchToProps = dispatch => ({
  addNewItem: (text, parentID, isChild, isEdit) => dispatch(addNewListItem(text, parentID, isChild, isEdit)),
  removeEditable: () => dispatch(removeListEditable())
});

Input.propTypes = {
  addNewItem: PropTypes.func.isRequired,
  parentID: PropTypes.string,
  isChild: PropTypes.bool.isRequired,
  closeInput: PropTypes.func.isRequired,
  text: PropTypes.string,
  isEdit: PropTypes.bool
};

export default connect(null, mapDispatchToProps)(Input);
