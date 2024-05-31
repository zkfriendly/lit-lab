import React, { useState, useEffect } from "react";
import "./text-editor.css";

const TextEditor = ({ fileContent }) => {
  const [content, setContent] = useState("<p>Edit this text</p>");

  const escapeHtml = (unsafe) => {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;")
      .replace(/\n/g, "<br/>")
      .replace(/ /g, "&nbsp;")
      .replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;");
  };

  useEffect(() => {
    // Convert newlines to <br/> tags for display
    const formattedContent = escapeHtml(fileContent);
    setContent(formattedContent);
  }, [fileContent]);

  const handleInput = (e) => {
    // Replace <br> with newline characters for internal state
    const newContent = e.currentTarget.innerHTML.replace(/<br\s*\/?>/g, "\n");
    setContent(newContent);
  };
  //   setContent(fileContent);

  return (
    <div>
      <div
        className="text-editor"
        contentEditable="false"
        dangerouslySetInnerHTML={{ __html: content }}
        onInput={handleInput}
      ></div>
    </div>
  );
};

export default TextEditor;
