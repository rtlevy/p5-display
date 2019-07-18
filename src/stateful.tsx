import styled from "styled-components";
import * as React from 'react';
import P5Wrapper from './P5Wrapper';
import P5Controls from "./P5Controls";
import { Sketch, P5Instance, P5Display } from "./p5-display";

/**
 * State of a P5DisplayStateful - managed using the useP5 hook.
 */
export interface SketchState {
    sketch: Sketch,
    playing: boolean,
    setPlaying: (playing: boolean) => void,
    pRef: React.MutableRefObject<P5Instance>
}

/**
 * P5Display whose state is managed through the useP5 hook.
 * @param props 
 */
export const P5DisplayStateful
    : React.FunctionComponent<{
        sketchState: SketchState, maxWidth?: number, maxHeight?: number, className?: string
    }> = (props) => {
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
            }} maxWidth={props.maxWidth} maxHeight={props.maxHeight} className={props.className} />
    };

/**
 * Hook to manage the state of a P5DisplayStateful component
 * @param sketch the sketch callback
 * @param playing whether the sketch should start playing when loaded
 */
export function useP5(sketch: (p: P5Instance) => void, playing?: boolean): SketchState {

    const [playing_, setPlaying] = React.useState(playing);
    const pRef = React.useRef(null);

    const sketch_ = (p: P5Instance) => {
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