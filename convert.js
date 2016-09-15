'use strict';

const et = require('elementtree');
const elements = require('./elements.js');
const contains = require('lodash.includes');

const SPECIAL_CHARS = /%|#|_|\$/g;
const LEFT_BRACES = /\(|\{|\[/g;
const RIGHT_BRACES = /\)|\}|\]/g;

const OPERATORS = /=|\+|<|≤/g;

function replace(text) {
  text = text.replace(SPECIAL_CHARS, char => `\\${ char }`);
  text = text.replace('∑', '\\sum');
  text = text.replace('≤', '\\leq');
  return text;
}

function parseOperator(node) {
  let op = node.text;
  op = op.replace(OPERATORS, op =>` ${ op } `);
  op = op.replace(/\{|\}/g, brace => `\\${brace}`);
  // op = op.replace(LEFT_BRACES, brace => `\\left${ brace }`);
  // op = op.replace(RIGHT_BRACES, brace => `\\right${ brace }`);
  // console.log(op);
  return replace(op);
}

function parseLeaf(node) {
  if (node.tag === 'mo') return parseOperator(node);

  // replace backslash and ampersand
  return replace(node.text);
}

function parseContainer(node, children) {
  let columns_ = [];
  if (node.tag === 'mtable') {
    columns_ = node.find('./mtr')
      .findall('./mtd')
      .map(column => {
        let align = column.get('columnalign') || 'left';
        return align[0];
      });
  }

  let blocks_ = children.map(node => parse(node));

  let template = elements[node.tag];
  if (template) {
    return template({ block, blocks, columns });
  } else {
    return blocks();
  }

  function columns() {
    return columns_.join('');
  }

  function block(i) {
    return blocks_[i];
  }

  function blocks(start, delimiter) {
    start = start || 0;
    delimiter = delimiter || '';
    return blocks_.slice(start).join(delimiter);
  }
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
