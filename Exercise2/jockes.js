require('dotenv').config({ path: '../.env' });
const path = require('path')
const fs = require('fs')

const oneLinerJoke = require('one-liner-joke');
const numOfJokes = process.env.JOKE_AMOUNT || 50;

if (numOfJokes < 50) {
    console.log('ERROR: There are less than 50 jokes');
    process.exit(1);
}

if (oneLinerJoke.getRandomJokeWithTag(process.env.JOKE_SUBJECT).body == '') {
    console.log('ERROR: There arent jocks in that subject');
    process.exit(1);
}

const jocks = []
for (let i = 0; i < numOfJokes; i++) {
    let randomJock;
    do {
        randomJock = oneLinerJoke.getRandomJokeWithTag(process.env.JOKE_SUBJECT)
    } while (jocks.includes(randomJock))
    jocks.push(randomJock)
}

const jocksInFormatForWriting = JSON.stringify(jocks, null, 1);
const pathForFile = path.join(__dirname, 'jocks_list.txt')
fs.writeFile(pathForFile, jocksInFormatForWriting, (err, data) => {
    if (err)
        throw err;
    console.log('the jocks were written');

})


