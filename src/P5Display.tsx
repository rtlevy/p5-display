import styled from "styled-components";
import * as React from 'react';
import P5Wrapper from './P5Wrapper';
import P5Controls from "./P5Controls";
import { Sketch } from "./p5-display";

const P5DisplayContainer = styled.div<{ maxWidth: number, maxHeight: number }>`
    display: inline-block;
    position: relative;
    ${(props: any) => props.maxWidth ? `max-width: ${props.maxWidth}px` : ""}}
    ${(props: any) => props.maxHeight ? `max-height: ${props.maxHeight}px` : ""}}
    canvas {
        width: 100%;
        height: 100%;
        display: block;
    }
`;

const ControlContainer = styled.div`
    position: absolute;
    bottom: 10pt;
    right: 10pt

    opacity: .5;
    transition: opacity 0.6s;

    &:hover {
        opacity: 1;
    }

    &:active {
        opacity: 1;
    }
`

/**
 * Displays a p5 sketch with optional pause/play and reset controls
 */
export const P5Display: React.FunctionComponent<P5DisplayProps> = function P5Display(props) {
    const [canvasCreated, setCanvasCreated] = React.useState(false);

    return <P5DisplayContainer maxWidth={props.maxWidth} maxHeight={props.maxHeight}
        className={props.className}>
        <P5Wrapper sketch={props.sketch} playing={props.playing} onCanvasCreate={() => setCanvasCreated(true)} />
        {(props.controls && canvasCreated) ?
            <ControlContainer>
                <P5Controls
                    playing={props.playing}
                    pausePlayPressed={props.pausePlayPressed}
                    resetPressed={props.resetPressed}
                />
            </ControlContainer>
            : null}
    </P5DisplayContainer>;
}

export interface P5DisplayProps {
    /**
     * The sketch callback
     */
    sketch: Sketch,

    /**
     * Whether the sketch should loop() - use to implement
     * pause/play functionality
     */
    playing?: boolean,

    /**
     * Whether pause/play and reset controls should be rendered
     */
    controls?: boolean,

    /**
     * Called when the pause/play button is pressed
     */
    pausePlayPressed?: () => void,

    /**
     * Called when the reset button is pressed
     */
    resetPressed?: () => void,

    /**
     * The maximum width at which the component will render
     */
    maxWidth?: number,

    /**
     * The maximum height at which the component will render
     */
    maxHeight?: number,

    className?: string
}

export default P5Display;