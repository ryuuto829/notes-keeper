// @flow
import * as React from "react";
import styled from "styled-components";

import Notice from "../../components/Notice";

type Props = {
  notice?: string
};

const Notices = ({ notice }: Props) => {
  if (
    notice === "auth/user-not-found" ||
    notice === "auth/invalid-email" ||
    notice === "auth/wrong-password"
  ) {
    return (
      <NoticeAlert>
        It looks like you've entered incorrect email address or password. Please
        try again with another account or sign up for a new one.
      </NoticeAlert>
    );
  }

  if (notice === "auth/user-disabled") {
    return (
      <NoticeAlert>
        Your account has been suspended. To re-activate your account, please
        contact a admin.
      </NoticeAlert>
    );
  }
  if (notice === "auth/email-already-in-use") {
    return (
      <NoticeAlert>
        Sorry, user with this email address already exists. Please sign-in to
        continue or sign up with different email or account.
      </NoticeAlert>
    );
  }
  if (notice === "auth/weak-password") {
    return (
      <NoticeAlert>
        Your entered password is weak, please try again with another.
      </NoticeAlert>
    );
  }
  if (notice === "auth/user-token-expired") {
    return (
      <NoticeAlert>
        Sorry, it looks like that your account session is no longer valid,
        please try sign-in again.
      </NoticeAlert>
    );
  }

  return (
    <NoticeAlert>
      Authentication failed - we were unable to sign you in at this time. Please
      try again.
    </NoticeAlert>
  );
};

const NoticeAlert = styled(Notice)`
  margin-bottom: 20px;
  transition: all 2s ease-in;
`;

export default Notices;
