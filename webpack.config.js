const path = require('path');
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
    // entry: path.join(__dirname, "src/index.js"),
    entry: './src/index.tsx',
    output: {
        // path: path.join(__dirname, "dist"),
        path: path.join(__dirname, 'test'),
        filename: "conversu.js",
        assetModuleFilename: "[name].[ext]"
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(git|svg|jpg|png)$/,
                loader: "file-loader",
                options: {
                    limit: 10000,
                    name: "assets/[name].[ext]"
                },
            },
            {
                test: /\.js/,
                exclude: /node_modules|test/,
                options: {
                    cacheDirectory: true,
                    presets: [
                        "@babel/preset-env",
                        ["@babel/preset-react", { runtime: "automatic" }]
                    ]
                },
                loader: "babel-loader"
            },
            {
                test: /\.(tsx|ts)?$/,
                use: ['ts-loader'],
                exclude: /node_modules|test/,
            },
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".jsx", ".js"]
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()]
    }
}