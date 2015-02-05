fs    = require "fs"
util  = require "util"
mime  = require "mime"
_     = require "lodash"


class Tobase64JSON

  json_obj = {}

  constructor: (opts, autorun) ->
    @src        = ""
    @dist       = ""
    @keys_int   = off
    @keys_ext   = off
    @data_mime  = on
    @autorun    = on
    @recursive  = on
    @json_name  = "tobase64.json"
    @exclude     = [".DS_Store", ".gitignore"]

    _.extend @, opts

    do @run if @autorun


  _dirPath: (dir) ->
    if dir.substring(dir.length - 1) is '/' then dir else "#{dir}/"

  _fileKey: (file, i) ->
    return i if @keys_int
    return file if @keys_ext
    spliter = '.'
    split = file.split spliter
    ext = spliter + split[split.length-1]
    file.substring 0, file.length - ext.length

  _fileToBase64: (src) ->
    data = fs.readFileSync(src).toString "base64"
    format = if not @data_mime then data else "data:" + mime.lookup(src) + ";base64," + data
    util.format format

  _dirToBase64: (path, obj) ->
    dir = fs.readdirSync path
    _.remove dir, (target, i) ->
      @exclude.indexOf(target) isnt -1
    , @
    _.each dir, (target, i) ->
      target_path = @_dirPath(path) + target
      if fs.lstatSync(target_path).isDirectory()
        return if not @recursive
        key = if @keys_int then i else target
        obj[key] = {}
        return @_dirToBase64 target_path, obj[key]
      key = @_fileKey target, i
      obj[key] = @_fileToBase64 target_path
    , @

  run: ->
    @_dirToBase64 @src, json_obj
    output = @_dirPath(@dist) + @json_name
    fs.writeFile output, JSON.stringify(json_obj, null, 2), (err) =>
      console.log err or "Finished tobase64-json: #{output}"
    @


module.exports = Tobase64JSON
