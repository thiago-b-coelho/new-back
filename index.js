const express = require('express');
const bcrypt = require('bcrypt');
const usuarioModel = require('./src/modules/usuario/usuario.model');
const app = express();
app.use(express.json());

app.get('/usuarios', async (req, res) => {
  const usuarios = await usuarioModel.find({})
  return res.status(200).json([]);
})

app.post('/usuarios', async (req, res) => {
  if(!req.body.email) return res.status(400).json({message: 'O campo email é obrigatório!'})
  if(!req.body.senha) return res.status(400).json({message: 'O campo senha é obrigatório!'})

  const usuarioExistente = await usuarioModel.find({email: req.body.email})
  if(usuarioExistente.length) return res.status(400).json({message: 'Usuário já existe'})

  const senhaCriptografada = bcrypt.hashSync(req.body.senha, 10)
  const usuario = await usuarioModel.create({
    nome: req.body.nome,
    email: req.body.email,
    senha: senhaCriptografada,
  })
  return res.status(201).json(usuario);
})

app.get('/noticias', (req, res) => {
  return res.status(200).json([]);
})

app.post('/noticias', (req, res) => {
  return res.status(201).json([]);
})

app.listen(8080, () => {
  console.log('servidor rodando na porta 8080!');
});