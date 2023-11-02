import fs from "fs";
import fsPromises from "fs/promises";
import path from "path";

async function createDir(dir) {
  try {
    await fsPromises.access(dir);
  } catch (error) {
    if (error.code === "ENOENT") {
      await fsPromises.mkdir(dir);
    } else {
      throw error;
    }
  }
}

async function fileExists(filename) {
  try {
    await fsPromises.access(filename);
    return true;
  } catch (error) {
    if (error.code === "ENOENT") {
      return false;
    } else {
      throw error;
    }
  }
}

async function createFileIfIsntExist(indexOfFile, numOfWords) {
  const pathOfFile = path.join("created_files", `file_${indexOfFile}.txt`);
  if (!(await fileExists(pathOfFile))) {
    const content = `File ${indexOfFile} - ${numOfWords} words.`;

    try {
      await fsPromises.writeFile(pathOfFile, content);
      console.log(`in ${pathOfFile} ${content}`);
    } catch {
      console.error(`Error creating ${filename}: ${error.message}`);
    }
  } else {
    console.log(`File ${indexOfFile} already exists, skipping creation.`);
  }
}

async function main() {
  if (process.argv.length < 4) {
    console.log("there arent enough data for that program");
  } else {
    const numOfFilesToWrite = parseInt(process.argv[2]);
    const numOfWordsInTheFirstFile = parseInt(process.argv[3]);
    const pathForDir = path.join(__dirname, "created_files");
    await createDir(pathForDir);
    for (let numFile = 0; numFile < numOfFilesToWrite; numFile++) {
      console.log(
        numOfWordsInTheFirstFile + numOfWordsInTheFirstFile * numFile
      );
      await createFileIfIsntExist(
        numFile + 1,
        numOfWordsInTheFirstFile + numOfWordsInTheFirstFile * numFile
      );
    }
  }
}
main();
