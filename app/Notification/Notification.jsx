import React from 'react';
import events from 'events';
import Notify from "./Notify";

const eventEmitter = new events.EventEmitter();

const createUUID = () => {
    const pattern = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
    return pattern.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : ((r & 0x3) | 0x8);
        return v.toString(16);
    });
};

export const Notification = {
    render: function (props) {
        return <Notify {...props}/>;
    },
    list: [],
    addChangeListener: function (callback) {
        eventEmitter.addListener('change', callback);
    },
    removeChangeListener: function (callback) {
        eventEmitter.removeListener('change', callback);
    },
    create: function (notification) {
        const defaultNotification = {
            id: createUUID(),
            type: 'info',
            title: null,
            message: null,
            timeOut: 5000
        };
        Notification.list.push({...defaultNotification, ...notification});
        Notification.change();
    },
    remove: function (notification) {
        Notification.list = Notification.list.filter(n => notification.id !== n.id);
        Notification.change();
    },
    change: function () {
        eventEmitter.emit('change', Notification.list);
    },
    allTypes: function (type, title, message, timeOut, onClick) {
        let props = {type, title, message, timeOut, onClick};
        for (let i in props) {
            if (props[i] === undefined) delete props[i];
        }
        Notification.create(props);
    },
    success: function (...props) {
        Notification.allTypes('success', ...props);
    },
    warning: function (...props) {
        Notification.allTypes('warning', ...props);
    },
    error: function (...props) {
        Notification.allTypes('error', ...props);
    },
    info: function (...props) {
        Notification.allTypes('info', ...props);
    }
};
