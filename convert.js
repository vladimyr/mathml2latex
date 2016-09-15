'use strict';

const et = require('elementtree');
const elements = require('./elements.js');
const contains = require('lodash.includes');

const SPECIAL_CHARS = /%|#|_|\$/g;
const LEFT_BRACES = /\(|\{|\[/g;
const RIGHT_BRACES = /\)|\}|\]/g;

const OPERATORS = [ '=', '+' ];

function parseOperator(node) {
  let op = node.text;
  if (contains(OPERATORS, op)) return ` ${ op } `;
  op = op.replace(LEFT_BRACES, brace => `\\left${ brace }`);
  op = op.replace(RIGHT_BRACES, brace => `\\right${ brace }`);
  op = op.replace('∑', '\\sum');
  return op;
}

function parseLeaf(node) {
  if (node.tag === 'mo') return parseOperator(node);

  let text = node.text;
  text = text.replace(SPECIAL_CHARS, char => `\\${ char }`);
  text = text.replace('∑', '\\sum');

  return text;
  // replace backslash and ampersand
}

function parseContainer(node, children) {
  let blocks = children.map(node => parse(node));
  let blocks_ = blocks.join(' ');

  let template = elements[node.tag];
  if (template) return template({ blocks, blocks_ });

  return blocks.join('');
}

function parse(node) {
  let children = node.getchildren();

  if (!children || children.length === 0) {
    return parseLeaf(node);
  } else {
    return parseContainer(node, children);
  }
}

module.exports = function convert(str) {
  let root = et.parse(str).getroot();
  return parse(root);
};
