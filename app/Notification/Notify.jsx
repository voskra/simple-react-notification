import React, { Component } from 'react';

class Notify extends Component {

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

export default Notify;
