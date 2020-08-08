import Quill from "quill";

import "./custom_list_item.css";

const ListItem = Quill.import("formats/list/item");

function getIndentLevel(element: Element) {
  let indentLevel = 0;
  element.classList.forEach((className) => {
    const parts = className.split("-");
    if (parts.length > 2 && parts[0] === "ql" && parts[1] === "indent") {
      indentLevel = parseInt(parts[2], 10);
    }
  });

  return indentLevel;
}

const eventHandler = (event: MouseEvent) => {
  const element = <HTMLDListElement>event.target;

  let mode = "HIDE";
  if (element.classList.contains("toggle")) {
    mode = "SHOW";
    element.classList.remove("toggle");
  } else {
    element.classList.add("toggle");
  }

  if (element) {
    const indentLevel = getIndentLevel(element);

    let sibling = element.nextElementSibling;
    while (sibling) {
      if (sibling.classList.contains("custom_list_item")) {
        const siblingIndentLevel = getIndentLevel(sibling);

        if (siblingIndentLevel <= indentLevel) {
          break;
        }

        if (mode === "SHOW") {
          sibling.classList.remove("hide");
          if (sibling.classList.contains("toggle")) {
            let nextSibling = sibling.nextElementSibling;
            while (nextSibling) {
              const nextSiblingIndentLevel = getIndentLevel(nextSibling);

              if (nextSiblingIndentLevel <= siblingIndentLevel) {
                break;
              }

              nextSibling = nextSibling.nextElementSibling;
            }

            sibling = nextSibling;
          }
        } else {
          sibling.classList.add("hide");
        }

        if (sibling) {
          sibling = sibling.nextElementSibling;
        }
      } else {
        break;
      }
    }
  }
};

export default class Custom extends ListItem {
  static create(value: string): Node {
    const node = super.create();
    node.classList.add("custom_list_item");

    node.addEventListener("click", eventHandler);

    return node;
  }

  clone() {
    const clone = super.clone();
    clone.domNode.addEventListener("click", eventHandler);

    return clone;
  }
}
