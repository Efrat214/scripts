import fs from "fs";
import fspromises from "fs/promises";
import inquirer from "inquirer";

function deleteFile() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "fileName",
        message: "Enter the name of the file to delete:",
      },
    ])
    .then(async (answers) => {
      try {
        await fspromises.unlink(answers.fileName);
        console.log("File deleted successfully.");
      } catch (err) {
        console.error("Error deleting the file:", err);
      }
    });
}

function createFile() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "fileName",
        message: "Enter the name of the file to create:",
      },
    ])
    .then(async (answers) => {
      try {
        await fspromises.writeFile(answers.fileName, "");
        console.log("File created successfully.");
      } catch (err) {
        console.error("Error creating the file:", err);
      }
    });
}

function writeTextToFile() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "fileName",
        message: "Enter the name of the file to write to:",
      },
      {
        type: "input",
        name: "text",
        message: "Enter the text to write to the file:",
      },
    ])
    .then(async (answers) => {
      try {
        await fspromises.writeFile(answers.fileName, answers.text);
        console.log("Text written to the file successfully.");
      } catch (err) {
        console.error("Error writing to the file:", err);
      }
    });
}

function createDirectory() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "directoryName",
        message: "Enter the name of the directory to create:",
      },
    ])
    .then(async (answers) => {
      try {
        await fspromises.mkdir(answers.directoryName);
        console.log("Directory created successfully.");
      } catch (err) {
        console.error("Error creating the directory:", err);
      }
    });
}

function deleteDirectory() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "directoryName",
        message: "Enter the name of the directory to delete:",
      },
    ])
    .then(async (answers) => {
      try {
        await fspromises.rmdir(answers.directoryName, { recursive: true });
        console.log("Directory deleted successfully.");
      } catch (err) {
        console.error("Error deleting the directory:", err);
      }
    });
}

function createFileInDirectory() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "directoryName",
        message: "Enter the name of the directory:",
      },
      {
        type: "input",
        name: "fileName",
        message: "Enter the name of the file to create in the directory:",
      },
    ])
    .then(async (answers) => {
      const filePath = `${answers.directoryName}/${answers.fileName}`;
      try {
        await fspromises.writeFile(filePath, "");
        console.log("File created in the directory successfully.");
      } catch (err) {
        console.error("Error creating the file:", err);
      }
    });
}

function deleteFileInDirectory() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "directoryName",
        message: "Enter the name of the directory:",
      },
      {
        type: "input",
        name: "fileName",
        message: "Enter the name of the file to delete in the directory:",
      },
    ])
    .then(async (answers) => {
      const filePath = `${answers.directoryName}/${answers.fileName}`;
      try {
        await fspromises.unlink(filePath);
        console.log("File deleted from the directory successfully.");
      } catch (err) {
        console.error("Error deleting the file:", err);
      }
    });
}

function combineFiles() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "file1Name",
        message: "Enter the name of the first file:",
      },
      {
        type: "input",
        name: "file2Name",
        message: "Enter the name of the second file to combine:",
      },
    ])
    .then(async (answers) => {
      try {
        const data = await fs.readFile(answers.file2Name, "utf8");
        await fs.appendFile(answers.file1Name, data);
        await fs.unlink(answers.file2Name);
        console.log("Files combined successfully.");
      } catch (err) {
        console.error("Error combining and deleting files:", err);
      }
    });
}

function exitSystem() {
  process.exit(0);
}

const functions = [
  { name: "Delete a file", function: deleteFile },
  { name: "Create a file", function: createFile },
  { name: "Write text to a file", function: writeTextToFile },
  { name: "Create a directory", function: createDirectory },
  { name: "Delete a directory", function: deleteDirectory },
  { name: "Create a file in a directory", function: createFileInDirectory },
  { name: "Delete a file from a directory", function: deleteFileInDirectory },
  { name: "Combine files", function: combineFiles },
  { name: "Exit", function: exitSystem },
];

function showMenu() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "Choose a function:",
        choices: functions.map((func) => func.name),
      },
    ])
    .then((answers) => {
      const selectedFunction = functions.find(
        (func) => func.name === answers.choice
      );
      selectedFunction.function();
      showMenu();
    });
}

showMenu();
