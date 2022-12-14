const fs = require('fs').promises;

async function getHTML(fileName) {
  const html = await fs.readFile(
    `./${fileName}.html`, 'utf8'
  );
  return html;
}

// async function saveUsers(data) {
//   const html = await fs.writeFile(
//     './users.json',
//     JSON.stringify(data),
//     'utf8'
//   );
//   return html;
// }

// async function loadUsers() {
//   const html = await fs.readFile(
//     './users.json', 'utf8'
//   );
//   return html;
// }

const express = require('express');
const server = express();
server.use( express.json() );
server.use( express.urlencoded({extended: true}) );

const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'bootcamp'
});
connection.connect((err) => {
  if(err) console.error(err);
  else console.log('connected');
});

// const users = new Array();
// loadUsers().then(data => {
//   users.push( ...JSON.parse(data) );
// })
// connection.query('SELECT * FROM users', (err, data) => {
//   if(!err) {
//     data.forEach(item => {
//       const user = {};
//       user.id = item.login_id;
//       user.name = item.name;
//       user.age = item.age;
//       users.push(user);
//     });
//   };
// });

server.delete('/user/:id', (req, res) => {
  // const id = req.params.id;
  // if((0 <= id) && (id < users.length)) {
  //   users.splice(id, 1);
  //   res.status(202).send();
  // } else {
  //   res.status(404).json({error:'user not found'});
  // }
})

server.put('/user', (req, res) => {
  // const id = req.body.id;
  // if((0 <= id) && (id < users.length)) {
  //   users[id] = {...users[id], ...req.body};
  //   delete users[id].id;
  //   res.json( users[id] );
  // } else {
  //   res.status(404).json({error:'user not found'});
  // }
})

server.post('/register', (req, res) => {
  // if(req.body.form) {
  //   const user = {...req.body};
  //   delete user.form;
  //   users.push( user );
  //   // saveUsers( users );
  //   getHTML('login').then(data => res.send(data));
  // } else getHTML('register').then(data => res.send(data));
})

server.post('/login', (req, res) => {
  if(req.body.form) {
    // const login = req.body.login;
    // const passwd = req.body.passwd;
    // connection.query(`SELECT passwd FROM logins WHERE login='${login}'`, (err, data) => {
    //   if(!err) {
    //     if(data.length === 0) {
    //       res.status(404).send('404! user not found');
    //       return;
    //     }
    //     const md5 = require('md5');
    //     if(data[0].passwd === md5(passwd)) {
    //       getHTML('profile').then(data => res.send(data));
    //     } else {
    //       getHTML('login').then(data => res.send(data));
    //     }
    //   } else {
    //     res.status(500).send('db error');
    //   }
    // });

    const login = req.body.login;
    const passwd = req.body.passwd;
    connection.query(`SELECT login FROM logins WHERE login='${login}' AND passwd='${passwd}'`, (err, data) => {
      if(!err) {
        if(data.length === 0) {
          res.status(404).send('404! user not found');
          return;
        }
        getHTML('profile').then(data => res.send(data));
      } else {
        res.status(500).json(err);
      }
    });
  } else getHTML('login').then(data => res.send(data));
})

server.get('/', (req, res) => {
  getHTML('login').then(data => res.send(data));
});

server.get('/:page', (req, res) => {
  if(req.params.page === 'users') {
    connection.query('SELECT login_id as id, name, age FROM users', (err, data) => {
      if(!err) {
        res.json(data);
      } else {
        res.status(500).send('db error');
      }
    });
  } else getHTML(req.params.page)
  .then(data => res.send(data))
  .catch(e => res.status(404).send(e.message));
});

server.get('/user/:id', (req, res) => {
  const id = Number(req.params.id);
  connection.query(`SELECT login_id as id, name, age FROM users WHERE id=${id}`, (err, data) => {
    if(!err) {
      if(data.length === 0) {
        res.status(404).send('404! user not found');
        return;
      }
      // const users = new Array();
      // data.forEach(item => {
      //   const user = new Object();
      //   user.id = item.login_id;
      //   user.name = item.name;
      //   user.age = item.age;
      //   users.push(user);
      // });
      res.json(data);
    } else {
      res.status(500).send('db error');
    }
  });
})

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
