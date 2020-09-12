// @flow
import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import Background from "../components/Background";
import Flex from "../components/Flex";
import Button from "../components/Button";
import PageTitle from "../components/PageTitle";

const NotFound = () => {
  const history = useHistory();

  return (
    <Background>
      <Wrapper align="center" justify="center">
        <CenteringWrapper>
          <PageTitle title="Page Not Found" />
          <Head align="center" justify="center">
            404
          </Head>
          <h1>Page Not Found</h1>
          <p>
            Unfortunately the page you're looking for doesn't exist (anymore) or
            there was an error in the link you followed or typed.
          </p>
          <Button large clicked={() => history.push("/")}>
            Go to Homepage
          </Button>
        </CenteringWrapper>
      </Wrapper>
    </Background>
  );
};

const Head = styled(Flex)`
  position: absolute;
  font-size: 40vw;
  font-weight: 600;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  line-height: 1;
  height: 100%;
  overflow: hidden;
  color: rgba(1, 1, 1, 0.2);
  user-select: none;
  z-index: -1;

  @media (max-width: 600px) {
    font-size: 80vw;
  }
`;

const CenteringWrapper = styled.div`
  width: 100%;
  padding: 10px;
  max-width: 600px;
  text-align: center;
  color: #dcddde;
`;

const Wrapper = styled(Flex)`
  height: 100%;
  position: relative;
`;

export default NotFound;
