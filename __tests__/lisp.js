"use strict";

var lisp = require("..");

describe("lisp examples", () => {
  it("should translate simple function calls", () => {
    expect(lisp([(a, b) => a + b, 1, 2])).toBe(3);
  });
});
