import React, { useState } from "react";
import Noty from "./Noty";
import _ from "lodash";
import { NotyContext, notyInterface } from "./NotyContext";

export default function NotyProvider(props) {
  let [notyContext, setNotyContext] = useState(notyInterface);

  function changeContext(newContext) {
    if (_.get(notyContext, "show") !== newContext.show) {
      setNotyContext(newContext);
    }
  }

  return (
    <NotyContext.Provider
      value={{
        notyContext,
        changeContext
      }}
    >
      {props.children}
      <Noty {...props.rest} />
    </NotyContext.Provider>
  );
}
