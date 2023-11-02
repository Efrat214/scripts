"use strict";

var _fs = _interopRequireDefault(require("fs"));

var _promises = _interopRequireDefault(require("fs/promises"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function createDir(dir) {
  return regeneratorRuntime.async(function createDir$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_promises["default"].access(dir));

        case 3:
          _context.next = 13;
          break;

        case 5:
          _context.prev = 5;
          _context.t0 = _context["catch"](0);

          if (!(_context.t0.code === "ENOENT")) {
            _context.next = 12;
            break;
          }

          _context.next = 10;
          return regeneratorRuntime.awrap(_promises["default"].mkdir(dir));

        case 10:
          _context.next = 13;
          break;

        case 12:
          throw _context.t0;

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 5]]);
}

function fileExists(filename) {
  return regeneratorRuntime.async(function fileExists$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_promises["default"].access(filename));

        case 3:
          return _context2.abrupt("return", true);

        case 6:
          _context2.prev = 6;
          _context2.t0 = _context2["catch"](0);

          if (!(_context2.t0.code === "ENOENT")) {
            _context2.next = 12;
            break;
          }

          return _context2.abrupt("return", false);

        case 12:
          throw _context2.t0;

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 6]]);
}

function createFileIfIsntExist(indexOfFile, numOfWords) {
  var pathOfFile, content;
  return regeneratorRuntime.async(function createFileIfIsntExist$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          pathOfFile = _path["default"].join("created_files", "file_".concat(indexOfFile, ".txt"));
          _context3.next = 3;
          return regeneratorRuntime.awrap(fileExists(pathOfFile));

        case 3:
          if (_context3.sent) {
            _context3.next = 16;
            break;
          }

          content = "File ".concat(indexOfFile, " - ").concat(numOfWords, " words.");
          _context3.prev = 5;
          _context3.next = 8;
          return regeneratorRuntime.awrap(_promises["default"].writeFile(pathOfFile, content));

        case 8:
          console.log("in ".concat(pathOfFile, " ").concat(content));
          _context3.next = 14;
          break;

        case 11:
          _context3.prev = 11;
          _context3.t0 = _context3["catch"](5);
          console.error("Error creating ".concat(filename, ": ").concat(error.message));

        case 14:
          _context3.next = 17;
          break;

        case 16:
          console.log("File ".concat(indexOfFile, " already exists, skipping creation."));

        case 17:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[5, 11]]);
}

function main() {
  var numOfFilesToWrite, numOfWordsInTheFirstFile, pathForDir, numFile;
  return regeneratorRuntime.async(function main$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          if (!(process.argv.length < 4)) {
            _context4.next = 4;
            break;
          }

          console.log("there arent enough data for that program");
          _context4.next = 17;
          break;

        case 4:
          numOfFilesToWrite = parseInt(process.argv[2]);
          numOfWordsInTheFirstFile = parseInt(process.argv[3]);
          pathForDir = _path["default"].join(__dirname, "created_files");
          _context4.next = 9;
          return regeneratorRuntime.awrap(createDir(pathForDir));

        case 9:
          numFile = 0;

        case 10:
          if (!(numFile < numOfFilesToWrite)) {
            _context4.next = 17;
            break;
          }

          console.log(numOfWordsInTheFirstFile + numOfWordsInTheFirstFile * numFile);
          _context4.next = 14;
          return regeneratorRuntime.awrap(createFileIfIsntExist(numFile + 1, numOfWordsInTheFirstFile + numOfWordsInTheFirstFile * numFile));

        case 14:
          numFile++;
          _context4.next = 10;
          break;

        case 17:
        case "end":
          return _context4.stop();
      }
    }
  });
}

main();