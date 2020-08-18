// @flow
import * as React from "react";
import styled from "styled-components";

import ErrorOutline from "../shared/icons/ErrorOutline";
import Flex from "./Flex";

type Props = {
  children: React.Node,
  className: ?string
};

const NoticeAlert = ({ children, className }: Props) => (
  <NoticeWrapper align="center" justify="space-between" className={className}>
    <Flex align="center">
      <ErrorOutline size={22} />
    </Flex>
    <Label>{children}</Label>
  </NoticeWrapper>
);

const NoticeWrapper = styled(Flex)`
  color: #f04747;
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
  white-space: pre-wrap;
`;

export default NoticeAlert;
