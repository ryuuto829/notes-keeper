import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import NotesKeeperLogo from './NotesKeeperLogo';

const Branding = () => (
  <Link to='/' component={CustomStyledLink}>
    <NotesKeeperLogo size={36} />&nbsp;NotesKeeper
  </Link>
);

/** Provide custom style to react-router's `Link` component */
const CustomStyledLink = React.forwardRef(({ children }, ref) => (
  <BrandLink ref={ref}>{children}</BrandLink>
));

const BrandLink = styled.a`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  font-size: 24px;
  font-weight: 600;
  color: #fff;
  user-select: none;
  top: 20px;

  &:hover {
    cursor: pointer;
  }

  @media (min-width: 400px ) {
    top: 24px;
  }
`;

export default Branding;
