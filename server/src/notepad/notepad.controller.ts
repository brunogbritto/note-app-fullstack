import express from "express";
import * as notepadService from "./notepad.service";

export const notepadController = express.Router();

//lista de notepads
notepadController.get("/", (req, res) => {
  const limit = Number(req.query.limit ?? 10);
  const offset = Number(req.query.offset ?? 0);
  const notepads = notepadService.findNotepads().slice(offset, offset + limit);
  res.status(200).json(notepads);
});

//pega notepad pelo ID
notepadController.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const notepad = notepadService.findNotepadById(id);
  if (notepad === null) {
    res.sendStatus(404);
  } else {
    res.status(200).json(notepad);
  }
});

//criar uma notepad
notepadController.post("/", (req, res) => {
  const response = notepadService.createNotepad(req.body);
  res.json(response);
});

//sobrescrever uma notepad
notepadController.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const response = notepadService.overwriteNotepadById(id, req.body);
  res.json(response);
});

//atualizar parcialmente uma notepad
notepadController.patch("/:id", (req, res) => {
  const id = Number(req.params.id);
  const response = notepadService.updateNotepadById(id, req.body);
  res.json(response);
});

//deletar uma notepad pelo id
notepadController.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const response = notepadService.deleteNotepadById(id);
  res.json(response);
});
