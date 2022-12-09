const fs = require('fs').promises;

async function getHTML(fileName) {
  const html = await fs.readFile(
    `./${fileName}.html`, 'utf8'
  );
  return html;
}

async function saveUsers(data) {
  const html = await fs.writeFile(
    './users.json',
    JSON.stringify(data),
    'utf8'
  );
  return html;
}

async function loadUsers() {
  const html = await fs.readFile(
    './users.json', 'utf8'
  );
  return html;
}

const express = require('express');
const server = express();
server.use( express.json() );
server.use( express.urlencoded({extended: true}) );

const users = new Array();
loadUsers().then(data => {
  users.push( ...JSON.parse(data) );
})

server.post('/register', (req, res) => {
  if(req.body.form) {
    const user = {...req.body};
    delete user.form;
    users.push( user );
    saveUsers( users );
    getHTML('login').then(data => res.send(data));
  } else getHTML('register').then(data => res.send(data));
})

server.post('/login', (req, res) => {
  if(req.body.form) {
    const login = req.body.login;
    const passwd = req.body.passwd;
    const user = users.find(user => user.login === login);
    if(user && (user.passwd === passwd)) {
      getHTML('profile').then(data => res.send(data));
    } else {
      getHTML('login').then(data => res.send(data));
    }
  } else getHTML('login').then(data => res.send(data));
})

server.get('/', (req, res) => {
  getHTML('login').then(data => res.send(data));
});

server.get('/:page', (req, res) => {
  getHTML(req.params.page).then(data => res.send(data));
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
