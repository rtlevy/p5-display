A library of controllable React components for p5.js sketches.

# Usage

    npm install --save p5-display

p5-display is intended to be used with a bundling tool such as Webpack.
The library is written in Typescript and declaration files are included.

# Example (written in Typescript)

```tsx
import * as React from "react";
import * as ReactDOM from "react-dom";
import { P5DisplayStateful, useP5, P5Instance } from "p5-display";

const sketch = (p: P5Instance) => {
    let t = 0;

    p.setup = () => {
        p.createCanvas(500, 500);
    }

    p.draw = () => {
        p.rect(0,0, p.sin(t) * 250 + 250, p.cos(t) * 250 + 250);
        t += 0.01;
    }

    p.reset = () => {
        t = 0;
        p.clear();
        p.draw();
    }
}

function Example(props: {}) {
    return <P5DisplayStateful sketchState={useP5(sketch, false)}
        maxWidth={500}
        maxHeight={500} 
        className="(your css class here)" />
}

ReactDOM.render(
    <Example />, document.getElementById('content-root'));
```

# Building

    npm install
    npm run build

To build docs, run

    npm run docs