import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { submitSignUpForm } from '../../store/actions';

import {
  AuthBox,
  FormContainer,
  CenteringWrapper,
  HeaderPrimary,
  RedirectButtonWrapper,
  TextButton
} from './components/AuthForm';
import Input from './Input';
import Button from './components/Button';

const RegisterForm = ({ submitRegisterForm }) => {
  const history = useHistory();
  const [user, setUser] = useState({
    email: '',
    username: '',
    password: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const onChangeInputHandler = e => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const submitFormHandler = e => {
    e.preventDefault();
    submitRegisterForm(user.email, user.username, user.password);
  };

  return (
    <AuthBox>
      <CenteringWrapper>
        <HeaderPrimary>Create an account</HeaderPrimary>
        <FormContainer
          onSubmit={submitFormHandler}>
          <Input
            name='email'
            type='email'
            label='EMAIL'
            value={user.email}
            onChange={onChangeInputHandler} />
          <Input
            name='username'
            type='text'
            label='USERNAME'
            value={user.username}
            onChange={onChangeInputHandler} />
          <Input
            name='password'
            type='password'
            label='PASSWORD'
            value={user.password}
            onChange={onChangeInputHandler} />
          <Button>{submitted ?  'Loading' : 'Continue'}</Button>
        </FormContainer>
        <RedirectButtonWrapper>
          <TextButton
            onClick={() => history.push('/login')}>Already have an account ?</TextButton>
        </RedirectButtonWrapper>
      </CenteringWrapper>
    </AuthBox>
  );
};

const mapDispatchToProps = dispatch => ({
  submitRegisterForm: (email, username, password) => dispatch(submitSignUpForm(email, username, password))
});

RegisterForm.propTypes = {
  submitRegisterForm: PropTypes.func.isRequired
};

export default connect(null, mapDispatchToProps)(RegisterForm);
