import styled from 'styled-components';

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
