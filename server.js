const express = require("express");
const server = express();
server.use( express.json() );
server.use( express.urlencoded({extended: true}) );

const users = [
  { id: 1, name: "Sam", job: "Developer" },
  { id: 2, name: "Tom", job: "Teacher" },
  { id: 3, name: "Bill", job: "Doctor" },
];

server.put("/users", (req, res) => {
  const idOfUser = parseInt(req.body.id);
  const userIdx = users.findIndex((user) => user.id === idOfUser);

  if (userIdx !== -1) {
    const oldUser = users[userIdx];
    users[userIdx] = { ...oldUser, ...req.body };
    res.json(users[userIdx]);
  } else {
    res.status(404).json();
  }
});

server.listen(3000, () => {
  console.log("Server is started!");
});
