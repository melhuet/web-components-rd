const fs = require('fs');
const browserify  = require('browserify');

browserify("src/index.js")
        .transform("babelify", {presets: ["@babel/preset-env", "@babel/preset-react"]})
        .bundle()
        .pipe(fs.createWriteStream("dist/index.js"));
