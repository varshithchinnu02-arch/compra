export function findSemanticNode(
  layout,
  nodeName
) {

  return Object.values(layout.nodes).find(
    (n) => {

      const name =
        n.name?.toLowerCase() || "";

      const content =
        n.data?.content?.toLowerCase() || "";

      // PRODUCT
      if (nodeName === "product") {

        return (
          name.includes("product") ||
          name.includes("shoe") ||
          name.includes("image")
        );
      }

      // HEADLINE
      if (nodeName === "headline") {

        return (
          name.includes("headline") ||
          name.includes("heading") ||
          content.length > 20
        );
      }

      // BACKGROUND
      if (nodeName === "background") {

        const backgroundChild =
          Object.values(layout.nodes).find(
            (candidate) =>
              candidate.id !== layout.rootNodes[0] &&
              (candidate.type === "image" ||
                candidate.type === "shape") &&
              candidate.name
                ?.toLowerCase()
                .includes("background")
          );

        if (backgroundChild) {
          return n.id === backgroundChild.id;
        }

        const artboardNode =
          Object.values(layout.nodes).find(
            (candidate) => candidate.type === "artboard"
          );

        if (artboardNode) {
          return n.id === artboardNode.id;
        }

        return (
          name.includes("background") ||
          name.includes("bg")
        );
      }

      return false;
    }
  );
}

export function resizeArtboard(
  layout,
  newWidth,
  newHeight
) {

  const updated = structuredClone(layout);

  const rootId =
    updated.rootNodes[0];

  const artboard =
    updated.nodes[rootId];

  // update artboard
  artboard.width = newWidth;
  artboard.height = newHeight;

  // recompute children
  artboard.children.forEach(
    (childId) => {

      const node =
        updated.nodes[childId];

      node.x =
        node.nx * newWidth;

      node.y =
        node.ny * newHeight;

      node.width =
        node.nw * newWidth;

      node.height =
        node.nh * newHeight;
    }
  );

  return updated;
}

export function moveNode(
  layout,
  nodeName,
  position
) {

  const updated =
    structuredClone(layout);

  const rootId =
    updated.rootNodes[0];

  const artboard =
    updated.nodes[rootId];

  const node =
    findSemanticNode(
      updated,
      nodeName
    );

  if (!node) {
    return updated;
  }

  // TOP
  if (position === "top") {

    node.ny = 0.05;
  }

  // CENTER
  if (position === "center") {

    node.nx =
      (1 - node.nw) / 2;

    node.ny =
      (1 - node.nh) / 2;
  }

  // LOWER
  if (position === "lower") {

    node.ny =
      1 - node.nh - 0.05;
  }

  // LEFT
  if (position === "left") {

    node.nx = 0.05;
  }

  // RIGHT
  if (position === "right") {

    node.nx =
      1 - node.nw - 0.05;
  }

  // keep inside bounds
  if (node.nx < 0) {
    node.nx = 0;
  }

  if (node.ny < 0) {
    node.ny = 0;
  }

  if (node.nx + node.nw > 1) {
    node.nx =
      1 - node.nw;
  }

  if (node.ny + node.nh > 1) {
    node.ny =
      1 - node.nh;
  }

  // update absolute
  node.x =
    node.nx * artboard.width;

  node.y =
    node.ny * artboard.height;

  return updated;
}

export function resizeNode(
  layout,
  nodeName,
  scale
) {

  const updated =
    structuredClone(layout);

  const rootId =
    updated.rootNodes[0];

  const artboard =
    updated.nodes[rootId];

  const node =
    findSemanticNode(
      updated,
      nodeName
    );

  if (!node) {
    return updated;
  }

  // resize normalized values
  node.nw *= scale;
  node.nh *= scale;

  // limit size
  if (node.nw > 0.9) {
    node.nw = 0.9;
  }

  if (node.nh > 0.9) {
    node.nh = 0.9;
  }

  // update absolute sizes
  node.width =
    node.nw * artboard.width;

  node.height =
    node.nh * artboard.height;

  // keep inside bounds
  if (node.nx + node.nw > 1) {

    node.nx =
      1 - node.nw - 0.02;
  }

  if (node.ny + node.nh > 1) {

    node.ny =
      1 - node.nh - 0.02;
  }

  // update absolute position
  node.x =
    node.nx * artboard.width;

  node.y =
    node.ny * artboard.height;

  // resize text font
  if (
    node.type === "text" &&
    node.style?.fontSize
  ) {

    node.style.fontSize =
      Math.round(
        node.style.fontSize * scale
      );
  }

  return updated;
}

export function changeNodeColor(
  layout,
  nodeName,
  color
) {

  const updated =
    structuredClone(layout);

  const node =
    findSemanticNode(
      updated,
      nodeName
    );

  if (!node) {
    return updated;
  }

  // ensure style exists
  if (!node.style) {

    node.style = {};
  }

  // text node
  if (node.type === "text") {

    node.style.color = color;

  } else {

    node.style.backgroundColor = color;

    if (node.type === "artboard") {
      node.data = node.data || {};
      node.data.backgroundColor = color;
    }
  }

  return updated;
}