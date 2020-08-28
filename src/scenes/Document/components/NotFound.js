// @flow
import React from "react";
import styled from "styled-components";

const NotFound = () => (
  <Container>
    <p>
      Document requested by this link is unavailable. <br />
      (Maybe it was deleted or there are no such document in the store)
    </p>
    <p>Please, create new one, or find it in the 'All PAGES' section!</p>
  </Container>
);

const Container = styled.div`
  text-align: center;
  padding: 20px;
  color: #8e9297;
  font-size: 14px;
`;

export default NotFound;
