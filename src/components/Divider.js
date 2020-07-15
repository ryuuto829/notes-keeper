import styled from 'styled-components';

const Divider = styled.hr`
  line-height: 1rem;
  margin: 0;
  position: relative;
  outline: 0;
  border: 0;
  text-align: center;
  height: 1.5rem;
  font-size: 14px;

  &:before {
    content: '';
    background: ${props => props.theme.mainBackground};
    position: absolute;
    left: 0;
    top: 50%;
    width: 100%;
    height: 1px;
  }

  &:after {
    content: 'or';
    position: relative;
    display: inline-block;
    padding: 0 .5rem;
    line-height: 1.5rem;
    color: ${props => props.theme.headerSecondary};
    background-color: ${props => props.theme.primary};
  }
`;

export default Divider;
