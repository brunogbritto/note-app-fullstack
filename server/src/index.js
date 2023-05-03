const express = require("express");
const json = require("./json");

const app = express();
const host = "0.0.0.0";
const port = 8080;

app.use(express.static("public"));
app.use(express.json());

//lista de pessoas
app.get("/pessoas", (req, res) => {
  const pessoasFiles = json.listJSON("data", "pessoas");
  const pessoas = pessoasFiles.map((file) =>
    JSON.parse(json.readJSON("data", "pessoas", file))
  );
  res.json(pessoas);
});

//pega pessoa pelo ID
app.get("/pessoas/:id", (req, res) => {
  const id = Number(req.params.id);
  const pessoa = JSON.parse(json.readJSON("data", "pessoas", `${id}.json`));
  res.json(pessoa);
});

//criar uma pessoa
app.post("/pessoas", (req, res) => {
  const pessoasLatestId = json.readJSON("data", "pessoasLatestId.json");
  const pessoaId = pessoasLatestId.latestId + 1;
  json.updateJSON(["data", "pessoasLatestId.json"], {
    latestId: pessoaId,
  });

  const pessoa = {
    id: pessoaId,
    ...req.body,
  };
  json.createJSON(["data", "pessoas", `${pessoaId}.json`], pessoa);

  const response = {
    success: true,
    data: { pessoa },
  };
  res.json(response);
});

//sobrescrever uma pessoa
app.put("/pessoas/:id", (req, res) => {});

//atualizar parcialmente uma pessoa
app.patch("/pessoas/:id", (req, res) => {});

//deletar uma pessoa pelo id
app.delete("/pessoas/:id", (req, res) => {
  const id = Number(req.params.id);
  const pessoa = json.readJSON("data", "pessoas", `${id}.json`);
  json.deleteJSON("data", "pessoas", `${id}.json`);
  const response = {
    success: true,
    data: {
      pessoa,
    },
  };
  res.json(response);
});
app.listen(port, host, () => {
  console.log(`Servidor express inicializado em http://${host}:${port}`);
});
