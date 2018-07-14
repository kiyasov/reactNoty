import React, { Component } from 'react';

import PropTypes from 'prop-types';
import EventEmitter from 'events';

import NotyContainer from './components/NotyContainer';
import _ from 'lodash';

const positionList = [
  'topRight',
  'topLeft',
  'top',
  'bottom',
  'bottomLeft',
  'bottomRight',
  'topCenter',
  'center',
  'centerLeft',
  'centerRight',
  'bottomCenter'
];

export default class Noty extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFirst: true,
      notyList: [],
      notyQueue: []
    };

    this.Emitter = new EventEmitter();
    this.notyRef = {};
  }

  componentDidMount() {
    window.addEventListener('blur', this.resetTtl);

    window.addEventListener('focus', this.resumeAll);
  }

  resetTtl = () => {
    const {
      state: { notyList },
      notyRef
    } = this;

    for (let noty of notyList) {
      notyRef[noty.id].resetTtl();
    }
  };

  resumeAll = () => {
    const {
      state: { notyList },
      notyRef
    } = this;

    for (let noty of notyList) {
      notyRef[noty.id].setInterval();
    }
  };

  static defaultProps = {
    maxVisible: 5,
    type: 'alert',
    title: '',
    text: '',
    ttl: 4000,
    position: 'topRight',
    animate: {
      open: 'bounceInRight',
      close: 'bounceOutRight'
    },
    isProgressBar: true,
    isCloseButton: true,
    isButton: false,
    isVisibility: true,
    template: false,
    props: {},
    theme: 'relax'
  };

  static propTypes = {
    maxVisible: PropTypes.number,
    type: PropTypes.string,
    ttl: (props, propName, componentName) =>
      !(
        _.toInteger(props[propName]) === 0 ||
        _.toInteger(props[propName]) >= 1000
      ) &&
      new Error(
        `Invalid prop ${propName} supplied to ${componentName} Validation failed. \n Minimal ttl 1000`
      ),
    template: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    position: PropTypes.oneOf(positionList),
    animate: PropTypes.shape({
      open: PropTypes.string,
      close: PropTypes.string
    }),
    isProgressBar: PropTypes.bool,
    isCloseButton: PropTypes.bool,
    isButton: PropTypes.bool,
    text: PropTypes.string,
    title: PropTypes.string,
    isVisibility: PropTypes.bool,
    props: PropTypes.object,
    theme: PropTypes.string
  };

  show = async (settings = {}) => {
    const {
      state: { notyList, notyQueue, isFirst },
      props: { maxVisible },
      notyRef
    } = this;

    if (isFirst) {
      await new Promise(resolve => setTimeout(resolve, 100));

      this.setState({
        isFirst: false
      });
    }

    const thisNoty = {
      ...this.props,
      ...settings,
      id: _.uniqueId('noty_'),
      emitter: new EventEmitter(),
      on: function(...props) {
        this.emitter.on(...props);
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
      this.setState({
        notyQueue: _.concat(notyQueue, thisNoty)
      });

      this.Emitter.emit('onQueue', {
        type: 'push',
        noty: thisNoty
      });
    } else {
      this.setState({
        notyList: _.concat(notyList, thisNoty)
      });
    }

    return thisNoty;
  };

  queueShift = () => {
    const { notyQueue, notyList } = this.state;

    if (notyQueue.length > 0) {
      const noty = notyQueue.shift();

      this.Emitter.emit('onQueue', {
        type: 'shift',
        noty
      });

      this.setState({
        notyQueue,
        notyList: _.concat(notyList, noty)
      });
    }
  };

  on = (...props) => this.Emitter.on(...props);

  onClose = (id, type = 0) => {
    const { notyList } = this.state;

    if (type) this.emit('onClick', id);

    this.emit('onClose', id);

    this.setState({
      notyList: _.filter(notyList, e => e.id !== id)
    });

    this.queueShift();
  };

  emit = (alias, id) => {
    const { notyList } = this.state;
    const noty = _.find(notyList, ['id', id]);

    if (noty) {
      noty.emitter.emit(alias, noty);
      this.Emitter.emit(alias, noty);
    }
  };

  closeAll = () => {
    const { notyList } = this.state;

    this.setState({
      notyList: _.map(notyList, e => {
        e.ttl = 0;
        return e;
      })
    });

    this.Emitter.emit('onCloseAll', notyList);
  };

  render() {
    const { notyList } = this.state;

    return positionList.map(position => (
      <div key={position} id={`noty_layout__${position}`}>
        {_
          .filter(notyList, ['position', position])
          .map(noty => (
            <NotyContainer
              ref={e => (this.notyRef[noty.id] = e)}
              key={noty.id}
              {...noty}
              onClose={this.onClose}
              emit={this.emit}
            />
          ))}
      </div>
    ));
  }
}
