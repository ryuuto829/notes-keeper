import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  addListItem,
  editListItem,
  removeListEditable
} from '../../store/actions/index';

const Input = ({ addItem, editItem, parentID, isChild, closeInput, text, isEdit, removeEditable }) => {
  const [inputText, setInputText] = useState(text || '');

  const onInputSubmitHandler = e => {
    e.preventDefault();
    if (isEdit) {
      editItem(inputText, parentID);
    } else {
      addItem(inputText, parentID, isChild);
    }
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
  addItem: (text, parentID, isChild) => dispatch(addListItem(text, parentID, isChild)),
  editItem: (text, parentID) => dispatch(editListItem(text, parentID)),
  removeEditable: () => dispatch(removeListEditable())
});

Input.propTypes = {
  parentID: PropTypes.string,
  isChild: PropTypes.bool.isRequired,
  closeInput: PropTypes.func.isRequired,
  text: PropTypes.string,
  isEdit: PropTypes.bool
};

export default connect(null, mapDispatchToProps)(Input);
