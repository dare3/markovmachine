// makeText.js

const fs = require('fs');
const axios = require('axios');
const { MarkovMachine } = require('./markov');
const process = require("process");


async function main() {
  let [method, path] = process.argv.slice(2);

  if (method === "file") {
    generateTextFromFile(path);
  } else if (method === "url") {
    await generateTextFromURL(path);
  } else {
    console.error(`Unknown method: ${method}`);
    process.exit(1);
  }
}

function generateTextFromFile(filePath) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Cannot read file: ${filePath}: ${err}`);
      process.exit(1);
    }
    generateMarkovText(data);
  });
}

async function generateTextFromURL(url) {
  try {
    let response = await axios.get(url);
    generateMarkovText(response.data);
  } catch (err) {
    console.error(`Cannot fetch URL: ${url}: ${err}`);
    process.exit(1);
  }
}

function generateMarkovText(text) {
  let mm = new MarkovMachine(text);
  console.log(mm.makeText());
}

main();
