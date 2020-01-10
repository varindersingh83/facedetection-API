const express = require('express');
const app = express();
const port = 3001;

/*
/ --> res = "server is running"
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> Get = user
/image --> PUT --> user
*/

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
