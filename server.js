// import express from 'express';

// const app = express();
// app.use(express.json()); // permite o recebimento de conteúdo json

// const users = []

// app.post('/usuario', (req, res) => {
//   console.log(req.body);
//   res.send('POST recebido');
// });
// app.get('/usuarios', (req, res) => {res.status(200).json(users)})
// app.get('/', (request, response) => {response.send('Servidor funcionando!')})
// app.listen(3000, () => {
//   console.log('Server running on port 3000');
// });



// const app = express();
// app.use(express.json()); // permite o recebimento de conteúdo json

// const users = [];

// app.post('/usuarios', (req, res) => { users.push(req.body);
//     res.status(201).send(req.body);
// });

// app.get('/usuarios', (req, res) => { res.status(200).json(users) });

// app.get('/', (request, response) => { response.send('Servidor funcionando!')});