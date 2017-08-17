'use strict';

const icon = require('../assets/icon.png');
const generator = require('generate-password');

const plugin = ({ term, display, actions }) => {

  const match = term.match(/pwgen(?:\s(\d+))?/);

  if (match) {

    let passwords = generator.generateMultiple(5, {
      length: match[1] || 16,
      numbers: true,
      symbols: true,
      excludeSimilarCharacters: true,
      exclude: '"',
      strict: true
    });

    let results = [];

    for (let pw of passwords) {
      results.push({
          title: pw,
          icon,
          clipboard: pw,
          onSelect: () => {
            actions.copyToClipboard(pw);
          },
          getPreview: () => {
            return `<div> ${pw}</div>`
          }
      })
    }

    display(results);
 };
}

module.exports = {
  fn: plugin,
  name: 'Srong password generator',
  keyword: 'pwgen',
  icon,
};