var Tobase64JSON, fs, mime, util, _;

fs = require("fs");

util = require("util");

mime = require("mime");

_ = require("lodash");

Tobase64JSON = (function() {
  var json_obj;

  json_obj = {};

  function Tobase64JSON(opts, autorun) {
    this.src = "";
    this.dist = "";
    this.keys_int = false;
    this.keys_ext = false;
    this.data_mime = true;
    this.autorun = true;
    this.recursive = true;
    this.json_name = "tobase64.json";
    this.exclude = [".DS_Store", ".gitignore"];
    _.extend(this, opts);
    if (this.autorun) {
      this.run();
    }
  }

  Tobase64JSON.prototype._dirPath = function(dir) {
    if (dir.substring(dir.length - 1) === '/') {
      return dir;
    } else {
      return dir + "/";
    }
  };

  Tobase64JSON.prototype._fileKey = function(file, i) {
    var ext, split, spliter;
    if (this.keys_int) {
      return i;
    }
    if (this.keys_ext) {
      return file;
    }
    spliter = '.';
    split = file.split(spliter);
    ext = spliter + split[split.length - 1];
    return file.substring(0, file.length - ext.length);
  };

  Tobase64JSON.prototype._fileToBase64 = function(src) {
    var data, format;
    data = fs.readFileSync(src).toString("base64");
    format = !this.data_mime ? data : "data:" + mime.lookup(src) + ";base64," + data;
    return util.format(format);
  };

  Tobase64JSON.prototype._dirToBase64 = function(path, obj) {
    var dir;
    dir = fs.readdirSync(path);
    _.remove(dir, function(target, i) {
      return this.exclude.indexOf(target) !== -1;
    }, this);
    return _.each(dir, function(target, i) {
      var key, target_path;
      target_path = this._dirPath(path) + target;
      if (fs.lstatSync(target_path).isDirectory()) {
        if (!this.recursive) {
          return;
        }
        key = this.keys_int ? i : target;
        obj[key] = {};
        return this._dirToBase64(target_path, obj[key]);
      }
      key = this._fileKey(target, i);
      return obj[key] = this._fileToBase64(target_path);
    }, this);
  };

  Tobase64JSON.prototype.run = function() {
    var output;
    this._dirToBase64(this.src, json_obj);
    output = this._dirPath(this.dist) + this.json_name;
    fs.writeFile(output, JSON.stringify(json_obj, null, 2), (function(_this) {
      return function(err) {
        return console.log(err || ("Finished tobase64-json: " + output));
      };
    })(this));
    return this;
  };

  return Tobase64JSON;

})();

module.exports = Tobase64JSON;
