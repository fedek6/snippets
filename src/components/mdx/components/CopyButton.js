import * as React from "react";
import { Button } from "antd";

const CopyButton = (props) => {
  const [isCopied, setIsCopied] = React.useState(false);
  const { codeString, style } = props;

  return <Button size="small" onClick={() => {
    setIsCopied(true);
    navigator.clipboard.writeText(codeString);
    setTimeout(() => setIsCopied(false), 3000);
  }} style={style}>{isCopied ? "🎉 Copied!" : "Copy"}</Button>;
};

export default CopyButton;
