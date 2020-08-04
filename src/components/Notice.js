// @flow
import React from "react";
import styled from "styled-components";

import ErrorOutline from "../shared/icons/ErrorOutline";
import Flex from "./Flex";

type Props = {
  children: React.Node,
  className: ?string
};

const Notice = ({ children, className }: Props) => (
  <NoticeWrapper align="center" className={className}>
    <ErrorOutline size={24} />
    <Label>{children}</Label>
  </NoticeWrapper>
);

const NoticeWrapper = styled(Flex)`
  color: #f04747;
  border-radius: 6px;
  fill: #f04747;
`;

const Label = styled.p`
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  font-style: italic;
  margin: 0;
  margin-left: 6px;
  text-align: left;
`;

export default Notice;
