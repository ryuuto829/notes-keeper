// @flow
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import RenderMarkdown from "../../../components/RenderMarkdown";

// Select text in double square brackets like [[Text]]
const REGEX = /\[\[.*?\]\]/g;

type Props = {
  text: string
};

const Contents = ({ text }: Props) => {
  const splitText = text.split(REGEX);

  if (splitText.length <= 1) return <RenderMarkdown text={text} />;

  const matches = text.match(REGEX);

  return splitText.reduce(
    (arr, element, index) =>
      matches[index]
        ? [
            ...arr,
            <RenderMarkdown key={index} text={element} />,
            // Replace [[Text]] with link for 'Text' page
            <React.Fragment key={index + 1}>
              <Brackets>[[</Brackets>
              <StyledLink to="/">
                {matches[index].replace("[[", "").replace("]]", "")}
              </StyledLink>
              <Brackets>]]</Brackets>
            </React.Fragment>
          ]
        : [...arr, <RenderMarkdown key={index + 2} text={element} />],
    []
  );
};

const Brackets = styled.span`
  color: #a7b6c2;
  padding: 0 2px;
`;

const StyledLink = styled(Link)`
  padding: 0 4px;
  text-decoration: none;
  border-bottom: 1px solid rgba(255, 255, 255, 1);
  color: #dcddde;

  &:hover {
    background-color: #bbeffd;
    color: #1a1a1a;
  }
`;

export default Contents;
