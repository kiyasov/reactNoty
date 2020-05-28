import React, { Component, Fragment, useState, useEffect } from "react";

import PropTypes from "prop-types";
import EventEmitter from "events";

import { NotyContext } from "./NotyContext";
import NotyContainer from "./components/NotyContainer";
import _ from "lodash";

const positionList = [
  "topRight",
  "topLeft",
  "top",
  "bottom",
  "bottomLeft",
  "bottomRight",
  "topCenter",
  "center",
  "centerLeft",
  "centerRight",
  "bottomCenter",
];

let Noty = (props) => {
  let [isFirst, setIsFirst] = useState(true);
  let [notyList, setNotyList] = useState([]);
  let [notyQueue, setNotyQueue] = useState([]);

  let emitter = new EventEmitter();
  let notyRef = {};

  let resetTtl = () => {
    for (let noty of notyList) {
      notyRef[noty.id].resetTtl();
    }
  };

  let resumeAll = () => {
    for (let noty of notyList) {
      notyRef[noty.id].setInterval();
    }
  };

  let show = async (settings = {}) => {
    const { maxVisible } = props;

    if (isFirst) {
      await new Promise((resolve) => setTimeout(resolve, 100));

      setIsFirst(false);
    } else {
      await new Promise((resolve) =>
        setTimeout(resolve, 100 * notyList.length)
      );
    }

    const newNoty = {
      ...props,
      ...settings,
      id: _.uniqueId("noty_"),
      emitter: new EventEmitter(),
      on: function (...props) {
        emitter.on(...props);
      },
      off: function (...props) {
        emitter.off(...props);
      },
      close: function () {
        notyRef[this.id].onClose();
      },
      stop: function () {
        notyRef[this.id].resetTtl();
      },
      resume: function () {
        notyRef[this.id].setInterval();
      },
    };

    if (maxVisible === notyList.length) {
      setNotyQueue(_.concat(notyQueue, newNoty));

      this.emitter.emit("onQueue", {
        type: "push",
        noty: newNoty,
      });
    } else {
      setNotyList(_.concat(notyList, newNoty));
    }

    return newNoty;
  };

  let queueShift = () => {
    if (notyQueue.length === 0) {
      return;
    }
    const noty = notyQueue.shift();

    emitter.emit("onQueue", {
      type: "shift",
      noty,
    });

    setNotyQueue(notyQueue);
    setNotyList(_.concat(notyList, noty));
  };

  let on = (...props) => emitter.on(...props);

  let emit = (alias, id) => {
    const noty = _.find(notyList, ["id", id]);

    if (noty) {
      noty.emitter.emit(alias, noty);
      emitter.emit(alias, noty);
    }
  };

  let onClose = (id, type = 0) => {
    switch (type) {
      case 1:
        emit("onClick", id);
        break;
      case 2:
        emit("onClickCloseButton", id);
        break;
    }

    emit("onClose", id);

    setNotyList(_.filter(notyList, (e) => e.id !== id));
    queueShift();
  };

  let closeAll = () => {
    setNotyList(
      _.map(notyList, (e) => {
        e.ttl = 0;
        return e;
      })
    );

    emitter.emit("onCloseAll", notyList);
  };

  useEffect(() => {
    window.addEventListener("blur", resetTtl);
    window.addEventListener("focus", resumeAll);
    // console.log(222, NotyContext._currentValue.changeContext({
    //   noty: {
    //     show: (...props) => show(...props),
    //     on: (...props) => on(...props),
    //     closeAll: (...props) => closeAll(...props),
    //   }
    // }));
  }, []);

  return (
    <NotyContext.Consumer>
      {({ notyContext, changeContext }) => {
        changeContext({
          noty: {
            show: (...props) => show(...props),
            on: (...props) => on(...props),
            closeAll: (...props) => closeAll(...props),
          },
        });
        return (
          <div id="notyContainer">
            {positionList.map((position) => (
              <div key={position} id={`noty_layout__${position}`}>
                {_.filter(notyList, ["position", position]).map((noty) => (
                  <NotyContainer
                    ref={(e) => (notyRef[noty.id] = e)}
                    key={noty.id}
                    {...noty}
                    onClose={onClose}
                    emit={emit}
                  />
                ))}
              </div>
            ))}
          </div>
        );
      }}
    </NotyContext.Consumer>
  );
};

Noty.defaultProps = {
  maxVisible: 5,
  type: "alert",
  title: "",
  text: "",
  ttl: 4000,
  position: "topRight",
  animate: {
    open: "bounceInRight",
    close: "bounceOutRight",
  },
  isProgressBar: true,
  isCloseButton: true,
  isButton: true,
  isVisibility: true,
  template: false,
  props: {},
  theme: "relax",
};

export default Noty;

