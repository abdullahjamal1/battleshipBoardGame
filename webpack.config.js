const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
    mode: "development",
    entry: './src/index.ts',
    plugins: [
        new Dotenv()
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        static: './dist',
    }
};