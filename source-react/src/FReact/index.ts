import createElement from "./createElement";

let nextUnitOfWork: any = null;

function performUnitOfWork(fiber: any) {

}

function workLoop(deadline: IdleDeadline) {
  let shouldYield = false;
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    shouldYield = deadline.timeRemaining() < 1;
  }
  requestIdleCallback(workLoop);
}

requestIdleCallback(workLoop);

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

  element.props.children.forEach((child: any) => {
    render(child, dom);
  });

  container.appendChild(dom);
}

export { createElement, render };
