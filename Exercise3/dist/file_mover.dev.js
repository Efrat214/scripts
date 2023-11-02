"use strict";

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var sourceDirectory = "files_to_move";
var destinitionDirectory = "moved_files";

function moveFiles() {
  _fs["default"].exists(destinitionDirectory, function (e) {
    e ? console.log("it exists") : _fs["default"].mkdir(destinitionDirectory, function (e) {
      if (e) throw e;
    });
  });

  _fs["default"].readdir(sourceDirectory, function (err, filenames) {
    if (err) {
      onError(err);
      return;
    }

    filenames.forEach(function (filename) {
      _fs["default"].rename(_path["default"].join(sourceDirectory, filename), _path["default"].join(destinitionDirectory, filename), function (err) {
        if (err) throw err;

        _fs["default"].appendFile("moved_files.txt", filename + "\n", function (err) {
          if (err) throw err;
          console.log("".concat(filename, " was moved"));
        });
      });
    });
  });
}

moveFiles();

_fs["default"].watch(sourceDirectory, function (eventType, filename) {
  console.log("\nThe file", filename, "was modified!");
  console.log("The type of change was:", eventType);

  if (eventType == "rename") {
    moveFiles();
  }
});