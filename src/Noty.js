import React, { useContext, useState, useEffect } from "react";
import EventEmitter from "events";
import _ from "lodash";

import { useMount, createGlobalState } from "react-use";

import { NotyContext } from "./NotyContext";
import NotyContainer from "./components/NotyContainer";
import useNoty from "./hooks/useNoty";

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
  "bottomCenter"
];

const useNotyList = createGlobalState([]);

let Noty = props => {
  let { changeContext } = useContext(NotyContext);
  let [notyList, setNotyList] = useNotyList();
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
    await new Promise(resolve => setTimeout(resolve, 100 * notyList.length));

    const newNoty = {
      ...props,
      ...settings,
      id: _.uniqueId("noty_"),
      emitter: new EventEmitter(),
      on: function(...props) {
        emitter.on(...props);
      },
      off: function(...props) {
        emitter.off(...props);
      },
      close: function() {
        notyRef[this.id].onClose();
      },
      stop: function() {
        notyRef[this.id].resetTtl();
      },
      resume: function() {
        notyRef[this.id].setInterval();
      }
    };

    if (maxVisible === notyList.length) {
      setNotyQueue(_.concat(notyQueue, newNoty));

      emitter.emit("onQueue", {
        type: "push",
        noty: newNoty
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
      noty
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

    setNotyList(_.filter(notyList, e => e.id !== id));
    queueShift();
  };

  let closeAll = () => {
    setNotyList(
      _.map(notyList, e => {
        e.ttl = 0;
        return e;
      })
    );

    emitter.emit("onCloseAll", notyList);
  };

  useEffect(() => {
    window.addEventListener("blur", resetTtl);
    window.addEventListener("focus", resumeAll);
    let { setInterface } = useNoty();
    setInterface({
      show: (...props) => show(...props),
      on: (...props) => on(...props),
      closeAll: (...props) => closeAll(...props)
    });
  }, []);

  useEffect(() => {
    let { setInterface } = useNoty();
    setInterface({
      show: (...props) => show(...props),
      on: (...props) => on(...props),
      closeAll: (...props) => closeAll(...props)
    });
    changeContext({
      show: (...props) => show(...props),
      on: (...props) => on(...props),
      closeAll: (...props) => closeAll(...props)
    });
  }, [notyList.length]);

  useMount(() => {
    changeContext({
      show: (...props) => show(...props),
      on: (...props) => on(...props),
      closeAll: (...props) => closeAll(...props)
    });
  });

  return (
    <div id="notyContainer">
      {positionList.map(position => (
        <div key={position} id={`noty_layout__${position}`}>
          {_.filter(notyList, ["position", position]).map(noty => (
            <NotyContainer
              ref={e => (notyRef[noty.id] = e)}
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
    close: "bounceOutRight"
  },
  isProgressBar: true,
  isCloseButton: true,
  isButton: true,
  isVisibility: true,
  template: false,
  props: {},
  theme: "relax"
};

export default Noty;
