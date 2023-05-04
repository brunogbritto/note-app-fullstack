const fs = require("fs");
const path = require("path");

function isJSON(path) {
  return path.endsWith(".json");
}

function fileExists(path) {
  return fs.existsSync(path);
}

// lê um arquivo json
function readJSON(...jsonFile) {
  const jsonFilePath = path.join(...jsonFile);

  if (fileExists(jsonFilePath) && isJSON(jsonFilePath)) {
    return fs.readFileSync(jsonFilePath).toString();
  } else {
    throw new Error("Este arquivo JSON não existe.");
  }
}

//cria um arquivo json
function createJSON(jsonFile, jsonContent, identSize = 2) {
  const jsonFilePath = path.join(...jsonFile);

  if (!fileExists(jsonFilePath) && isJSON(jsonFilePath)) {
    fs.writeFileSync(
      jsonFilePath,
      JSON.stringify(jsonContent, null, identSize)
    );
  } else {
    throw new Error("Este arquivo não existe.");
  }
}

//apaga um arquivo json
function deleteJSON(...jsonFile) {
  const jsonFilePath = path.join(...jsonFile);
  if (fileExists(jsonFilePath) && isJSON(jsonFilePath)) {
    return fs.unlinkSync(jsonFilePath);
  } else {
    throw new Error("Este não é um caminho para um arquivo JSON.");
  }
}

//sobrescreve um arquivo json
function overwriteJSON(jsonFile, jsonContent, identSize = 2) {
  const jsonFilePath = path.join(...jsonFile);
  if (fileExists(jsonFilePath) && isJSON(jsonFilePath)) {
    fs.writeFileSync(
      jsonFilePath,
      JSON.stringify(jsonContent, null, identSize)
    );
  } else {
    throw new Error("Este arquivo não existe.");
  }
}

//atualiza parcialmente um arquivo json
function updateJSON(jsonFile, jsonContent, identSize = 2) {
  const jsonFilePath = path.join(...jsonFile);

  if (!fileExists(jsonFilePath) && isJSON(jsonFilePath))
    throw new Error("Este arquivo não existe.");

  const currentJsonContent = JSON.parse(
    fs.readFileSync(jsonFilePath).toString()
  );
  const nextJsonContent = {
    ...currentJsonContent,
    ...jsonContent,
  };
  fs.writeFileSync(
    jsonFilePath,
    JSON.stringify(nextJsonContent, null, identSize)
  );
}

function listJSON(...jsonPath) {
  const files = fs.readdirSync(path.join(...jsonPath));
  return files.filter((file) => file.endsWith(".json"));
}

module.exports = {
  readJSON,
  createJSON,
  overwriteJSON,
  deleteJSON,
  updateJSON,
  listJSON,
};
