import { Sketch, P5Instance } from "./p5-display";
import * as React from "react";
import p5 = require("p5");

/**
 * Wraps a p5.js instance
 */
export const P5Wrapper: React.FunctionComponent<P5WrapperProps> = function P5Wrapper(props) {
    /**
     * Ref to the p5 instance object
     */
    const pRef: React.MutableRefObject<P5Instance> = React.useRef(null);

    /**
     * When the component is mounted, create
     * a p5 instance inside of it.
     */
    const containerRef = React.useCallback((node: HTMLDivElement) => {
        if (node !== null) {
            // Instantiate p5
            new p5((p: P5Instance) => {
                pRef.current = p

                /**
                 * Extend the createCanvas() method to get a reference
                 * to the p5 canvas
                 */
                const createCanvas_ = p.createCanvas.bind(p);
                p.createCanvas = (...args) => {
                    const renderer = createCanvas_(...args);
                    // Erase the default inline style so that it doesn't override custom styles
                    renderer.elt.style = "";
                    p.canvasRef = renderer.elt;
                    return renderer;
                };

                // Run the passed sketch callback
                props.sketch(p);

                // Extend the setup() method
                if (p.setup) {
                    const setup_ = p.setup.bind(p);
                    p.setup = (...args) => {
                        setup_();
                        // Call the onCanvasCreate callback after setup
                        if (props.onCanvasCreate) {
                            props.onCanvasCreate();
                        }
                    };
                }

                // Stop the sketch from looping if the playing prop is false
                if (!props.playing) {
                    p.noLoop();
                }
            }, node);
        }
    }, []);

    // Pause/play based on the playing prop
    React.useLayoutEffect(() => {
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
     * Called after the setup() method
     */
    onCanvasCreate?: () => void,

    className?: string
}

export default P5Wrapper;