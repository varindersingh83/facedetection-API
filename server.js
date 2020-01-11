const express = require('express');
const bodyParser = require('body-parser');
const app = express();
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

app.get('/', (req, res) => {
  res.json({ msg: 'Connected succesfully to face detection API..' });
});

app.post('/signin', (req, res) => {
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json('success');
  } else {
    res.status(400).json('error logging in');
  }
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
