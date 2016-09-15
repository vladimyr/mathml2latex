'use strict';

const test = require('tape');
const Path = require('path');
const fs = require('fs');
const convert = require('../convert.js');

function readFixture(path) {
  return fs.readFileSync(Path.join(__dirname, path), 'utf8');
}

function createTest(options) {
  return t => {
    t.plan(1);
    let result = convert(readFixture(options.input));
    t.equals(result, options.expected);
  };
}

// example sources: https://developer.mozilla.org/en-US/docs/Mozilla/MathML_Project/MathML_Torture_Test
// reference converter: http://johnmacfarlane.net/texmath.html
// verify output: https://khan.github.io/KaTeX/

test('converting equation', createTest({
  input: './fixtures/equation.mathml',
  expected: 'PV = \\frac{FV}{\\left(1 + r\\right)^{T}} = \\frac{\\$1,000}{\\left(1.05\\right)^{30}} = \\$231.38'
}));

test('converting fractions', createTest({
  input: './fixtures/fractions.mathml',
  expected: 'a_{0} + \\frac{1}{a_{1} + \\frac{1}{a_{2} + \\frac{1}{a_{3} + \\frac{1}{a_{4}}}}}'
}));

test('converting sums', createTest({
  input: './fixtures/sums.mathml',
  expected: '\\sum\\limits_{i = 1}^{p}\\sum\\limits_{j = 1}^{q}\\sum\\limits_{k = 1}^{r}a_{ij}b_{jk}c_{ki}'
}));

test('converting complex sum', createTest({
  input: './fixtures/complex-sum.mathml',
  expected: '\\sum\\limits_{\\frac{0 \\leq i \\leq m}{0 < j < n}}P\\left(i,j\\right)'
}));

/*test('converting tables', createTest({
  input: './fixtures/tables.mathml',
  expected: '\\sum\\limits_{i = 1}^{p}\\sum\\limits_{j = 1}^{q}\\sum\\limits_{k = 1}^{r}a_{ij}b_{jk}c_{ki}'
}));*/

test('converting roots', createTest({
  input: './fixtures/roots.mathml',
  expected: '\\sqrt{1 + \\sqrt{1 + \\sqrt{1 + \\sqrt{1 + \\sqrt{1 + \\sqrt{1 + \\sqrt{1 + x}}}}}}}'
}));

test('converting function family', createTest({
  input: './fixtures/function-family.mathml',
  expected: '\\sqrt{1 + \\sqrt{1 + \\sqrt{1 + \\sqrt{1 + \\sqrt{1 + \\sqrt{1 + \\sqrt{1 + x}}}}}}}'
}));
