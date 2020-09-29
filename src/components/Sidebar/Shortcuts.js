// @flow
import * as React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {
  selectShorcuts,
  selectShorcutsById,
  updateShortcuts
} from "../../store/modules/ui";

import { selectUser } from "../../store/modules/login";
import { database } from "../../server/firebase";

import Scrollable from "../Scrollable";
import SidebarLink from "./components/SidebarLink";
import Skeleton from "./components/Skeleton";

const Shortcuts = () => {
  const dispatch = useDispatch();
  const shortcuts = useSelector(selectShorcuts);
  const shortcutsById = useSelector(selectShorcutsById);
  const user = useSelector(selectUser);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe;

    const fetchData = async () => {
      unsubscribe = await database
        .collection("users")
        .doc(user.uid)
        .onSnapshot(function(doc) {
          var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
          console.log(source, " data: ", doc.data());

          setTimeout(function() {
            if (doc.data().shortcuts) {
              dispatch(
                updateShortcuts({
                  list: [...doc.data().shortcuts].map(el => JSON.parse(el))
                })
              );
            }
            console.log("da");
            setLoading(false);
          }, 30000);
        });
    };

    fetchData();

    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ShortcutsTitle>SHORTCUTS</ShortcutsTitle>
      <ScrollableWrapper>
        {shortcuts ? (
          <Scrollable size="small" as="nav">
            {loading ? <Skeleton /> : null}
            {!loading && shortcuts.length !== 0
              ? shortcuts.map(page => {
                  const { url, title, id } = page;
                  return <StyledSidebarLink key={id} to={url} label={title} />;
                })
              : null}
          </Scrollable>
        ) : null}
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
