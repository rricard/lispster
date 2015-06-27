"use strict";

module.exports = function lispster(lisp) {
  var computed = lisp.map(function makeArraysResolvableRecursively(something) {
    if(something instanceof Array) {
      return lispster(something);
    }
    return something;
  });
  if(typeof computed[0] === "function") {
    return computed[0].apply(null, computed.slice(1));
  } else {
    return computed;
  }
};
