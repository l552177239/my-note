'use strict';

var ghpages = require('gh-pages');

main();

function main() {
  ghpages.publish('./dist', console.error.bind(console));
}