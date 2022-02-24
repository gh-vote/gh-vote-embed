const fs = require('fs-extra');
const concat = require('concat');

(async () => {
  const files = [
    './dist/gh-vote-embed/main.js',
    './dist/gh-vote-embed/polyfills.js'
  ]
  await concat(files, 'dist/gh-vote.js')
})()
