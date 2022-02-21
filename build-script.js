const fs = require('fs-extra');
const concat = require('concat');

(async () => {
  const files = [
    './dist/gh-vote/main.js',
    './dist/gh-vote/polyfills.js'
  ]
  await concat(files, 'dist/gh-vote.js')
})()
