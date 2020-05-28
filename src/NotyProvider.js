import React, { Component, Fragment, useState } from "react";
import Noty from "./Noty";
import { NotyContext, notyInterface } from "./NotyContext";

export default function NotyProvider(props) {
  let [notyContext, setNotyContext] = useState(notyInterface);

  function changeContext(newContext) {
    if (notyContext === null) {
      setNotyContext(newContext);
    }
  }

  return (
    <NotyContext.Provider
      value={{
        notyContext,
        changeContext,
      }}
    >
      {props.children}
      <Noty
        {...props.rest}
      />
    </NotyContext.Provider>
  );
}
