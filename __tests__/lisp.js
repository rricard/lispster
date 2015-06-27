"use strict";

jest.dontMock("..");
var lisp = require("..");

describe("lisp examples", () => {
  it("should translate simple function calls", () => {
    expect(lisp([(a, b) => a + b, 1, 2]).resolve()).toBe(3);
    expect(lisp([(a, b) => a + b, [(a, b) => a * b, 3, 3], 2]).resolve()).toBe(11);
  });
});
