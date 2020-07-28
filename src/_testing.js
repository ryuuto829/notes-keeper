import React, { useState } from 'react';
import styled from 'styled-components';

import TestComponent from './components/Tooltip';

const TestingPlayground = () => {
  const [darkmode, setDarkmode] = useState(true);

  return (
    <PlaygroundWrapper>
      <PlaygroundLabel>
        Test component
        <PlaygroundButton onClick={() => setDarkmode(!darkmode)}>Toggle Dark Mode</PlaygroundButton>
      </PlaygroundLabel>
      <PlaygroundBox darkMode={darkmode}>


        <TestComponent left>Tooltip</TestComponent>
        <button>lol</button>




      </PlaygroundBox>
    </PlaygroundWrapper>
  );
};

const PlaygroundWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: white;
`;

const PlaygroundBox = styled.div`
  width: 80%;
  border-radius: 5px;
  border: 1px solid black;
  margin: 0 auto;
  margin-top: 20px;
  padding: 20px;
  background-color: ${props => props.darkMode ? '#505050' : '#fff'};
  color: ${props => props.darkMide ? 'white' : 'black'};
`;

const PlaygroundLabel = styled.h1`
  color: black;
  width: 80%;
  margin: 20px auto;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: left;
`;

const PlaygroundButton = styled.button`
  margin-left: 20px;
`;

export default TestingPlayground;
