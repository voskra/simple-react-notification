import styled from 'styled-components';

const Button = styled.button`
    margin: 0;
    overflow: visible;
    text-transform: none;
    display: inline-block;
    box-sizing: border-box;
    margin: 5px;
    padding: 0 30px;
    vertical-align: middle;
    font-size: 14px;
    line-height: 38px;
    text-align: center;
    text-decoration: none;
    text-transform: uppercase;
    transition: .1s ease-in-out;
    transition-property: color,background-color,border-color;
    background-color: ${props => props.primary ? "#66BB6A;" : props.secondary ? "#FFCA28;" : props.danger ? "#EF5350;" : "#64B5F6;"}
    color: #222;
    border: none;
    cursor: pointer;
    &:hover, &:active, &:focus {
        opacity: 0.9;
        color: #222;
        outline: none;
    }
`;

export default Button;
