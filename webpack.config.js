const path = require("path");

const nodeExternals = require('webpack-node-externals');


module.exports = {
    entry: './src/p5-display.tsx',
    mode: "development",

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js"],
    },

    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "p5-display.js",
        libraryTarget: "umd",
        library: 'p5-display',
        umdNamedDefine: true
    },

    module: {
        rules: [
            {
                test: /\.ts(x?)$|.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "ts-loader"
                    }
                ]
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            }
        ]
    },

    // output:

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    // externals: {      
    //     // Don't bundle react or react-dom      
    //     "react": {          
    //         commonjs: "react",          
    //         commonjs2: "react",          
    //         amd: "React",          
    //         root: "React"      
    //     },      
    //     "react-dom": {          
    //         commonjs: "react-dom",          
    //         commonjs2: "react-dom",          
    //         amd: "ReactDOM",          
    //         root: "ReactDOM"      
    //     },
    //     p5: "p5",
    //     "styled-components": "styled-components" 
    // }
    externals: [nodeExternals()]
};