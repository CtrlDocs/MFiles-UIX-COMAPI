const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = [{
        // Configuration for the non-minified bundle
        mode: 'development', // Set mode to development for non-minified output
        entry: './src/index.js', // Entry point for the non-minified bundle
        output: {
            filename: 'mfiles-uix-comapi.js', // Output file name for non-minified bundle
            path: path.resolve(__dirname, 'dist'), // Output directory
        },
        devtool: 'source-map', // Generate source maps for development
        module: {
            rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'], // Transpile ES6+ to ES5
                    },
                },
            }, ],
        },
    },
    {
        // Configuration for the minified bundle
        mode: 'production', // Set mode to production for minified output
        entry: './src/index.js', // Entry point for the minified bundle
        output: {
            filename: 'mfiles-uix-comapi.min.js', // Output file name for minified bundle
            path: path.resolve(__dirname, 'dist'), // Output directory
        },
        devtool: 'source-map', // Generate source maps for production
        module: {
            rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'], // Transpile ES6+ to ES5
                    },
                },
            }, ],
        },
        optimization: {
            minimize: true, // Enable minimization
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        output: {
                            comments: false, // Remove comments in minified version
                        },
                    },
                    extractComments: false, // Do not extract comments to a separate file
                }),
            ],
        },
    },
];