import React from 'react';
import styled from 'styled-components';

const Tooltip = ({ ...restProps }) => {

  return (
    <TooltipBox
      {...restProps}>Close sidebar</TooltipBox>
  );
};

const TooltipBox = styled.div`
  position: relative;
  display: inline-block;
  background-color: #222;
  color: white;
  padding: 2px 8px;
  border-radius: 3px;
  font-size: 14px;
  line-height: 20px;

  /** Arrow */
  &:after {
    content: " ";
    position: absolute;
    border-width: 5px;
    border-style: solid;
    ${props => props.bottom ? 'top: 100%' : null};
    ${props => props.bottom || props.top ? 'left: 50%' : null};
    ${props => props.top ? 'bottom: 100%' : null};
    ${props => props.left || props.right ? 'top: 50%' : null};
    ${props => props.left ? 'right: 100%' : null};
    ${props => props.right ? 'left: 100%' : null};
    ${props => props.bottom || props.top ? 'margin-left: -5px' : null};
    ${props => props.left || props.right ? 'margin-top: -5px' : null};
    ${props => props.bottom ? 'border-color: black transparent transparent transparent' : null};
    ${props => props.top ? 'border-color: transparent transparent black transparent' : null};
    ${props => props.left ? 'border-color: transparent black transparent transparent' : null};
    ${props => props.right ? 'border-color: transparent transparent transparent black' : null};
  }
`;

export default Tooltip;
