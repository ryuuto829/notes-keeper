// @flow
import * as React from "react";
import { signInWithGoogle } from "../../server/firebase";

import Button from "../../components/Button";
import GoogleLogo from "../../shared/icons/GoogleLogo";
import Divider from "../../components/Divider";

const Services = () => (
  <>
    <Button
      variant="secondary"
      icon={<GoogleLogo size={24} />}
      clicked={signInWithGoogle}
    >
      Sign in with Google
    </Button>
    <Divider />
  </>
);

export default Services;
