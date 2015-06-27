"use strict";

function lispster(lisp, scope) {
  if(!scope) {
    scope = {};
  }
  if(!(lisp instanceof Array)) {
    return lisp;
  }
  if(lisp[0] && lisp[0]._lispster_macro) {
    return lisp[0]._lispster_macro.apply(scope, lisp.slice(1));
  }
  var computed = lisp.map(function makeArraysResolvableRecursively(something) {
    return lispster(something, scope);
  });
  if(typeof computed[0] === "function") {
    return computed[0].apply(scope, computed.slice(1));
  } else {
    return computed;
  }
}
exports.lispster = lispster;

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

var letVar = {
  _lispster_macro: function createLet(assignments, block) {
    var scope = {};
    Object.keys(this).forEach(function copyScope(key) {
      scope[key] = this[key];
    }.bind(this));
    Object.keys(assignments).forEach(function doAssignments(assignment) {
      scope[assignment] = lispster(assignments[assignment], this);
    }.bind(this));
    return lispster(block, scope);
  }
};
exports.letVar = letVar;
