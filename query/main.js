const fs = require('fs').promises;

async function getHTML() {
  const html = await fs.readFile(
    `./form.html`, 'utf8'
  );
  return html;
}

const express = require('express');
const server = express();

server.get('/', (req, res) => {
  if(req.query.form) {
    console.log( req.query );
  }
  getHTML().then(data => res.send(data));
});

// server.get('/data', (req, res) => {
//   const a = data.filter( item =>
//     item.name.toLowerCase().includes(
//       req.query.name.toLowerCase()
//     )
//   );
//   if(a) {
//     res.status(200).json(a);
//   } else {
//     res.status(404).send('404 not found');
//   }
// });

// server.get('/data/:id', (req, res) => {
//   const a = data.find(item =>
//     item.id === parseInt(req.params.id)
//   )
//   if(a) {
//     res.status(200).json(a);
//   } else {
//     res.status(404).send('404 not found');
//   }
// });

server.listen(3000, ()=> {
  console.log('Server is started!');
});
