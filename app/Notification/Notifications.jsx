import React, { Component } from 'react';
import {Notification} from "./Notification";

class Notifications extends Component {

    state = {
        notifications: []
    };

    componentWillMount = () => Notification.addChangeListener(this.addNotifications);

    componentWillUnmount = () => Notification.removeChangeListener(this.addNotifications);

    addNotifications = (notifications) => this.setState({notifications});

    requestHide = (notification) => Notification.remove(notification);

    render() {
        const {notifications} = this.state;

        return (
            <div className='notification-container'>
                {notifications.map(notification => {
                    const key = notification.id || new Date().getTime();
                    return <Notification.render key={key} onRequestHide={()=>this.requestHide(notification)} {...notification}/>;
                })}
            </div>
        );
    }
}

export default Notifications;
