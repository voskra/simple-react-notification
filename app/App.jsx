import React, { Component } from 'react';
import Notifications, {Notification} from './Notification';
import "./Notification/style.css";

class App extends Component {
    render() {
        return (
            <div>
                <button onClick={()=>Notification.info('Title here', <button onClick={()=>alert('Info')}>Go Go Info</button>, null)}>GO INFO</button>
                <button onClick={()=>Notification.success('Title here', 'Title Success')}>GO SUCCESS</button>
                <button onClick={()=>Notification.warning('Warning message')}>GO WARNING</button>
                <button onClick={()=>Notification.error('Error message', 'Title here')}>GO ERROR</button>
                <Notifications/>
            </div>
        );
    }
}

export default App;
