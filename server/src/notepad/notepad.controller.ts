import express from "express";
import * as notepadService from "./notepad.service";

export const notepadController = express.Router();

//lista de notepads
notepadController.get("/", (req, res) => {
  const limit = req.query.limit ? Number(req.query.limit) : undefined;
  const offset = req.query.offset ? Number(req.query.offset) : undefined;
  const notepads = notepadService.findNotepads({ limit, offset });
  res.status(200).json(notepads);
});

//pega notepad pelo ID
notepadController.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const notepad = await notepadService.findNotepadById(id);
  if (notepad === null) {
    res.sendStatus(404);
  } else {
    res.status(200).json(notepad);
  }
});

//cria um notepad
notepadController.post("/", async (req, res) => {
  await delay(5);
  const response = await notepadService.createNotepad(req.body);
  const status = response.success ? 201 : 422;
  res.status(status).json(response);
});

function delay(s: number) {
  return new Promise((resolve) => setTimeout(resolve, s * 1000));
}

//sobrescrever um notepad
notepadController.put("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const response = await notepadService.updateNotepadById(id, req.body);
  res.json(response);
});

//deletar um notepad pelo id
notepadController.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const response = notepadService.deleteNotepadById(id);
  res.json(response);
});

//Lista de comentários do notepad
notepadController.get("/:id/comments", async (req, res) => {
  const id = Number(req.params.id);
  const response = await notepadService.findNotepadCommentsById(id);
  res.status(200).json(response);
});
