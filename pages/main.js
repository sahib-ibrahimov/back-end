const fs = require('fs').promises;

async function getHTML(fileName) {
  const html = await fs.readFile(
    `./module/${fileName}.html`, 'utf8'
  );
  return html;
}

const express = require('express');
const server = express();

server.get('/', (req, res) => {
  getHTML('index')
  .then(data => res.send( data ))
  .catch(e => res.send('404'));
});

server.get('/home', (req, res) => {
  getHTML('home')
  .then(data => res.send( data ))
  .catch(e => res.send('404'));
});

server.get('/about', (req, res) => {
  getHTML('about')
  .then(data => res.send( data ))
  .catch(e => res.send('404'));
});

server.listen(3000, ()=> {
  console.log('Server is started!');
});
