import Quill from "quill";
import "quill/dist/quill.snow.css";

import "./styles.css";

const options = {
  debug: "info",
  modules: {
    toolbar: "#toolbar",
  },
  theme: "snow",
};

const container = document.getElementById("editor");
if (container) {
  const editor = new Quill(container, options);
}