// export default class Noty extends Component {
//   constructor(props) {
//     super(props);
//
//     this.state = {
//       isFirst: true,
//       notyList: [],
//       notyQueue: [],
//     };
//
//     this.Emitter = new EventEmitter();
//     this.notyRef = {};
//   }
//
//   componentDidMount() {
//     window.addEventListener("blur", this.resetTtl);
//
//     window.addEventListener("focus", this.resumeAll);
//   }
//
//   resetTtl = () => {
//     const {
//       state: { notyList },
//       notyRef,
//     } = this;
//
//     for (let noty of notyList) {
//       notyRef[noty.id].resetTtl();
//     }
//   };
//
//   resumeAll = () => {
//     const {
//       state: { notyList },
//       notyRef,
//     } = this;
//
//     for (let noty of notyList) {
//       notyRef[noty.id].setInterval();
//     }
//   };
//
//   static defaultProps = {
//     maxVisible: 5,
//     type: "alert",
//     title: "",
//     text: "",
//     ttl: 4000,
//     position: "topRight",
//     animate: {
//       open: "bounceInRight",
//       close: "bounceOutRight",
//     },
//     isProgressBar: true,
//     isCloseButton: true,
//     isButton: true,
//     isVisibility: true,
//     template: false,
//     props: {},
//     theme: "relax",
//   };
//
//   static propTypes = {
//     maxVisible: PropTypes.number,
//     type: PropTypes.string,
//     ttl: (props, propName, componentName) =>
//       !(
//         _.toInteger(props[propName]) === 0 ||
//         _.toInteger(props[propName]) >= 1000
//       ) &&
//       new Error(
//         `Invalid prop ${propName} supplied to ${componentName} Validation failed. \n Minimal ttl 1000`
//       ),
//     template: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
//     position: PropTypes.oneOf(positionList),
//     animate: PropTypes.shape({
//       open: PropTypes.string,
//       close: PropTypes.string,
//     }),
//     isProgressBar: PropTypes.bool,
//     isCloseButton: PropTypes.bool,
//     isButton: PropTypes.bool,
//     text: PropTypes.string,
//     title: PropTypes.string,
//     isVisibility: PropTypes.bool,
//     props: PropTypes.object,
//     theme: PropTypes.string,
//   };
//
//   show = async (settings = {}) => {
//     const {
//       state: { notyList, notyQueue, isFirst },
//       props: { maxVisible },
//       notyRef,
//     } = this;
//
//     if (isFirst) {
//       await new Promise((resolve) => setTimeout(resolve, 100));
//
//       this.setState({
//         isFirst: false,
//       });
//     } else
//       await new Promise((resolve) =>
//         setTimeout(resolve, 100 * notyList.length)
//       );
//
//     const thisNoty = {
//       ...this.props,
//       ...settings,
//       id: _.uniqueId("noty_"),
//       emitter: new EventEmitter(),
//       on: function (...props) {
//         this.emitter.on(...props);
//       },
//       off: function (...props) {
//         this.emitter.off(...props);
//       },
//       close: function () {
//         notyRef[this.id].onClose();
//       },
//       stop: function () {
//         notyRef[this.id].resetTtl();
//       },
//       resume: function () {
//         notyRef[this.id].setInterval();
//       },
//     };
//
//     if (maxVisible === notyList.length) {
//       this.setState({
//         notyQueue: _.concat(notyQueue, thisNoty),
//       });
//
//       this.Emitter.emit("onQueue", {
//         type: "push",
//         noty: thisNoty,
//       });
//     } else {
//       this.setState({
//         notyList: _.concat(notyList, thisNoty),
//       });
//     }
//
//     return thisNoty;
//   };
//
//   queueShift = () => {
//     const { notyQueue, notyList } = this.state;
//
//     if (notyQueue.length > 0) {
//       const noty = notyQueue.shift();
//
//       this.Emitter.emit("onQueue", {
//         type: "shift",
//         noty,
//       });
//
//       this.setState({
//         notyQueue,
//         notyList: _.concat(notyList, noty),
//       });
//     }
//   };
//
//   on = (...props) => this.Emitter.on(...props);
//
//   onClose = (id, type = 0) => {
//     const { notyList } = this.state;
//
//     switch (type) {
//       case 1:
//         this.emit("onClick", id);
//         break;
//       case 2:
//         this.emit("onClickCloseButton", id);
//         break;
//     }
//
//     this.emit("onClose", id);
//
//     this.setState({
//       notyList: _.filter(notyList, (e) => e.id !== id),
//     });
//
//     this.queueShift();
//   };
//
//   emit = (alias, id) => {
//     const { notyList } = this.state;
//     const noty = _.find(notyList, ["id", id]);
//
//     if (noty) {
//       noty.emitter.emit(alias, noty);
//       this.Emitter.emit(alias, noty);
//     }
//   };
//
//   closeAll = () => {
//     const { notyList } = this.state;
//
//     this.setState({
//       notyList: _.map(notyList, (e) => {
//         e.ttl = 0;
//         return e;
//       }),
//     });
//
//     this.Emitter.emit("onCloseAll", notyList);
//   };
//
//   render() {
//     const { notyList } = this.state;
//
//     return (
//       <Fragment>
//         <div id="notyContainer">
//           {positionList.map((position) => (
//             <div key={position} id={`noty_layout__${position}`}>
//               {_.filter(notyList, ["position", position]).map((noty) => (
//                 <NotyContainer
//                   ref={(e) => (this.notyRef[noty.id] = e)}
//                   key={noty.id}
//                   {...noty}
//                   onClose={this.onClose}
//                   emit={this.emit}
//                 />
//               ))}
//             </div>
//           ))}
//         </div>
//       </Fragment>
//     );
//   }
// }
