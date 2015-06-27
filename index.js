"use strict";

function resolve() {
  var resolved = this.map(function resolveByCalling(something) {
    if(typeof something.resolve === "function") {
      return something.resolve();
    }
    return something;
  });
  if(typeof this[0] === "function") {
    return resolved[0].apply(null, resolved.slice(1));
  } else {
    return resolved;
  }
}

module.exports = function lispster(lisp) {
  var resolvable = lisp.map(function makeArraysResolvableRecursively(something) {
    if(something instanceof Array) {
      return lispster(something);
    }
    return something;
  });
  resolvable.resolve = resolve.bind(resolvable);
  return resolvable;
};
