import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Flex = ({ children, ...restProps }) => {
  return <Container {...restProps}>{children}</Container>;
};

const Container = styled.div`
  display: flex;
  flex: ${({ auto }) => (auto ? '1 1 auto' : 'initial')};
  flex-direction: ${({ column }) => (column ? 'column' : 'row')};
  align-items: ${({ align }) => align};
  justify-content: ${({ justify }) => justify};
  flex-shrink: ${({ shrink }) => (shrink ? 1 : 'initial')};
  min-height: 0;
  min-width: 0;
`;

Flex.propTypes = {
  column: PropTypes.bool,
  shrink: PropTypes.bool,
  align: PropTypes.oneOf(['stretch', 'center', 'baseline', 'flex-start', 'flex-end']),
  justify: PropTypes.oneOf(['center', 'space-around', 'space-between', 'flex-start', 'flex-end']),
  auto: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.element)
};

export default Flex;
