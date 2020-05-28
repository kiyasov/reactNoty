import React from "react";

export const notyInterface = null;

export const NotyContext = React.createContext({
  notyInterface,
  changeContext: () => {},
});
