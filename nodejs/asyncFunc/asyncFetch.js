var fetch = require('node-fetch');
var url = 'https://tc39.github.io/ecma262/';
async function getTitle(url) {
  let response = await fetch(url);
  let html = await response.text();
  return html.match(/<title>([\s\S]+)<\/title>/i)[1];
}
getTitle(url).then(console.log);