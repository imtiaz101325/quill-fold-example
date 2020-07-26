import Quill from "quill";

import CustomListItem from "./CustomListItem";

import "quill/dist/quill.snow.css";
import "./styles.css";

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],

  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction

  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ["clean"], // remove formatting button
];

const options = {
  debug: "info",
  modules: {
    toolbar: toolbarOptions,
  },
  theme: "snow",
};

const container = document.getElementById("editor");
if (container) {
  Quill.register(CustomListItem, true);

  const editor = new Quill(container, options);
}
