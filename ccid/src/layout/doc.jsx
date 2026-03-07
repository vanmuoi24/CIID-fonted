import React, { useState } from "react";
import mammoth from "mammoth";

const WordViewer = () => {
  const [html, setHtml] = useState("");

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const arrayBuffer = await file.arrayBuffer();

    const result = await mammoth.convertToHtml({ arrayBuffer });

    setHtml(result.value);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Import Word File</h2>

      <input type="file" accept=".docx" onChange={handleFileUpload} />

      <div
        style={{
          marginTop: "20px",
          border: "1px solid #ddd",
          padding: "20px",
          background: "#fff"
        }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
};

export default WordViewer;