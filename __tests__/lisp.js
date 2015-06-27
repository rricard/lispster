"use strict";

jest.dontMock("..");
var lispster = require("..");
var lisp = lispster.lispster;
var lambda = lispster.lambda;
var v = lispster.v;
var letVar = lispster.letVar;

var add = (a, b) => a + b;
var mul = (a, b) => a * b;

describe("lisp examples", () => {
  it("should translate simple function calls", () => {
    expect(lisp([add, 1, 2])).toBe(3);
    expect(lisp([add, [mul, 3, 3], 2])).toBe(11);
  });

  it("should register lambdas", () => {
    expect(lisp(
      [lambda, ["x", "y"],
        [add, [v, "x"], [v, "y"]]]
    )(1, 2)).toBe(3);
    expect(lisp(
      [[lambda, ["x", "y"],
        [add, [v, "x"], [v, "y"]]],
       1, 2]
    )).toBe(3);
  });

  it("should register lets", () => {
    expect(lisp(
      [letVar, {x: 1,
                y: 2},
        [add, [v, "x"], [v, "y"]]]
    )).toBe(3);
    expect(lisp(
      [letVar, {x: 1,
                y: 2},
        [letVar, {y: 1},
          [add, [v, "x"], [v, "y"]]]]
    )).toBe(2);
    expect(lisp(
      [letVar, {x: 1,
                y: 2},
        [add,
          [letVar, {y: 1},
            [v, "x"]],
          [v, "y"]]]
    )).toBe(3);
    expect(lisp(
      [letVar, {a: [add, 1, 2]},
        [v, "a"]]
    )).toBe(3);
  });

  it("should handle multiple kind of scopes", () => {
    expect(lisp(
      [lambda, ["x", "y", "z"],
        [letVar, {added: [add,
                           [v, "x"],
                           [v, "y"]]},
          [mul, [v, "added"], [v, "z"]]]]
    )(1, 2, 3)).toBe(9);
  });
});
