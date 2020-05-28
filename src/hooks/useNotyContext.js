import React, { useState } from "react";

export default function useNotyContext(newContext = {}) {
  newContext = React.createContext(newContext);
  let [context, setCreatedContext] = useState(newContext);

  function setContext(newContext) {
    newContext = React.createContext(newContext);
    setCreatedContext(newContext);
  }
  
  return [context, setContext];
}
