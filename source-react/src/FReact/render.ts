const isProperty = (key: string) => key !== "children";
function render(element: any, container: HTMLElement) {
  const dom =
    element.type === "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(element.type);
  Object.keys(element.props)
    .filter(isProperty)
    .forEach((name) => {
      dom[name] = element.props[name];
    });

  debugger;
  element.props.children.forEach((child: any) => {
    render(child, dom);
  });

  container.appendChild(dom);
}

export default render;
