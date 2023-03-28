# webpack-glob-loader

ES6 import with glob patterns (preload for Webpack)

(Forked from [https://github.com/fred104/webpack-import-glob-loader](https://github.com/fred104/webpack-import-glob-loader))

Expands globbing patterns for ES6 `import` statements.

---

```js
import modules from "./foo/**/*.js";
```

Expands into

```js
import * as module0 from "./foo/1.js";
import * as module1 from "./foo/bar/2.js";
import * as module2 from "./foo/bar/3.js";

const modules = [module0, module1, module2]
```

---

For importing from node module

```js
import modules from "a-node-module/**/*js";
```

Expands into

```js
import * as module0 from "a-node-module/foo/1.js";
import * as module1 from "a-node-module/foo/bar/2.js";
import * as module2 from "a-node-module/foo/bar/3.js";

const modules = [module0, module1, module2]
```

---
__For side effects:__

```js
import "./foo/**/*.scss";
```

Expands into

```js
import "./foo/1.scss";
import "./foo/bar/2.scss";
```

---
__For sass:__

```scss
@import "./foo/**/*.scss";
```

Expands into

```scss
@import "./foo/1.scss";
@import "./foo/bar/2.scss";
```

---

## Install

```sh
npm install --save-dev webpack-glob-loader
```

## Usage

<!-- You can use it one of two ways, the recommended way is to use it as a preload -->

```js
// ./webpack.config.js

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        enforce: 'pre',
        loader: 'webpack-glob-loader'
      },
      {
        test: /\.s[ac]ss$/i,
        enforce: 'pre',
        use: [
          { loader: 'webpack-glob-loader' }
        ]
      }
      // ...etc.
    ]
    // ...etc.
  }
  // ...etc.
}
```

<!-- Alternatively you can use it as a chained loader
```js
// foo/bar.js
import "./**/*.js";

// index.js
import 'webpack-glob-loader!foo/bar.js';
``` -->
