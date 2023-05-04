const express = require("express");
const notepadService = require("./notepadService");

const app = express();
const host = "0.0.0.0";
const port = 8080;

app.use(express.static("public"));
app.use(express.json());

//lista de notepads
app.get("/notepads", (req, res) => {
  const notepads = notepadService.findNotepads();
  res.json(notepads);
});

//pega notepad pelo ID
app.get("/notepads/:id", (req, res) => {
  const id = Number(req.params.id);
  const notepad = notepadService.findNotepadById(id);
  res.json(notepad);
});

//criar uma notepad
app.post("/notepads", (req, res) => {
  const response = notepadService.createNotepadById(req.body);
  res.json(response);
});

//sobrescrever uma notepad
app.put("/notepads/:id", (req, res) => {
  const id = Number(req.params.id);
  const response = notepadService.overWriteNotepadById(id, req.body);
  res.json(response);
});

//atualizar parcialmente uma notepad
app.patch("/notepads/:id", (req, res) => {
  const id = Number(req.params.id);
  const response = notepadService.updateNotepadById(id, req.body);
  res.json(response);
});

//deletar uma notepad pelo id
app.delete("/notepads/:id", (req, res) => {
  const id = Number(req.params.id);
  const response = notepadService.deleteNotepadById(id, req.body);
  res.json(response);
});

app.listen(port, host, () => {
  console.log(`Servidor express inicializado em http://${host}:${port}`);
});
