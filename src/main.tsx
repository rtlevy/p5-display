import * as ReactDOM from 'react-dom';
import * as React from 'react';
import * as p5 from 'p5';
// import p5 = require('p5');
import styled from 'styled-components';

export type P5Instance = p5 & {reset?: () => void};

export const P5Wrapper: React.FunctionComponent<P5WrapperProps> = function P5Wrapper(props) {

    const pRef: React.MutableRefObject<p5> = React.useRef(null);

    const containerRef = React.useCallback(node => {
        if (node !== null) {
            new p5((p) => {
                pRef.current = p

                props.sketch(p);

                if (!props.playing) {
                    p.noLoop();
                }
            }, node);
        }
    }, []);

    React.useEffect(() => {
        if (pRef.current) {
            if (props.playing) {
                pRef.current.loop();
            } else {
                pRef.current.noLoop();
            }
        }
    });

    return <div ref={containerRef}></div>;
};

export interface P5WrapperProps {
    sketch: (p: p5) => any,
    playing?: boolean
}

const P5DisplayContainer = styled.div`
    border: 2px solid black;
    display: inline-block;
    position: relative;
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

export const P5Display: React.FunctionComponent<P5DisplayProps> = function P5Display(props) {

    return <P5DisplayContainer>
        <P5Wrapper sketch={props.sketch} playing={props.playing} />
        {props.controls ?
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
    sketch: (p: p5) => any,
    playing?: boolean,
    controls?: boolean
    pausePlayPressed?: () => void,
    resetPressed?: () => void
}

const ControlButton = styled.button`
    display: inline-block;
    font-size: 14pt;
    background-image: none;
    background: #fafafa;
    padding: 4pt 6pt;
    margin: 3.5pt;

    &:focus {
        background: #f0f0f0;
        outline: none;
        opacity: 1;
    }

    &:active {
        background: #dddddd
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

export interface SketchState {
    sketch: (p: p5) => void,
    playing: boolean,
    setPlaying: (playing: boolean) => void,
    pRef: React.MutableRefObject<P5Instance>
}

export const P5DisplayStateful
    : React.FunctionComponent<{ sketchState: SketchState }>
    = (props) => {
        return <P5Display
            controls
            sketch={props.sketchState.sketch}
            playing={props.sketchState.playing}
            pausePlayPressed={() => props.sketchState.setPlaying(!props.sketchState.playing)}
            resetPressed={() => {
                if (props.sketchState.pRef.current) {
                    if (props.sketchState.pRef.current.reset) {
                        props.sketchState.pRef.current.reset();
                    }
                }
                props.sketchState.setPlaying(false);
            }}/>
    }

export function useSketchState(sketch: (p: P5Instance) => void, playing?: boolean): SketchState {

    const [playing_, setPlaying] = React.useState(playing);
    const pRef = React.useRef(null);

    const sketch_ = (p: p5) => {
        sketch(p);
        pRef.current = p;
    };

    return {
        sketch: sketch_,
        playing: playing_,
        setPlaying,
        pRef
    };
}