import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Input = ({
  name,
  type,
  label,
  value,
  onChange,
  errorMessages = {},
  className
}) => {
  const isValid = errorMessages[name] === undefined;

  return (
    <React.Fragment>
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
        className={className}
        id={name}
        name={name}
        autoComplete='off'
        spellCheck={false}
        type={type}
        isValid={isValid}
        value={value}
        onChange={e => onChange(e)} />
    </React.Fragment>
  );
};

const Label = styled.label`
  display: block;
  text-align: left;
  margin-bottom: 8px;
  color: ${props => props.isValid ? props.theme.label : props.theme.danger};
  font-size: 12px;
  line-height: 16px;
  font-weight: 600;
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
  color: ${props => props.theme.textNormal};
  outline: 0;
  background-color: rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-color: ${props => props.isValid ? 'rgba(0, 0, 0, 0.3)' : props.theme.danger};
  transition: border-color .2s ease-in-out;

  &:hover:not(:active) {
    border-color: ${props => props.isValid ? '#040405' : props.theme.danger};
  }
`;

Input.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  errorMessages: PropTypes.object,
  className: PropTypes.string
};

export default Input;
