import styled from 'styled-components';

const StyledListContainer = styled.ul`
  padding: 0;
  margin: 0;
  margin-left: 9px;
  padding-left:  11px;
  position: relative;
  list-style: none;
  font-size: 14px;

  &:before {
    content: '';
    position: absolute;
    height: 100%;
    top: 0;
    left: 0;
    border-left: 1px solid #858585;
  }
`;

export default StyledListContainer;