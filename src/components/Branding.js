import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import NotesKeeperLogo from './NotesKeeperLogo';

const Branding = ({ className }) => (
  <Link to='/' component={CustomStyledLink} className={className} >
    <NotesKeeperLogo size={36} />&nbsp;NotesKeeper
  </Link>
);

/** Provide custom style to react-router's `Link` component */
const CustomStyledLink = React.forwardRef(({ children, className }, ref) => (
  <BrandLink ref={ref} className={className}>{children}</BrandLink>
));

const BrandLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  font-size: 24px;
  font-weight: 600;
  color: ${props => props.theme.headerPrimary};
  user-select: none;

  &:hover {
    cursor: pointer;
  }
`;

Branding.propTypes = {
  className: PropTypes.string.isRequired
};

export default Branding;
