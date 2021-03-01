export function remapQueriedItems<T extends HTMLElement>(
  items: NodeList
): Array<T> {
  let elms: Array<T> = [],
    i = 0,
    l = items.length,
    item;
  for (; i < l; i++) {
    item = items[i];
    elms.push(<T>items[i]);
  }
  return elms;
}

export function addClass(
  target: Element | Element[] | NodeList,
  ...token: string[]
) {
  if (target instanceof NodeList) {
    target = remapQueriedItems(target);
  }
  if (target instanceof Array) {
    target.forEach((elm) => {
      elm.classList.add(...token);
    });
  } else {
    target.classList.add(...token);
  }
}
