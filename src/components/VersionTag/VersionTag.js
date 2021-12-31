import * as React from "react";
import { Tag, Divider } from "antd";

const ecmaVersions = {
  es6: {
    short: "ES6",
    long: "ES2015",
    icon: "👌",
  },
  es7: {
    short: "ES7",
    long: "ES2016",
    icon: "👩‍🔬",
  },
  es8: {
    short: "ES8",
    long: "ES2017",
    icon: "👩‍🔬",
  },
  es9: {
    short: "ES9",
    long: "ES2018",
    icon: "⚠️",
  },
  es10: {
    short: "ES10",
    long: "ES2019",
    icon: "⚠️",
  },
  es11: {
    short: "ES11",
    long: "ES2020",
    icon: "⚠️",
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
  const { long, short, icon } = ecmaVersions.find(version);

  return (
    <>
      <Divider />
      <Tag color="geekblue">
        <a
          href="https://github.com/sudheerj/ECMAScript-features"
          target="_blank"
          rel="noreferrer"
        >
          {`${icon} ECMAScript:`} <strong>{`${long} | ${short}`}</strong>
        </a>
      </Tag>
      <Divider />
    </>
  );
};

export default VersionTag;
