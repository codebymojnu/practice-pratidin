import React from "react";
import "./PDFReader.css"; // Import the CSS file for styling

const PDFReader = () => {
  return (
    <div className="pdf-reader-container">
      <header className="pdf-reader-header">
        <h2>Admission Last 20 Days</h2>
        <a href="./hsc-last-20-din.pdf" download className="download-button">
          Download PDF
        </a>
      </header>
      <div className="pdf-viewer">
        <object
          data="./hsc-last-20-din.pdf"
          type="application/pdf"
          className="pdf-object"
        >
          <p>
            Unable to display the PDF.{" "}
            <a
              href="./hsc-last-20-din.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              Click here to view the PDF.
            </a>
          </p>
        </object>
      </div>
    </div>
  );
};

export default PDFReader;
