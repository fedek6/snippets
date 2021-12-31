import * as React from "react";
import { Tag } from "antd";

const ecmaVersions = {
  es6: {
    short: "ES6",
    long: "ES2015",
  },
  es7: {
    short: "ES7",
    long: "ES2016",
  },
  es8: {
    short: "ES8",
    long: "ES2017",
  },
  es9: {
    short: "ES9",
    long: "ES2018",
  },
  es10: {
    short: "ES10",
    long: "ES2019",
  },
  es11: {
    short: "ES11",
    long: "ES2020",
  },
  find(id) {
    const a = Object.entries(this)
      .filter(
        (o) => o[1].short === id.toUpperCase() || o[1].long === id.toUpperCase()
      )
      .map((e) => e[1]);

    return a[0] ?? "unknown";
  },
};

const VersionTag = ({ version }) => {
  const { long, short } = ecmaVersions.find(version);

  return (
    <div>
      <Tag color="geekblue">
        <a
          href="https://github.com/sudheerj/ECMAScript-features"
          target="_blank"
          rel="noreferrer"
        >
          💻 <strong>{`${long} | ${short}`}</strong>
        </a>
      </Tag>
    </div>
  );
};

export default VersionTag;
