var fs, mime, tobase64_json, tobase64json, util, _;

fs = require("fs");

util = require("util");

mime = require("mime");

_ = require("lodash");

tobase64json = (function() {
  function tobase64json() {
    this.pictures = {};
    this.root_path = "./";
    this.dir_path = "pictures/";
    this.dir_keys_int = false;
    this.json_name = "base64.json";
    this.short_format = true;
    this.files_exceptions = [".DS_Store", ".gitignore"];
  }

  tobase64json.prototype.imgToBase64 = function(src) {
    var data, format;
    data = fs.readFileSync(src).toString("base64");
    format = this.short_format ? data : "data:" + mime.lookup(src) + ";base64," + data;
    return util.format(format);
  };

  tobase64json.prototype.run = function() {
    var directory, file, file_is_dir, i, is_exception, j, json_key, short_name, subdirectory, subfile, _i, _j, _len, _len1;
    console.log("running tobase64-json");
    directory = fs.readdirSync(this.dir_path);
    for (i = _i = 0, _len = directory.length; _i < _len; i = ++_i) {
      file = directory[i];
      if (fs.lstatSync(this.dir_path + file).isDirectory()) {
        file_is_dir = file;
        subdirectory = fs.readdirSync(this.dir_path + file_is_dir);
        for (j = _j = 0, _len1 = subdirectory.length; _j < _len1; j = ++_j) {
          subfile = subdirectory[j];
          is_exception = _.findIndex(this.files_exceptions, function(exception) {
            return exception === subfile;
          });
          if (is_exception === -1) {
            json_key = this.dir_keys_int ? i : file_is_dir;
            short_name = this.dir_keys_int ? j : subfile.substring(0, subfile.length - 4);
            if (typeof this.pictures[file_is_dir] !== "object") {
              this.pictures[json_key] = {};
            }
            this.pictures[json_key][short_name] = this.imgToBase64("" + this.dir_path + file_is_dir + "/" + subfile);
          }
        }
      } else {
        is_exception = _.findIndex(this.files_exceptions, function(exception) {
          return exception === file;
        });
        if (is_exception === -1) {
          short_name = this.dir_keys_int ? i : file.substring(0, file.length - 4);
          this.pictures[short_name] = this.imgToBase64(this.dir_path + file);
        }
      }
    }
    return fs.writeFile(this.root_path + this.json_name, JSON.stringify(this.pictures, null, 2), (function(_this) {
      return function(err) {
        if (!err) {
          return console.log("JSON saved to ", _this.json_name);
        } else {
          return console.log(err);
        }
      };
    })(this));
  };

  return tobase64json;

})();

tobase64_json = new tobase64json();

module.exports = tobase64_json;