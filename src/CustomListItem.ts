import Quill from "quill";

import "./custom_list_item.css";

const ListItem = Quill.import("formats/list/item");

export default class Custom extends ListItem {
  static create(value: string): Node {
    const node = super.create();
    node.classList.add("custom_list_item");

    node.addEventListener("click", (event: MouseEvent) => {
      const element = <HTMLDListElement>event.target;

      if (element) {
        let indentLevel = 0;
        element.classList.forEach((className) => {
          const parts = className.split("-");
          if (parts.length > 2 && parts[0] === "ql" && parts[1] === "indent") {
            indentLevel = parseInt(parts[2], 10);
          }
        });

        let sibling = element.nextElementSibling;
        while (sibling) {
          if (sibling.classList.contains("custom_list_item")) {
            let siblingIndentLevel = 0;
            sibling.classList.forEach((className) => {
              const parts = className.split("-");
              if (
                parts.length > 2 &&
                parts[0] === "ql" &&
                parts[1] === "indent"
              ) {
                siblingIndentLevel = parseInt(parts[2], 10);
              }
            });

            if (indentLevel === siblingIndentLevel) {
              break;
            }

            if (sibling.classList.contains("hide")) {
              sibling.classList.remove("hide");
            } else {
              sibling.classList.add("hide");
            }

            sibling = sibling.nextElementSibling;
          } else {
            break;
          }
        }
      }
    });

    return node;
  }
}
