import * as p5 from 'p5';
import * as React from 'react';
import styled from 'styled-components';

import P5Wrapper from "./P5Wrapper";
import P5Controls from './P5Controls';
import P5Display from './P5Display';

/**
 * The p5 instance object with a reset method added on.
 */
export type P5Instance = p5 & { reset?: () => void, canvasRef?: HTMLCanvasElement };

/**
 * p5 Sketch callback
 */
export type Sketch = (p: P5Instance) => void

export { P5Wrapper } from "./P5Wrapper";
export { P5Controls } from "./P5Controls";
export { P5Display } from "./P5Display";
export * from "./stateful";