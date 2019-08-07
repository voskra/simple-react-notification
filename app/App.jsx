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
                    <Button style={{width: '200px'}}
                            onClick={()=>infoMessage({title:'Title here', message:<Button onClick={()=>alert('Info')}>Go Go Info</Button>})}>
                        GO INFO
                    </Button>
                    <Divider/>
                    <Button style={{width: '200px'}} primary
                            onClick={()=>successMessage({title:'Title here', message:'Title Success'})}>GO SUCCESS</Button>
                    <Divider/>
                    <Button style={{width: '200px'}} secondary
                            onClick={()=>warningMessage({message:'Warning message',title:<div>Title</div>, onClick:()=>alert('Click warning')})}>GO WARNING</Button>
                    <Divider/>
                    <Button style={{width: '200px'}} danger
                            onClick={()=>errorMessage({message:'Title here',timeOut:500})}>GO ERROR</Button>
                    <Divider/>
                    <Notifications/>
                </div>
            </div>
        );
    }
}

export default App;
