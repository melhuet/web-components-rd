# Introduction

In this project you find any custom component. All components must be follow webComponent standard. You can see a demo of all components. Open `demo.html` after launch `npm install && npm run build`

# Installation

Run `npm install` at root project.

# Build

To build all component in this module you need to run:

    npm run build

Some time you want build only one component, to do that, run

    npm run build:yourComponent

A js file is create in `dist` folder. This file can be import in html file with

`<script src="dist/youComponent.min.js"></script>`

# Development and debug

When you develop your component you can run:

    npm run start -- --environment folder:yourComponent

This task will be run a dev server (`http://localhost:10001/yourComponent/index.html`) by default.

You can put some breakpoint in your browser (F12 - sources - sourcemap). Livereload for display is available. If you made some changes in code and if you want see it in sourmap, you need to restart dev server.

Note: To configure your server you need to edit `rollup.dev.config.js` in `serve` function.

Know issue: You can't access at localhost adress with your personnal IP (useful when you want show to another people). To do this, please change server config in `rollup.dev.config.js`.

# How to add a new component

- Create a folder with component name in `elements`
- Entry file should be `index.js`
- Add an script entry in package.json like:

  `"build:yourComponent": rollup -c --environment folder:yourComponent`

- Please update `demo.html` at root project to complete showroom file :)

# Formatting

Before each commit, a hook is configure to prettier your js file. You can configure you IDE with prettier plugin.

# Babel configuration

`{ "exclude": "node_modules/**", "presets": [ [ "@babel/env", { "modules": "false", "useBuiltIns": "usage" } ] ], "plugins": [ [ "@babel/plugin-transform-runtime", { "corejs": false } ] ] }`

- Use @babel/env preset: We use this plugin to compile a bundle based on targeted environments (defined in browserslist config in package.json), so we need to add polyfills (espacially for IE11). This plugin is based on core-js library which contains all polyfills we need (polyfills such as Promise, Set or Map but also instance methods such as array.find).
  - modules=false
  - useBuiltIns=usage => this option allows to reduce the bundle size because it adds only polyfills needed in our js code, always based on targeted environments, and not all. This option adds appropriated core-js imports.
- Use @babel/plugin-transform-runtime plugin:
  - helpers=true (default) and runtimeHelpers=true in rollup config => we use this plugin to deduplicate and encapsulate babel helpers (js functions that babel has added at the top of each file to compile the code).
  - core-js=false (default): we could use this option to encapsulate polyfills code from core-js (to avoid pollute global context, see issue below) but it does not work with instance methods... Another reason we are not using it is that webcomponentsjs polyfills already contains global ES6 polyfills such as Promise, Set or Map...

# Issues

- Final js bundle contains for now global polyfills (instance methods) which pollute global namespace. This can be problematic for a library bundle, because it's can bring conflicts with other js library included in a parent application. Indeed, @babel/env (through useBuiltIns usage option) is based on core-js@2, which add global polyfill
  To avoid this, we should include polyfills base on core-js-pure (it's equivalent to core-js but without global namespace pollution) which is including in core-js@3, but still in beta version for now [current state here #7646](https://github.com/babel/babel/pull/7646). As soon as Babel depends on core-js@3, you can use a babel configuration as following:

`{ "exclude": "node_modules/**", "presets": [ [ "@babel/env", { "modules": "false", "useBuiltIns": "corejs3" } ] ], "plugins": [ [ "@babel/plugin-transform-runtime", { "corejs": false } ] ] }`
