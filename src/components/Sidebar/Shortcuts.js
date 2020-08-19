// @flow
import * as React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { selectShorcuts, selectShorcutsById } from "../../store/modules/ui";

import Scrollable from "../Scrollable";
import SidebarLink from "./components/SidebarLink";

const Shortcuts = () => {
  const shortcuts = useSelector(selectShorcuts);
  const shortcutsById = useSelector(selectShorcutsById);

  return (
    <>
      <ShortcutsTitle>SHORTCUTS</ShortcutsTitle>
      <ScrollableWrapper>
        <Scrollable size="small" as="nav">
          {shortcuts.map(id => {
            const { url, title } = shortcutsById[id];
            return <StyledSidebarLink key={id} to={url} label={title} />;
          })}
        </Scrollable>
      </ScrollableWrapper>
    </>
  );
};

const ShortcutsTitle = styled.span`
  width: 204px;
  font-size: 12px;
  line-height: 16px;
  padding: 0 14px;
  margin-bottom: 12px;
  color: #8e9297;
  user-select: none;
  background-color: #2f3136;
`;

const ScrollableWrapper = styled.div`
  flex: auto;
  position: relative;
`;

const StyledSidebarLink = styled(SidebarLink)`
  margin: 0 8px;
  width: 216px;
`;

export default Shortcuts;
