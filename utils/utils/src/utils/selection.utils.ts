export const clearTheSelection = () => {
  if (window && window.getSelection) {
    if (window.getSelection()?.empty) {
      window.getSelection()?.empty();
    } else if (window.getSelection()?.removeAllRanges) {
      window.getSelection()?.removeAllRanges();
    }
  } else if (document && (document as any).selection) {
    (document as any).selection.empty();
  }
};

export const getSelection = (): Selection | null => {
  if (window && window.getSelection) {
    return window.getSelection();
  } else if (document && document.getSelection) {
    return document.getSelection();
  } else if (document && (document as any).selection) {
    return (document as any).selection.createRange().text;
  }

  return null;
};

export const getAnchorElement = (selection: Selection | undefined): HTMLElement | null => {
  const anchorNode: Node | null | undefined = selection?.anchorNode;

  if (!anchorNode) {
    return null;
  }

  return anchorNode.nodeType !== Node.TEXT_NODE && anchorNode.nodeType !== Node.COMMENT_NODE
    ? (anchorNode as HTMLElement)
    : anchorNode.parentElement;
};

// https://stackoverflow.com/a/3866442/5404186
export const moveCursorToEnd = (element: HTMLElement) => {
  if (window && document && document.createRange && element) {
    const range: Range = document.createRange();
    range.selectNodeContents(element);
    range.collapse(false);

    const selection: Selection | null = getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
  }
};