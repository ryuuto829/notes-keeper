import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  submitSignInForm,
  submitSignUpForm
} from '../../store/actions';

import { FormContainer } from './components/AuthForm';
import Button from './components/Button';
import Input from './components/Input';

const INPUTS_TYPES = {
  email: {
    label: 'EMAIL',
    inputType: 'email'
  },
  username: {
    label: 'USERNAME',
    inputType: 'text'
  },
  password: {
    label: 'PASSWORD',
    inputType: 'password'
  },
};

const INITIAL_INPUT_STATE = {
  inputText: '',
  isValid: true,
  invalidMessage: null
};

const InputGroup = props => {
  const {
    inputsConfig,
    inputsType,
    submitLoginForm,
    submitRegisterForm
  } = props;

  const initialState = {};

  inputsConfig.forEach(name => (
    initialState[name] = INITIAL_INPUT_STATE
  ));

  const [inputs, setInputs] = useState(initialState);

  const submitHandler = e => {
    e.preventDefault();

    /** Submit inputs text to the store validation and submition */
    const submitText = inputsConfig.map(name => (inputs[name].inputText));

    if (inputsType === 'login') {
      submitLoginForm(...submitText);
    } else {
      submitRegisterForm(...submitText);
    }
  };

  const inputChangeHandler = (inputName, text) => {
    setInputs({
      ...inputs,
      [inputName]: {
        ...inputs[inputName],
        inputText: text
      }
    });
  };

  const inputFields = inputsConfig.map(name => (
    <Input
      key={name}
      name={name}
      label={INPUTS_TYPES[name].label}
      inputType={INPUTS_TYPES[name].inputType}
      inputValue={inputs[name].inputText}
      changedInputValue={inputChangeHandler} />
  ));

  return (
    <FormContainer
      onSubmit={submitHandler}>
      {inputFields}
      <Button>{inputsType === 'login' ? 'Login' : 'Continue'}</Button>
    </FormContainer>
  );
};

const mapDispatchToProps = dispatch => ({
  submitLoginForm: (email, password) => dispatch(submitSignInForm(email, password)),
  submitRegisterForm: (email, username, password) => dispatch(submitSignUpForm(email, username, password))
});

InputGroup.propTypes = {
  inputsConfig: PropTypes.arrayOf(
    PropTypes.oneOf(Object.keys(INPUTS_TYPES)
    )),
  inputsType: PropTypes.oneOf(['login', 'register']),
  submitLoginForm: PropTypes.func.isRequired,
  submitRegisterForm: PropTypes.func.isRequired
};

export default connect(null, mapDispatchToProps)(InputGroup);
