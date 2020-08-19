// @flow
import * as React from "react";
import { signInWithGoogle } from "../../server/firebase";

import Button from "../../components/Button";
import Divider from "../../components/Divider";
import GoogleLogo from "../../shared/icons/GoogleLogo";

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
