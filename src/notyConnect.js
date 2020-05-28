import React, { Component } from "react";
import { NotyContext } from "./NotyContext";

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
}

export default function notyConnect(WrappedComponent) {
  return class extends Component {
    static displayName = `notyConnect(${getDisplayName(WrappedComponent)})`;

    render() {
      return (
        <NotyContext.Consumer>
          {({ notyContext, changeContext }) => {
            console.log(notyContext);
            return (
              <WrappedComponent
                {...this.props}
                noty={notyContext && notyContext.noty}
              />
            );
          }}
        </NotyContext.Consumer>
      );
    }
  };
}
