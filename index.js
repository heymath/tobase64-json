var fs = require('graceful-fs');
var util = require('util');
var mime = require('mime');
var _ = require('lodash');


var Tobase64JSON = function (path, options) {
  if (typeof path === 'undefined') {
    throw new Error('Tobase64JSON: missing `path` param');
  }

  this.dataMimeType = true;
  this.ignoreFiles = ['.DS_Store'];
  this.keysExt = true;
  this.recursive = true;
  this.path = path;

  this.setOptions(options);
}

Tobase64JSON.prototype.setOptions = function (options) {
  if (typeof options === 'object') {
    if (typeof options.dataMimeType === 'boolean') {
      this.dataMimeType = options.dataMimeType;
    }
    if (
      typeof options.ignoreFiles === 'object' &&
      options.ignoreFiles.constructor === Array
    ) {
      this.ignoreFiles = options.ignoreFiles;
    }
    if (typeof options.keysExt === 'boolean') {
      this.keysExt = options.keysExt;
    }
    if (typeof options.recursive == 'boolean') {
      this.recursive = options.recursive;
    }
  }
  return this;
};

Tobase64JSON.prototype._getDirPath = function (dir) {
  if (dir.substring(dir.length - 1) === '/') {
    return dir;
  } else {
    return dir + '/';
  }
};

Tobase64JSON.prototype._getFileKey = function (file) {
  if (this.keysExt) {
    return file;
  }

  var split = file.split('.');
  var ext = split[split.length - 1];

  return file.substring(0, file.length - (ext.length + 1));
};

Tobase64JSON.prototype._convertFileToBase64 = function (path) {
  var fileBase64 = fs.readFileSync(path).toString('base64');

  return util.format((this.dataMimeType
    ? ('data:' + mime.lookup(path) + ';base64,' + fileBase64)
    : fileBase64
  ));
};

Tobase64JSON.prototype._excludeFilesFromDir = function (dir) {
  return _.filter(dir, function (file, i) {
    return this.ignoreFiles.indexOf(file) === -1;
  }, this);
};

Tobase64JSON.prototype._convertDirToBase64 = function (path, tree) {
  var dir = this._excludeFilesFromDir(fs.readdirSync(path));

  _.each(dir, function(file, i) {
    var file_path = this._getDirPath(path) + file;
    var isDir = fs.lstatSync(file_path).isDirectory();
    var key = isDir ? file : this._getFileKey(file, i);

    if (isDir) {
      if (this.recursive) {
        tree[key] = {};
        this._convertDirToBase64(file_path, tree[key]);
      }
    } else {
      tree[key] = this._convertFileToBase64(file_path);
    }
  }, this);

  return tree;
};

Tobase64JSON.prototype._convert = function () {
  return this._convertDirToBase64(this.path, {});
};

Tobase64JSON.prototype.get = function () {
  return this._convert();
};

module.exports = Tobase64JSON;
