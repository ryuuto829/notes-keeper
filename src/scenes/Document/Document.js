import React from 'react';
import styled from 'styled-components';

import ListItem from './components/ListItem';
import ListContainer from './components/ListContainer';
import Input from './components/Input';

const StyledWrapper = styled.div`
  background-color: #36393f;
  max-width: 500px;
  margin: 20px auto;
`;

const Document = () => {
  return (
    <StyledWrapper>
      <Input />
      <ListContainer >
        <ListItem content="Managing your time and motivation">
          <ListContainer>
            <ListItem content="Nested text overflow overflow overflow overflow overflow overflow .." />
            <ListItem content="Nested text .." />
            <ListItem content="Managing your time and motivation">
              <ListContainer>
                <ListItem content="Nested text .." />
                <ListItem content="Nested text .." />
                <ListItem content="Nested text .." />
              </ListContainer>
            </ListItem>
          </ListContainer>
        </ListItem>
        <ListItem content="Managing your time and motivation">
          <ListContainer>
            <ListItem content="Nested text .." />
            <ListItem content="Nested text .." />
            <ListItem content="Nested text .." />
          </ListContainer>
        </ListItem>
      </ListContainer>
    </StyledWrapper >
  );
};

export default Document;