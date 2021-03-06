// @flow
import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  selectShorcuts,
  addShortcut,
  removeShortcut
} from "../../store/modules/ui";
import {
  selectSelectAll,
  selectSelectedPages
} from "../../store/modules/collection";
import { database } from "../../server/firebase";
import { selectUser } from "../../store/modules/login";
import { deleteDocuments } from "../../store/modules/collection";

import LeftArrowIcon from "../../shared/icons/LeftArrow";
import SyncIcon from "../../shared/icons/Sync";
import IconButton from "./components/IconButton";
import Flex from "../../components/Flex";
import Button from "../../components/Button";
// import OpenMenu from "../../shared/icons/OpenMenu";
import Done from "../../shared/icons/Done";
import Delete from "../../shared/icons/Delete";
import Tooltip from "../../components/Tooltip";

type Props = {
  isLocked: boolean,
  showSidebar: () => void,
  hideSidebar: () => void,
  toggleLock: () => void
};

const Toolbar = ({ isLocked, showSidebar, hideSidebar, toggleLock }: Props) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const shortcutsList = useSelector(selectShorcuts);
  const selectedAll = useSelector(selectSelectAll);
  const selectedPages = useSelector(selectSelectedPages);
  const user = useSelector(selectUser);
  // Show different controls when there's no id
  const isDocument = id !== undefined;
  const shortcuted = isDocument
    ? shortcutsList.some(page => page.id === id)
    : false;

  const deleteItemsHandler = () => {
    // To delete multiple documents we use single batch
    // and the limit is 500 documents per 1 batch
    let batch = database.batch();

    selectedPages.forEach(id => {
      const documentRef = database
        .collection("users")
        .doc(user.uid)
        .collection("meta")
        .doc(id);

      batch.delete(documentRef);
    });

    // Commit the batch
    batch
      .commit()
      .then(function() {
        // console.log("DELETE SUCCESS");
      })
      .catch(error => {
        console.log(error);
      });
    dispatch(deleteDocuments());
  };

  const deleteCurrentPage = () => {
    let batch = database.batch();

    const documentRef = database
      .collection("users")
      .doc(user.uid)
      .collection("meta")
      .doc(id);

    batch.delete(documentRef);

    // Commit the batch
    batch
      .commit()
      .then(function() {
        // console.log("DELETE SUCCESS");
      })
      .catch(error => {
        console.log(error);
      });
  };

  const syncData = () => {
    // console.log("sync start");
  };

  return (
    <Wrapper isLocked={isLocked}>
      {isLocked ? null : <HoverArea onMouseLeave={hideSidebar} />}
      <ToolbarWrapper
        isLocked={isLocked}
        align="center"
        justify={isLocked ? "flex-end" : "space-between"}
      >
        {isLocked ? null : (
          <Tooltip content="Lock sidebar open" placement="bottom">
            <span>
              <RightArrowButton
                icon={<LeftArrowIcon />}
                onClick={toggleLock}
                onMouseEnter={showSidebar}
              />
            </span>
          </Tooltip>
        )}
        <ButtonGroup>
          {/* Controls for synchronization*/}
          {isDocument && (
            <Tooltip content="Sync with FirebaseDB" placement="bottom">
              <Button
                bgColor="transparent"
                hoverColor="rgb(79 84 92 / 72%)"
                color="#8e9297"
                hoverTextColor="#dcddde"
                padding="0 6px"
                icon={<SyncIcon fill="currentColor" size={20} />}
                clicked={syncData}
              >
                Sync
              </Button>
            </Tooltip>
          )}

          {/* Controls for Collection */}
          {selectedAll ? (
            <Tooltip content="Delete selected pages" placement="bottom">
              <Button
                bgColor="transparent"
                hoverColor="rgb(79 84 92 / 72%)"
                color="#8e9297"
                hoverTextColor="#dcddde"
                padding="0 6px"
                icon={<Delete fill="currentColor" size={20} />}
                clicked={deleteItemsHandler}
              >
                Delete
              </Button>
            </Tooltip>
          ) : null}

          {/* Controls for Document */}
          {isDocument ? (
            <Tooltip
              content={
                shortcuted
                  ? "Remove this page from sidebar"
                  : "Show this page on your sidebar"
              }
              placement="bottom"
            >
              <Button
                bgColor="transparent"
                hoverColor="rgb(79 84 92 / 72%)"
                color="#8e9297"
                hoverTextColor="#dcddde"
                padding="0 6px"
                icon={
                  shortcuted ? <Done fill="currentColor" size={20} /> : null
                }
                clicked={() =>
                  shortcuted
                    ? dispatch(removeShortcut({ id: id }))
                    : dispatch(
                        addShortcut({
                          id: id,
                          url: `/page/${id}`,
                          title: "No Title" // CHANGE LATER
                        })
                      )
                }
              >
                Favorite
              </Button>
            </Tooltip>
          ) : null}

          {isDocument && (
            <Tooltip content="Delete current page" placement="bottom">
              <Button
                bgColor="transparent"
                hoverColor="rgb(79 84 92 / 72%)"
                color="#8e9297"
                hoverTextColor="#dcddde"
                padding="0 6px"
                icon={<Delete fill="currentColor" size={20} />}
                clicked={deleteCurrentPage}
              >
                Delete
              </Button>
            </Tooltip>
          )}
        </ButtonGroup>
      </ToolbarWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 48px;
  position: fixed;
  width: 100%;
  padding: 0 20px;
  margin-left: ${props => (props.isLocked ? "232px" : "0")};
  background-color: #36393f;
  color: white;
  z-index: 101;
`;

const ToolbarWrapper = styled(Flex)`
  height: 100%;
  ${props => (props.isLocked ? "width: calc(100% - 232px)" : null)};
`;

const RightArrowButton = styled(IconButton)`
  transform: rotate(180deg);
`;

const HoverArea = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 232px;
  height: 100%;

  @media (max-width: 600px) {
    width: 0;
  }
`;

const ButtonGroup = styled(Flex)`
  & > button {
    margin-left: 6px;
  }
`;

export default Toolbar;
