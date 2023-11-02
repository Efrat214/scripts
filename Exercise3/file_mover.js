import fs from "fs";
import fsPromises from "fs/promises";
import path from "path";

const sourceDirectory = "files_to_move";
const destinitionDirectory = "moved_files";

async function moveFiles() {
  if (!fs.existsSync(destinitionDirectory)) {
    fs.mkdirSync(destinitionDirectory);
  }
  try {
    const filenames = await fs.readdir(sourceDirectory);
    for (const filename of filenames) {
      await fsPromises.rename(
        path.join(sourceDirectory, filename),
        path.join(destinitionDirectory, filename)
      );
      await fsPromises.appendFile("moved_files.txt", filename + "\n");
      console.log(`${filename} was moved`);
    }
  } catch (err) {
    console.error(err);
  }
}

moveFiles();
try {
  const watcher = fsPromises.watch(sourceDirectory);
  for await (const event of watcher) {
    if (eventType === "rename") {
      moveFiles();
    }
  }
} catch (err) {
  console.error(err);
}
