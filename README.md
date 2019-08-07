# Simple React Notification

Simple React Notification allow you to add simple notification to your application.

[DEMO](https://voskra.github.io/simple-react-notification/)

## Usage

### Note: Use only one 'Notifications' component in the app.

```js
import React, { Component } from 'react';
import Notifications, {errorMessage, infoMessage, successMessage, warningMessage} from './Notification';
import "./Notification/style.css";

class App extends Component {
    render() {
        return (
            <div>
                <button onClick={()=>infoMessage({title:'Title here', message:<button onClick={()=>alert('Info')}>Go Go Info</button>})}>GO INFO</button>
                <button onClick={()=>successMessage({title:'Title here', message:'Title Success'})}>GO SUCCESS</button>
                <button onClick={()=>warningMessage({message:'Warning message', onClick:()=>alert('Click warning')})}>GO WARNING</button>
                <button onClick={()=>errorMessage({title:'Error message', message:'Title here',timeOut:500})}>GO ERROR</button>
                <Notifications/>
            </div>
        );
    }
}

export default App;
```
