const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());
const port = 3001;
const database = {
  users: [
    {
      id: '123',
      name: 'john',
      email: 'john@gmail.com',
      password: 'cookies',
      entries: 0,
      joined: new Date()
    },
    {
      id: '124',
      name: 'Sally',
      email: 'sally@gmail.com',
      password: 'cookies',
      entries: 0,
      joined: new Date()
    }
  ]
};
/*
/ --> res = "server is running"
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> Get = user
/image --> PUT --> user
*/

/*
root path
*/
app.get('/', (req, res) => {
  res.json(database.users);
});

/*
increment image counter in DB
*/
app.put('/image', (req, res) => {
  const { id } = req.body;

  let found = false;
  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      user.entries++;
      return res.json(user.entries);
    }
  });
  if (!found) {
    res.status(404).json('no such user');
  }
});

/*
get profile by id
*/
app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  });
  if (!found) {
    res.status(404).json('no such user');
  }
});

/*
register user or add new user to db
*/
app.post('/register', (req, res) => {
  const { email, name, password } = req.body;
  bcrypt.hash(password, null, null, function(err, hash) {
    // Store hash in your password DB.
    console.log(hash);
    if (err) console.log(err);
  });
  //   let hash = hash;
  hash = '$2a$10$ix6WyH5iNGmJd7aPvjApWeEcobtwXLl/C61BFSK2NlSH7/s6GBW6e';
  // Load hash from your password DB.
  bcrypt.compare('apple', hash, function(err, res) {
    console.log(res);
  });
  bcrypt.compare('orange', hash, function(err, res) {
    console.log(res);
  });
  database.users.push({
    id: '124',
    name: name,
    email: email,
    entries: 0,
    joined: new Date()
  });
  res.json(database.users[database.users.length - 1]);
});

/*
signin to the app
*/
app.post('/signin', (req, res) => {
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json(database.users[0]);
  } else {
    res.status(400).json('error logging in');
  }
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
