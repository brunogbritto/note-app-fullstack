import fs from "fs";
import path from "path";

function isJSON(path: string) {
  return path.endsWith(".json");
}

function fileExists(path: string) {
  return fs.existsSync(path);
}

// lê um arquivo json
export function readJSON(...jsonFile: string[]) {
  const jsonFilePath = path.join(...jsonFile);

  if (fileExists(jsonFilePath) && isJSON(jsonFilePath)) {
    return fs.readFileSync(jsonFilePath).toString();
  }
}

//cria um arquivo json
export function createJSON(
  jsonFile: string[],
  jsonContent: any,
  identSize = 2
) {
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
export function deleteJSON(...jsonFile: string[]) {
  const jsonFilePath = path.join(...jsonFile);
  if (fileExists(jsonFilePath) && isJSON(jsonFilePath)) {
    return fs.unlinkSync(jsonFilePath);
  } else {
    throw new Error("Este não é um caminho para um arquivo JSON.");
  }
}

//sobrescreve um arquivo json
export function overwriteJSON(
  jsonFile: string[],
  jsonContent: any,
  identSize = 2
) {
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
export function updateJSON(
  jsonFile: string[],
  jsonContent: any,
  identSize = 2
) {
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

export function listJSON(...jsonPath: string[]) {
  const files = fs.readdirSync(path.join(...jsonPath));
  return files.filter((file) => file.endsWith(".json"));
}
