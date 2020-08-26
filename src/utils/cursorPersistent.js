// @flow
// Thanks to author of this post https://stackoverflow.com/a/48812529
export const getSelectionOffsetRelativeTo = (parentElement, currentNode) => {
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
    offset += nodeContent.length;
  }

  return (
    offset + getSelectionOffsetRelativeTo(parentElement, currentNode.parentNode)
  );
};
