import * as dotenv from "dotenv";
dotenv.config({ path: "../.env" });
import fs from "fs";
import fsPromises from "fs/promises";
import path from "path";
import env from "env-var";
import oneLinerJoke from "one-liner-joke";

const numOfJokes = env.get("JOKE_AMOUNT").default(60).asInt();

if (numOfJokes < 50) {
  console.log("ERROR: There are less than 50 jokes");
  process.exit(1);
}

const subject = env.get("JOKE_SUBJECT").default("stupid").asString();
if (oneLinerJoke.getRandomJokeWithTag(subject).body == "") {
  console.log("ERROR: There arent jokes in that subject");
  process.exit(1);
}

const jokes = [];
for (let i = 0; i < numOfJokes; i++) {
  let randomJock;
  do {
    randomJock = oneLinerJoke.getRandomJokeWithTag(subject);
  } while (jokes.includes(randomJock));
  jokes.push(randomJock);
}

const jokesInFormatForWriting = JSON.stringify(jokes, null, 1);
const pathForFile = path.join("jokes_list.txt");
try {
  await fsPromises.writeFile(pathForFile, jokesInFormatForWriting);
  console.log("the jokes were written");
} catch (err) {
  console.error(err);
}
