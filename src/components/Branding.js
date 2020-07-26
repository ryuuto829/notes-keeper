import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import NotesKeeperLogo from './NotesKeeperLogo';

const Branding = ({ className, size = 36 }) => (
  <Link to='/' component={CustomStyledLink} className={className} >
    <NotesKeeperLogo size={size} />&nbsp;NotesKeeper
  </Link>
);

/** Provide custom style to react-router's `Link` component */
const CustomStyledLink = React.forwardRef(({ children, className, size }, ref) => (
  <BrandLink size={size} ref={ref} className={className}>{children}</BrandLink>
));

const BrandLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  font-size: ${props => props.size};
  font-weight: 600;
  color: ${props => props.theme.headerPrimary};
  user-select: none;

  &:hover {
    cursor: pointer;
  }
`;

Branding.propTypes = {
  size: PropTypes.number
};

export default Branding;
