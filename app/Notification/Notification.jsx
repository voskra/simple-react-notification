import React, {Component} from 'react';
import events from 'events';

const eventEmitter = new events.EventEmitter();

const createUUID = () => {
    const pattern = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
    return pattern.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : ((r & 0x3) | 0x8);
        return v.toString(16);
    });
};

let list = [];

export const addChangeListener = function (callback) {
    eventEmitter.addListener('change', callback);
};

export const removeChangeListener = function (callback) {
    eventEmitter.removeListener('change', callback);
};

const create = function (notification) {
    const defaultNotification = {
        id: createUUID(),
        type: 'info',
        title: null,
        message: null,
        timeOut: 5000
    };
    list.push({...defaultNotification, ...notification});
    change();
};

export const remove = function (notification) {
    list = list.filter(n => notification.id !== n.id);
    change();
};

const change = function () {
    eventEmitter.emit('change', list);
};

const allTypes = function (type, title, message, timeOut, onClick) {
    let props = {type, title, message, timeOut, onClick};
    for (let i in props) {
        if (props[i] === undefined) delete props[i];
    }
    create(props);
};

export const success = function (...props) {
    allTypes('success', ...props);
};

export const warning = function (...props) {
    allTypes('warning', ...props);
};

export const error = function (...props) {
    allTypes('error', ...props);
};

export const info = function (...props) {
    allTypes('info', ...props);
};

export class Notification extends Component {

    state = {
        classEnter: ' enter'
    };

    componentDidMount = () => {
        const { timeOut } = this.props;
        if (!!timeOut)
            this.timer = setTimeout(this.requestHide, timeOut);
        this.classTimer = setTimeout(()=>this.setState({classEnter: ''}), 50);
    };

    componentWillUnmount = () => {
        if (this.timer)
            clearTimeout(this.timer);
        if (this.classTimer)
            clearTimeout(this.classTimer);
    };

    handleClick = () => {
        const { onClick } = this.props;
        if (onClick) {
            onClick();
        }
        this.requestHide();
    };

    requestHide = () => {
        const { onRequestHide } = this.props;
        if (onRequestHide) {
            this.setState({classEnter: ' hide'});
            this.timer = setTimeout(()=>onRequestHide(), 500);
        }
    };

    render() {
        let {type, title, message} = this.props;
        let className = `notification${this.state.classEnter}`;
        if (!!type)
            className += ` notification-${type}`;
        title = title ? (<h4 className="title">{title}</h4>) : null;

        return (
            <div className={className} onClick={this.handleClick}>
                <div className="notification-message" role="alert">
                    {title}
                    <div className="message">{message}</div>
                </div>
            </div>
        );
    }
}
