import React from "react";
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/dracula";
import CopyButton from "./CopyButton";

const CodeBlock = (props) => {
  const className = props.children.props.className || "";
  const matches = className.match(/language-(?<lang>.*)/);
  const code = props.children.props.children.trim();

  return (
    <Highlight
      {...defaultProps}
      code={code}
      language={
        matches && matches.groups && matches.groups.lang
          ? matches.groups.lang
          : ""
      }
      theme={theme}
    >
      {({
        className: preClassName,
        style,
        tokens,
        getLineProps,
        getTokenProps,
      }) => (
        <pre
          className={preClassName}
          style={{
            ...style,
            padding: "20px",
            position: "relative",
            whiteSpace: "pre-wrap",
          }}
        >
          <CopyButton
            codeString={code}
            style={{ position: "absolute", right: "20px" }}
          />
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};

export default CodeBlock;
