const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

let tarefas = [
    { id: 1, titulo: "Estudar Express", concluida: false },
    { id: 2, titulo: "Fazer atividade", concluida: true },
    { id: 3, titulo: "Testar API", concluida: false }];

app.get("/", (req, res) => {
res.send("API de Tarefas no ar");});

app.get("/tarefas", (req, res) => {
const { concluida } = req.query;

if (concluida === "true") {
return res.json(tarefas.filter(tarefa => tarefa.concluida === true));}

if (concluida === "false") {
return res.json(tarefas.filter(tarefa => tarefa.concluida === false));}

res.json(tarefas);});

app.get("/tarefas/:id", (req, res) => {
const id = Number(req.params.id);
const tarefa = tarefas.find(tarefa => tarefa.id === id);

if (!tarefa) {
return res.status(404).json({
erro: "Tarefa não encontrada"});}

res.json(tarefa);});

app.post("/tarefas", (req, res) => {
const { titulo } = req.body;
const novaTarefa = {id: tarefas.length + 1, titulo: titulo, concluida: false};

tarefas.push(novaTarefa);
res.status(201).json(novaTarefa);});

app.listen(PORT, () => {
console.log(`Servidor rodando na porta ${PORT}`);});