import styled from "styled-components";
import * as React from "react";

export const ControlButton = styled.button`
    display: inline-block;
    color: #212529;
    text-align: center;
    vertical-align: middle;
    background-color: #007bff;
    user-select: none;
    border: 1px solid transparent;
    padding: .2rem .5rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: .25rem;
    font-weight: 400;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    margin: 3.5pt;
    color: #fff;
    border-color: #007bff;

    &:active {
        color: #fff;
        background-color: #0062cc;
        border-color: #005cbf;
    }
`

export const P5Controls: React.FunctionComponent<P5ControlsProps> = function P5Controls(props) {
    return <div>
        <ControlButton onMouseDown={e => e.preventDefault()} onClick={props.pausePlayPressed}>{props.playing ? "Pause" : "Play"}</ControlButton>
        <ControlButton onMouseDown={e => e.preventDefault()} onClick={props.resetPressed}>Reset</ControlButton>
    </div>;
}

export interface P5ControlsProps {
    playing: boolean,
    pausePlayPressed?: () => void,
    resetPressed?: () => void
}

export default P5Controls;