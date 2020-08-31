// @flow
import React from "react";
import styled from "styled-components";
import { signInWithGoogle } from "../../server/firebase";

import Button from "../../components/Button";
import Divider from "../../components/Divider";
import GoogleLogo from "../../shared/icons/GoogleLogo";

const Services = () => (
  <>
    <StyledButton
      large
      fullWidth
      variant="secondary"
      icon={<GoogleLogo size={24} />}
      clicked={signInWithGoogle}
    >
      Sign in with Google
    </StyledButton>
    <Divider />
  </>
);

const StyledButton = styled(Button)`
  margin-bottom: 8px;
`;

export default Services;
