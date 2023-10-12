const fs = require('fs');
const path = require('path');

const sourceDirectory = 'files_to_move'
const destinitionDirectory = 'moved_files'

function moveFiles() {

    fs.exists(destinitionDirectory, (e) => {
        e ? console.log('it exists') : fs.mkdir(destinitionDirectory, (e) => {
            if (e)
                throw e;
        });
    });

    fs.readdir(sourceDirectory, function (err, filenames) {
        if (err) {
            onError(err);
            return;
        }
        filenames.forEach(function (filename) {
            fs.rename(path.join(sourceDirectory, filename), path.join(destinitionDirectory, filename), function (err) {
                if (err) throw err;
                fs.appendFile('moved_files.txt', filename + '\n', (err) => {
                    if (err) throw err;
                    console.log(`${filename} was moved`);
                });
            })

        });
    });
}

moveFiles();
fs.watch(sourceDirectory, (eventType, filename) => {
    console.log("\nThe file", filename, "was modified!");
    console.log("The type of change was:", eventType);
    if (eventType == 'rename') {
        moveFiles();

    }
});
