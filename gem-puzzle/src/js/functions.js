const createNode = (element, ...classes) => {
  const node = document.createElement(element);
  if (classes !== undefined) {
    node.classList.add(classes);
  }
  return node;
};

const pad = (val) => {
  const valString = `${val}`;
  if (valString.length < 2) {
    return `0${valString}`;
  }
  return valString;
};

const getRandomBool = () => {
  if (Math.floor(Math.random() * 2) === 0) {
    return true;
  }
  return false;
};

const removeItemFromLS = (...items) => {
  items.forEach((e) => {
    localStorage.removeItem(e);
  });
};

export {
  createNode,
  pad,
  getRandomBool,
  removeItemFromLS,
};
