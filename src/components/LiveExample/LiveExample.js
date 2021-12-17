import * as React from "react";
import * as style from "./LiveExample.module.css";

const LiveExample = ({ link }) => (
  <div className={style.frame}>
    <a href={link} target="_blank" rel="noreferrer">
    💡 Click here to see the live example
    </a>
  </div>
);

export default LiveExample;
