// @flow
import * as React from "react";
import styled from "styled-components";

import NoticeAlert from "../../components/NoticeAlert";

type Props = {
  notice: ?string
};

const Notices = ({ notice }: Props) => {
  if (
    notice === "auth/user-not-found" ||
    notice === "auth/invalid-email" ||
    notice === "auth/wrong-password"
  ) {
    return (
      <NoticeWrapper>
        It looks like you've entered incorrect email address or password. Please
        try again with another account or sign up for a new one.
      </NoticeWrapper>
    );
  }

  if (notice === "auth/user-disabled") {
    return (
      <NoticeWrapper>
        Your account has been suspended. To re-activate your account, please
        contact a admin.
      </NoticeWrapper>
    );
  }
  if (notice === "auth/email-already-in-use") {
    return (
      <NoticeWrapper>
        Sorry, user with this email address already exists. Please sign-in to
        continue or sign up with different email or account.
      </NoticeWrapper>
    );
  }
  if (notice === "auth/weak-password") {
    return (
      <NoticeWrapper>
        Your entered password is weak, please try again with another.
      </NoticeWrapper>
    );
  }
  if (notice === "auth/user-token-expired") {
    return (
      <NoticeWrapper>
        Sorry, it looks like that your account session is no longer valid,
        please try sign-in again.
      </NoticeWrapper>
    );
  }

  return (
    <NoticeWrapper>
      Authentication failed - we were unable to sign you in at this time. Please
      try again.
    </NoticeWrapper>
  );
};

const NoticeWrapper = styled(NoticeAlert)`
  margin-bottom: 20px;
  transition: all 2s ease-in;
`;

export default Notices;
