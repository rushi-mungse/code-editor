import Codemirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/monokai.css";
import "codemirror/mode/clike/clike.js";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import { useEffect, useRef } from "react";

const Editor = () => {
  const editorRef = useRef(null);

  useEffect(() => {
    const init = async () => {
      editorRef.current = Codemirror.fromTextArea(
        document.getElementById("realtimeEditor"),
        {
          mode: "text/x-csrc",
          theme: "monokai",
          autoCloseTags: true,
          autoCloseBrackets: true,
          lineNumbers: true,
        }
      );
    };
    init();
  }, []);

  return <textarea id="realtimeEditor"></textarea>;
};

export default Editor;
