/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable react/display-name */
import React, { useState } from "react";

export const myContext = React.createContext();

const Provider = (props) => {
  const [openKeys, setOpenKeys] = useState();

  return (
    <myContext.Provider
      value={{
        openKeys,
        setOpenKeys,
      }}
    >
      {props.children}
    </myContext.Provider>
  );
};

export default ({ element }) => <Provider>{element}</Provider>;
