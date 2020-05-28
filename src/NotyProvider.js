import React, {
  Component,
  Fragment,
  useState,
} from "react";
import PropTypes from "prop-types";
import Noty from "./Noty";
import propTypes from "./propTypes";
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
        ref={(c) => {
          changeContext({
            noty: {
              show: (...props) => c.show(...props),
              on: (...props) => c.on(...props),
              closeAll: (...props) => c.closeAll(...props),
            },
          });
          return (notyContext = c);
        }}
        {...props.rest}
      />
    </NotyContext.Provider>
  );
}

// export default class NotyProvider extends Component {
//   static childContextTypes = {
//     noty: propTypes
//   };
//
//   static propTypes = {
//     children: PropTypes.node.isRequired
//   };
//
//   getChildContext() {
//     return {
//       noty: {
//         show: (...props) => this.noty.show(...props),
//         on: (...props) => this.noty.on(...props),
//         closeAll: (...props) => this.noty.closeAll(...props)
//       }
//     };
//   }
//
//   render() {
//     const { children, ...rest } = this.props;
//
//     return (
//       <Fragment>
//         {children}
//         <Noty ref={c => (this.noty = c)} {...rest} />
//       </Fragment>
//     );
//   }
// }
