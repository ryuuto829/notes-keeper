import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { FormContainer } from './components/AuthForm';
import Button from './components/Button';
import Input from './components/Input';
import { formValidation } from './Validation';

const INITIAL_INPUT_STATE = {
  inputText: '',
  isValid: true,
  invalidMessage: null
};

const InputGroup = ({ inputsConfig, inputsType }) => {
  const initialState = {};

  inputsConfig.forEach(({ name }) => (
    initialState[name] = INITIAL_INPUT_STATE
  ));

  const [inputs, setInputs] = useState(initialState);

  const submitHandler = e => {
    e.preventDefault();

    const errors = {};
    const updatedState = {};

    /** Check validity of certain input */
    inputsConfig.forEach(({ name }) => {
      const inputError = formValidation(inputs[name].inputText, name) || null;
      if (inputError) errors[name] = inputError;
    });

    /** update validation state of certain input */
    inputsConfig.forEach(({ name }) => (
      updatedState[name] = {
        ...inputs[name],
        isValid: errors[name] === undefined,
        invalidMessage: errors[name]
      }
    ));

    setInputs({ ...inputs, ...updatedState });

    /** If form is valid -> submit to store */
    if (Object.keys(errors).length === 0) {
      console.log(`there is no errors. Submit action '${inputsType}'`)
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

  const inputFields = inputsConfig.map(input => (
    <Input
      key={input.name}
      name={input.name}
      label={input.label}
      inputType={input.inputType}
      invalidMessage={inputs[input.name].invalidMessage}
      isValid={inputs[input.name].isValid}
      inputValue={inputs[input.name].inputText}
      changedInputValue={inputChangeHandler} />
  ));

  return (
    <FormContainer
      onSubmit={submitHandler}>
      {inputFields}
      <Button>Login</Button>
    </FormContainer>
  );
};

InputGroup.propTypes = {
  inputsConfig: PropTypes.arrayOf(PropTypes.exact({
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    inputType: PropTypes.string.isRequired,
  })),
  inputsType: PropTypes.oneOf(['login', 'register'])
};

export default InputGroup;
