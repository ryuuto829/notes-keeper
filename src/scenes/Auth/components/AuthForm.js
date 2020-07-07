import styled from 'styled-components';

export const AuthBox = styled.div`
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

  @media (max-width: 480px) {
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

export const CenteringWrapper = styled.div`
  width: 100%;
  text-align: center;
`;

export const HeaderPrimary = styled.h1`
  font-weight: 600;
  margin: 0;
  margin-bottom: 8px;
  color: #fff;
  font-size: 24px;
  line-height: 30px;
`;

export const HeaderSecondary = styled.h2`
  font-weight: 400;
  color: #b9bbbe;
  font-size: 16px;
  line-height: 20px;
`;

export const FormContainer = styled.form`
  margin-top: 20px;
`;

export const RedirectButtonWrapper = styled.div`
  margin-top: 4px;
  text-align: left;
  font-size: 13px;
`;

export const NeedAccountText = styled.span`
  line-height: 16px;
  text-align: left;
  color: rgb(114, 118, 125);
`;

export const TextButton = styled.button`
  display: inline-block;
  margin-left: 4px;
  color: #7289da;
  font-size: inherit;
  padding: 0;
  width: auto;
  height: auto;
  outline: 0;
  border: none;
  background-color: transparent;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;
