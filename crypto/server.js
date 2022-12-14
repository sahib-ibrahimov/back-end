const fs = require('fs').promises;

async function getData(fileName) {
  const data = await fs.readFile(
    `./${fileName}.json`, 'utf8'
  );
  return data;
}

const express = require('express');
const server = express();

const data = new Array();
getData('cryptos')
.then(load => {
  data.push( ...JSON.parse(load) );
})

server.get('/', (req, res) => {
  res.send( 'welcome to Cryptos API' );
});

server.get('/api', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.json( data );
});

server.get('/api/:i', (req, res) => {
  const i = req.params.i;
  res.set('Access-Control-Allow-Origin', '*');
  if((0 <= i) && (i < data.length)) {
    res.json( data[i] );
  } else res.status(404).send('not found');
});

server.listen(3000, ()=> {
  console.log('Server is started!');
});
