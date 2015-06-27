"use strict";

jest.dontMock("..");
var lispster = require("..");
var lisp = lispster.lisp;
var lambda = lispster.lambda;
var v = lispster.getVar;

describe("lisp examples", () => {
  it("should translate simple function calls", () => {
    expect(lisp([(a, b) => a + b, 1, 2])).toBe(3);
    expect(lisp([(a, b) => a + b, [(a, b) => a * b, 3, 3], 2])).toBe(11);
  });

  it("should register lambdas", () => {
    expect(lisp([lambda, ["x", "y"], [(a, b) => a + b, [v, "x"], [v, "y"]]])(1, 2)).toBe(3);
    expect(lisp([[lambda, ["x", "y"], [(a, b) => a + b, [v, "x"], [v, "y"]]], 1, 2])).toBe(3);
  });
});
