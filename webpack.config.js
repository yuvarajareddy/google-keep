const Htmlwebpackpluging = require('html-webpack-plugin');

module.exports = {

entry: "./src/index.js",

output: {

path: __dirname + "/dist",

filename: "bundle.js"

},

plugins: [

new Htmlwebpackpluging({template: './index.html'})

], 

module : {

rules : [

{

test: "/\.js$/",

loader: ['bable-loader'],

exclude: "/node_modules/"

}

]

}

}