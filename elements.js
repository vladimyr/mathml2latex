'use strict';

const t = require('lodash.template');

module.exports = {
  mfrac: t('\\frac{<%= blocks[0] %>}{<%= blocks[1] %>}'),
  msup: t('<%= blocks[0] %>^{<%= blocks[1] %>}'),
  msub: t('<%= blocks[0] %>_{<%= blocks[1] %>}'),
  msqrt: t('\\sqrt{<%= blocks[0] %>}'),
  mroot: t('\\sqrt[<%= blocks[1] %>]{<%= blocks[0] %>}'),
  mfenced: t('\\left(<%= blocks[0] %>\\right'),
  msubsup: t('<%= blocks[0] %>_{<%= blocks[1] %>}^{<%= blocks[2] %>}'),
  munderover: t('<%= blocks[0] %>\\limits_{<%= blocks[1] %>}^{<%= blocks[2] %>}'),
  munder: t('<%= blocks[0] %>_{<%= blocks[1] %>}'),
  mtable: t('\\matrix{<%= blocks_ %>}'),
  mtr: t('<%= blocks_ %>\\cr'),
  mtd: t('<%= blocks[0] %>&')
};
