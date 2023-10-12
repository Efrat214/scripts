// const fs = require('fs');
import fs from 'fs'
import inquirer from 'inquirer';

// פונקציה למחיקת קובץ לפי שם
function deleteFile() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'fileName',
            message: 'Enter the name of the file to delete:'
        }
    ])
        .then(answers => {
            fs.unlink(answers.fileName, (err) => {
                if (err) {
                    console.error('Error deleting the file:', err);
                } else {
                    console.log('File deleted successfully.');
                }
            });
        });
}

// פונקציה ליצירת קובץ חדש לפי שם
function createFile() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'fileName',
            message: 'Enter the name of the file to create:'
        }
    ])
        .then(answers => {
            fs.writeFile(answers.fileName, '', (err) => {
                if (err) {
                    console.error('Error creating the file:', err);
                } else {
                    console.log('File created successfully.');
                }
            });
        });
}

// פונקציה לכתיבת טקסט לקובץ
function writeTextToFile() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'fileName',
            message: 'Enter the name of the file to write to:'
        },
        {
            type: 'input',
            name: 'text',
            message: 'Enter the text to write to the file:'
        }
    ])
        .then(answers => {
            fs.writeFile(answers.fileName, answers.text, (err) => {
                if (err) {
                    console.error('Error writing to the file:', err);
                } else {
                    console.log('Text written to the file successfully.');
                }
            });
        });
}

// פונקציה ליצירת תיקייה
function createDirectory() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'directoryName',
            message: 'Enter the name of the directory to create:'
        }
    ])
        .then(answers => {
            fs.mkdir(answers.directoryName, (err) => {
                if (err) {
                    console.error('Error creating the directory:', err);
                } else {
                    console.log('Directory created successfully.');
                }
            });
        });
}

// פונקציה למחיקת תיקייה רקורסיבית
function deleteDirectory() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'directoryName',
            message: 'Enter the name of the directory to delete:'
        }
    ])
        .then(answers => {
            fs.rmdir(answers.directoryName, { recursive: true }, (err) => {
                if (err) {
                    console.error('Error deleting the directory:', err);
                } else {
                    console.log('Directory deleted successfully.');
                }
            });
        });
}

// פונקציה ליצירת קובץ בתיקייה
function createFileInDirectory() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'directoryName',
            message: 'Enter the name of the directory:'
        },
        {
            type: 'input',
            name: 'fileName',
            message: 'Enter the name of the file to create in the directory:'
        }
    ])
        .then(answers => {
            const filePath = `${answers.directoryName}/${answers.fileName}`;
            fs.writeFile(filePath, '', (err) => {
                if (err) {
                    console.error('Error creating the file:', err);
                } else {
                    console.log('File created in the directory successfully.');
                }
            });
        });
}

// פונקציה למחיקת קובץ מתיקייה
function deleteFileInDirectory() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'directoryName',
            message: 'Enter the name of the directory:'
        },
        {
            type: 'input',
            name: 'fileName',
            message: 'Enter the name of the file to delete in the directory:'
        }
    ])
        .then(answers => {
            const filePath = `${answers.directoryName}/${answers.fileName}`;
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error('Error deleting the file:', err);
                } else {
                    console.log('File deleted from the directory successfully.');
                }
            });
        });
}

// פונקציה לאיחוד קבצים
function combineFiles() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'file1Name',
            message: 'Enter the name of the first file:'
        },
        {
            type: 'input',
            name: 'file2Name',
            message: 'Enter the name of the second file to combine:'
        }
    ])
        .then(answers => {
            fs.readFile(answers.file2Name, 'utf8', (err, data) => {
                if (err) {
                    console.error('Error reading the second file:', err);
                } else {
                    fs.appendFile(answers.file1Name, data, (err) => {
                        if (err) {
                            console.error('Error combining files:', err);
                        } else {
                            fs.unlink(answers.file2Name, (err) => {
                                if (err) {
                                    console.error('Error deleting the second file:', err);
                                } else {
                                    console.log('Files combined successfully.');
                                }
                            });
                        }
                    });
                }
            });
        });
}

// פונקציה ליציאה מהמערכת
function exitSystem() {
    process.exit(0);
}

// מערך הפונקציות המוגדרות
const functions = [
    { name: 'Delete a file', function: deleteFile },
    { name: 'Create a file', function: createFile },
    { name: 'Write text to a file', function: writeTextToFile },
    { name: 'Create a directory', function: createDirectory },
    { name: 'Delete a directory', function: deleteDirectory },
    { name: 'Create a file in a directory', function: createFileInDirectory },
    { name: 'Delete a file from a directory', function: deleteFileInDirectory },
    { name: 'Combine files', function: combineFiles },
    { name: 'Exit', function: exitSystem }
];

// הצגת התפריט ובחירת פונקציה
function showMenu() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'Choose a function:',
            choices: functions.map(func => func.name)
        }
    ])
        .then(answers => {
            const selectedFunction = functions.find(func => func.name === answers.choice);
            selectedFunction.function();
            showMenu();
        });
}

// הרצת הממשק
showMenu();
