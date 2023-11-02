"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var dotenv = _interopRequireWildcard(require("dotenv"));

var _fs = _interopRequireDefault(require("fs"));

var _promises = _interopRequireDefault(require("fs/promises"));

var _path = _interopRequireDefault(require("path"));

var _envVar = _interopRequireDefault(require("env-var"));

var _oneLinerJoke = _interopRequireDefault(require("one-liner-joke"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

dotenv.config({
  path: "../.env"
});

var numOfJokes = _envVar["default"].get("JOKE_AMOUNT")["default"](60).asInt();

console.log(numOfJokes); // const numOfJokes = process.env.JOKE_AMOUNT || 50;

if (numOfJokes < 50) {
  console.log("ERROR: There are less than 50 jokes");
  process.exit(1);
}

if (_oneLinerJoke["default"].getRandomJokeWithTag(process.env.JOKE_SUBJECT).body == "") {
  console.log("ERROR: There arent jokes in that subject");
  process.exit(1);
}

var jokes = [];

for (var i = 0; i < numOfJokes; i++) {
  var randomJock = void 0;

  do {
    randomJock = _oneLinerJoke["default"].getRandomJokeWithTag(process.env.JOKE_SUBJECT);
  } while (jokes.includes(randomJock));

  jokes.push(randomJock);
}

var jokesInFormatForWriting = JSON.stringify(jokes, null, 1);

var pathForFile = _path["default"].join("jokes_list.txt");

_fs["default"].writeFile(pathForFile, jokesInFormatForWriting, function (err, data) {
  if (err) throw err;
  console.log("the jokes were written");
});