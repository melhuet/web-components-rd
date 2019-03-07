# Introduction

In this project you find any custom component. All components must be follow webComponent standard. [demo](http://localhost:63342/web-components-rd/build-web-component/index.html?_ijt=4sq5cmh9q5078fi1puvkaq08hp)

# Installation

Run `npm install` at root project.

# Build

To build all component in this module you need to run:
  
 `npm run build`

Some time you want build only one component, to do that, run

    `npm run build:yourComponent`

A js file is create in `dist` folder. This file can be import in html file with
  
 `<script src="dist/youComponent.min.js"></script>`

# Development and debug

When you develop your component you can run:

    `npm run start -- --environment folder:yourComponent`

This task will be run a dev server (`http://localhost:10001/yourComponent/index.html`) by default.

You can put some breakpoint in your browser (F12 - sources - sourcemap). Livereload for display is available. If you made some changes in code and if you want see it in sourmap, you need to restart dev server.

Note: To configure your server you need to edit `rollup.dev.config.js` in `serve` function.

Know issue: You can't access at localhost adress with your personnal IP (useful when you want show to another people). To do this, please change server config in `rollup.dev.config.js`.

# How to add a new component

- Create a folder with component name
- Entry file should be `index.js`
- Add an script entry in package.json like:

  `"build:yourComponent": rollup -c --environment folder:yourComponent`

- Please update `index.html` at root project to complete showroom file :)

# Formatting

Before each commit, a hook is configure to prettier your js file. You can configure you IDE with prettier plugin.
