'use strict';

const fs = require('graceful-fs');
const mime = require('mime');
const _ = require('lodash');


class PathMissingError extends Error{}

class PathUnsupportedError extends Error{}

class Tobase64JSON {

    static get PathMissingError() {
        return PathMissingError;
    }

    static get PathUnsupportedError() {
        return PathUnsupportedError;
    }

    constructor(path, options) {
        if (typeof path === 'undefined') {
            throw new PathMissingError('Missing `path` param, string required.');
        }

        this.dataMimeType = true;
        this.ignoreFiles = ['.DS_Store'];
        this.keysExt = true;
        this.recursive = true;
        this.path = path;

        this.setOptions(options);
    }

    setOptions(options) {
        if (typeof options === 'object') {
            if (typeof options.dataMimeType === 'boolean') {
                this.dataMimeType = options.dataMimeType;
            }
            if (Array.isArray(options.ignoreFiles)) {
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
    }

    get() {
        const stats = fs.lstatSync(this.path);

        if (stats.isDirectory()) {
            return this._convertDirToBase64(this.path, {});
        } else if (stats.isFile()) {
            return this._convertFileToBase64(this.path);
        }

        throw new PathUnsupportedError('Unsupported path, it should be a file or a directory.');
    }

    _getDirPath(dir) {
        if (dir.substring(dir.length - 1) === '/') {
            return dir;
        }
        return dir + '/';
    }

    _getFileKey(file) {
        if (this.keysExt) {
            return file;
        }

        const split = file.split('.');
        const ext = '.' + split[split.length - 1];

        return file.substring(0, file.length - ext.length);
    }

    _convertFileToBase64(path) {
        const fileBase64 = fs.readFileSync(path).toString('base64');

        if (this.dataMimeType) {
            return 'data:' + mime.lookup(path) + ';base64,' + fileBase64;
        }

        return fileBase64;
    }

    _excludeFilesFromDir(dir) {
        return _.filter(dir, function (file) {
            return this.ignoreFiles.indexOf(file) === -1;
        }.bind(this));
    }

    _convertDirToBase64(path, tree) {
        const dir = this._excludeFilesFromDir(fs.readdirSync(path));

        _.each(dir, function(file, i) {
            const file_path = this._getDirPath(path) + file;
            const stats = fs.lstatSync(file_path);

            if (stats.isFile()) {
                const key = this._getFileKey(file, i);
                const fileBase64 = this._convertFileToBase64(file_path);

                tree[key] = fileBase64;
            } else if (stats.isDirectory() && this.recursive) {
                const key = file;

                tree[key] = {};

                this._convertDirToBase64(file_path, tree[key]);
            }
        }.bind(this));

        return tree;
    }
}

module.exports = Tobase64JSON;
