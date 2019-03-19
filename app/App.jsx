import React, { Component } from 'react';
import Notifications, {errorMessage, infoMessage, successMessage, warningMessage} from './Notification';
import "./Notification/style.css";
import Button from "./Components/Button";
import Divider from "./Components/Divider";
import NavBar from "./Components/NavBar";

class App extends Component {
    render() {
        return (
            <div className="flexed-column">
                <NavBar>Simple React Notifications</NavBar>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <Divider/>
                    <Button style={{width: '200px'}} onClick={()=>infoMessage('Title here', <Button onClick={()=>alert('Info')}>Go Go Info</Button>, null)}>GO INFO</Button>
                    <Divider/>
                    <Button style={{width: '200px'}} primary onClick={()=>successMessage('Title here', 'Title Success')}>GO SUCCESS</Button>
                    <Divider/>
                    <Button style={{width: '200px'}} secondary onClick={()=>warningMessage('Warning message')}>GO WARNING</Button>
                    <Divider/>
                    <Button style={{width: '200px'}} danger onClick={()=>errorMessage('Error message', 'Title here')}>GO ERROR</Button>
                    <Divider/>
                    <Notifications/>
                </div>
            </div>
        );
    }
}

export default App;
