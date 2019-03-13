import React, { Component } from 'react';
import {addChangeListener, Notification, removeChangeListener, remove} from "./Notification";

class Notifications extends Component {

    state = {
        notifications: []
    };

    componentWillMount = () => addChangeListener(this.addNotifications);

    componentWillUnmount = () => removeChangeListener(this.addNotifications);

    addNotifications = (notifications) => this.setState({notifications});

    requestHide = (notification) => remove(notification);

    render() {
        const {notifications} = this.state;

        return (
            <div className='notification-container'>
                {notifications.map(notification => {
                    const key = notification.id || new Date().getTime();
                    return <Notification key={key} onRequestHide={()=>this.requestHide(notification)} {...notification}/>;
                })}
            </div>
        );
    }
}

export default Notifications;
