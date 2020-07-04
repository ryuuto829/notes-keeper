import React from 'react';
import styled from 'styled-components';

import HeaderPrimary from './components/HeaderPrimary';
import HeaderSecondary from './components/HeaderSecondary';
import Input from './components/Input';

const Auth = () => {
  return (
    <StyledWrapper>
      <StyledAuthBox>
        <StyledCenteringWrapper>
          <HeaderPrimary>Welcome Back!</HeaderPrimary>
          <HeaderSecondary>We're so excited to see you again!</HeaderSecondary>
          <form>
            <Input />
            <Input />
          </form>
        </StyledCenteringWrapper>
      </StyledAuthBox>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: #202225;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledAuthBox = styled.div`
  background-color: #36393f;
  padding: 32px;
  width: 100%;
  max-width: 480px;
  border-radius: 5px;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, .2);
  display: flex;
  justify-content: center;
  align-items: center;
  animation: moveFromTop .3s;

  @media (max-width: 440px) {
    height: 100%;
    padding: 30px 16px;
    min-height: 580px;
  }


  @keyframes moveFromTop {
  0% {
    transform: translateY(-100px);
    opacity: 0.5;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
`;

const StyledCenteringWrapper = styled.div`
  width: 100%;
  text-align: center;
`;

export default Auth;