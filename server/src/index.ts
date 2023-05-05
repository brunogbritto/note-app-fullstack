import express from "express";
import { notepadController } from "./notepad/notepad.controller";
import { commentController } from "./comment/comment.controller";
import cors from "cors";

const app = express();
const host = "0.0.0.0";
const port = 8080;

app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.use("/notepads", notepadController);
app.use("/comments", commentController);

app.listen(port, host, () => {
  console.log(`Servidor express inicializado em http://${host}:${port}`);
});
