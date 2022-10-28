export const createNode = (element, ...classes) => {
  const node = document.createElement(element);
  if (classes !== undefined) {
    node.classList.add(classes);
  }
  return node;
};

export default createNode;
