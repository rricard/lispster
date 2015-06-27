"use strict";

function lispster(lisp, scope) {
  if(!scope) {
    scope = {};
  }
  if(lisp[0] && lisp[0]._lispster_macro) {
    return lisp[0]._lispster_macro.apply(scope, lisp.slice(1));
  }
  var computed = lisp.map(function makeArraysResolvableRecursively(something) {
    if(something instanceof Array) {
      return lispster(something, scope);
    }
    return something;
  });
  if(typeof computed[0] === "function") {
    return computed[0].apply(scope, computed.slice(1));
  } else {
    return computed;
  }
}
exports.lisp = lispster;

var lambda = {
  _lispster_macro: function createLambda(argNames, block) {
    var scope = {};
    Object.keys(this).forEach(function copyScope(key) {
      scope[key] = this[key];
    }.bind(this));
    return function lambda() {
      var argIdx = 0;
      var lambdaArguments = arguments;
      argNames.forEach(function hashArgs(argName) {
        scope[argName] = lambdaArguments[argIdx];
        argIdx ++;
      });
      return lispster(block, scope);
    };
  }
};
exports.lambda = lambda;

function v(varName) {
  return this[varName];
};
exports.v = v;
