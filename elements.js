'use strict';

const t = require('lodash.template');

const table = t(` \\begin\\array{<%= columns() %>}
<%= blocks() %>
\\end{array} `);

module.exports = {
  mfrac: t('\\frac{<%= block(0) %>}{<%= block(1) %>}'),
  msup: t('<%= block(0) %>^{<%= block(1) %>}'),
  msub: t('<%= block(0) %>_{<%= block(1) %>}'),
  msqrt: t('\\sqrt{<%= blocks() %>}'),
  mroot: t('\\sqrt[<%= block(1) %>]{<%= block(0) %>}'),
  mfenced: t('\\left(<%= block(0) %>\\right'),
  msubsup: t('<%= block(0) %>_{<%= block(1) %>}^{<%= block(2) %>}'),
  munderover: t('<%= block(0) %>\\limits_{<%= block(1) %>}^{<%= block(2) %>}'),
  munder: t('<%= block(0) %>\\limits_{<%= block(1) %>}'),
  mtable: table,
  mtr: t('<%= blocks(0, ' & ') %>\\cr'),
  mtd: t('<%= block(0) %>')
};
