const express = require('express');
const app = express();
const port = 3001;
const livros = require('./livros');

const log = (req, res, next) => {
    console.log(`................ Acesso em ${new Date()}`);
    next();
};

//deve fica antes de todas as rotas para ser possivel usar json
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Olá... Bem vindo!');
});

//identificação da rota e da const require associada
app.use('/livros', livros);

app.post('/filmes', (req, res) => {
  const { titulo, genero } = req.body;
  res.send(`Filme : ${titulo} - Gênero: ${genero}, recebido...`);
});

app.get('/transfere', log, (req, res) => {
    res.send('Ok! Valor transferido com sucesso...');
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});