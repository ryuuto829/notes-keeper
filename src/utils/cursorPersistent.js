// @flow
export const getSelectionOffsetRelativeTo = (
  // $FlowIssue no type for window object
  parentElement: any,
  currentNode: any
): number => {
  let offset = 0,
    prevSibling,
    nodeContent;

  if (!currentNode) {
    const currentSelection = window.getSelection();
    const currentRange = currentSelection.getRangeAt(0);
    currentNode = currentRange.startContainer;
    offset += currentRange.startOffset;
  }

  if (currentNode === parentElement) return offset;

  if (!parentElement.contains(currentNode)) return -1;

  while ((prevSibling = (prevSibling || currentNode).previousSibling)) {
    nodeContent = prevSibling.innerText || prevSibling.nodeValue || "";

    if (prevSibling.nodeName === "STRONG") {
      offset += 4;
    }

    if (prevSibling.nodeName === "EM") {
      offset += 2;
    }

    offset += nodeContent.length;
  }

  return (
    offset + getSelectionOffsetRelativeTo(parentElement, currentNode.parentNode)
  );
};
