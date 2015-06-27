# LISPster.js

A lisp in javascript. Without the transpilation.

## Installation

Via npm/browserify:

```sh
npm i --save lispster
```

## Usage

Here is a stupid example while I find something smarter:

```js
var lispster = require("lispster");
var lisp = lispster.lispster;
var lambda = lispster.lambda;
var v = lispster.v;
var letVar = lispster.letVar;

function add(a, b) {
  return a + b;
}

function mul(a, b) {
  return a * b;
}

var myLispFunction = lisp(
  [lambda, ["x", "y", "z"],
    [letVar, {added: [add,
                       [v, "x"],
                       [v, "y"]]},
      [mul, [v, "added"], [v, "z"]]]]
);

myLispFunction(1, 2, 3); // => 9
```

Note that lispster is completely interoperable with JS.

## Test & contribute

You'll need io.js in order to test this library.

After that it's easy:

```sh
git clone git@github.com:rricard/lispster.git
cd lispster
npm i
npm t
```

Once you're able to test, PRs are welcome!

## Author

Robin Ricard

## License

MIT
