import * as fs from "fs";

export function getJsonFromFile(filePath: string): string {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (!err) {
      return data;
    }
  });

  return "";
}

export function getJsonGlobal(): string {
  fs.readFile(JSON_FILEPATH, "utf8", (err, data) => {
    if (!err) {
      return data;
    }
  });

  return "";
}
