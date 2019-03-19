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
                <button onClick={()=>infoMessage('Title here', <button onClick={()=>alert('Info')}>Go Go Info</button>, null)}>GO INFO</button>
                <button onClick={()=>successMessage('Title here', 'Title Success')}>GO SUCCESS</button>
                <button onClick={()=>warningMessage('Warning message')}>GO WARNING</button>
                <button onClick={()=>errorMessage('Error message', 'Title here')}>GO ERROR</button>
                <Notifications/>
            </div>
        );
    }
}

export default App;
```
