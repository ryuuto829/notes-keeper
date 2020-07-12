import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

const Input = ({ name, type, label, value, onChange, errorMessages = {} }) => {
  const isValid = errorMessages[name] === undefined;
  return (
    <InputWrapper>
      <Label
        isValid={isValid}
        htmlFor={label}>
        {label}
        <InvalidMessage
          isValid={isValid}>
          {errorMessages[name] || null}
        </InvalidMessage>
      </Label>
      <InputField
        id={name}
        name={name}
        autoComplete='off'
        spellCheck={false}
        type={type}
        isValid={isValid}
        value={value}
        onChange={e => onChange(e)} />
    </InputWrapper>
  );
};

const Label = styled.label`
  display: block;
  text-align: left;
  margin-bottom: 8px;
  color: ${({ isValid }) => isValid ? '#8e9297' : '#f04747'};
  font-size: 12px;
  line-height: 16px;
  transition: color .2s ease-in-out;
`;

const InvalidMessage = styled.span`
  opacity: ${({ isValid }) => isValid ? '0' : '1'};
  font-size: 12px;
  font-weight: 500;
  font-style: italic;
  color: #f04747;
  transition: opacity .2s ease-in-out;

  &:before {
    content: '-';
    display: inline;
    padding: 0 4px;
  }
`;

const InputField = styled.input`
  width: 100%;
  height: 40px;
  padding: 10px;
  font-size: 16px;
  border-radius: 3px;
  color: #dcddde;
  outline: 0;
  background-color: rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-color: ${({ isValid }) => isValid ? 'rgba(0, 0, 0, 0.3)' : '#f04747'};
  transition: border-color .2s ease-in-out;
`;

const InputWrapper = styled.div`
  margin-bottom: 20px;
`;

const mapStateToProps = state => ({
  errorMessages: state.authentication.errorMessages
});

Input.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  inputType: PropTypes.string,
};

export default connect(mapStateToProps)(Input);