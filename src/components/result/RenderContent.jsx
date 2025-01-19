import "katex/dist/katex.min.css";
import React, { Component } from "react";
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

// Error Boundary to catch and log errors
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error in RenderContent:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong while rendering the content.</div>;
    }

    return this.props.children;
  }
}

const RenderCntent = ({ content }) => {
  return (
    <div>
      <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
        {content}
      </ReactMarkdown>
    </div>
  );
};

const RenderContent = (props) => {
  return (
    <ErrorBoundary>
      <RenderCntent {...props} />
    </ErrorBoundary>
  );
};

export default RenderContent;
