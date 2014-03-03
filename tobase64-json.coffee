fs    = require "fs"
util  = require "util"
mime  = require "mime"
_     = require "lodash"


class tobase64json

  constructor: ->
    @pictures         = {}
    @root_path        = "./"
    @dir_path         = "pictures/"
    @dir_keys_int     = false
    @json_name        = "base64.json"
    @short_format     = true
    @files_exceptions = [
      ".DS_Store"
      ".gitignore"
    ]


  imgToBase64: (src) ->
    data = fs.readFileSync(src).toString "base64"
    format = if @short_format then data else "data:" + mime.lookup(src) + ";base64," + data
    util.format format


  run: () ->
    console.log "running tobase64-json"
    directory = fs.readdirSync @dir_path

    for file, i in directory
      if fs.lstatSync(@dir_path + file).isDirectory()
        file_is_dir = file
        subdirectory = fs.readdirSync @dir_path + file_is_dir

        for subfile, j in subdirectory
          is_exception = _.findIndex @files_exceptions, (exception) ->
            exception is subfile

          if is_exception is -1
            json_key = if @dir_keys_int then i else file_is_dir
            short_name = if @dir_keys_int then j else subfile.substring 0, subfile.length - 4
            @pictures[json_key] = {} if typeof @pictures[file_is_dir] isnt "object"
            @pictures[json_key][short_name] = @imgToBase64 "#{@dir_path}#{file_is_dir}/#{subfile}"
      else
        is_exception = _.findIndex @files_exceptions, (exception) ->
          exception is file

        if is_exception is -1
          short_name = if @dir_keys_int then i else file.substring 0, file.length - 4
          @pictures[short_name] = @imgToBase64 @dir_path + file

    fs.writeFile @root_path + @json_name, JSON.stringify(@pictures, null, 2), (err) =>
      unless err
        console.log "JSON saved to ", @json_name
      else console.log err


tobase64_json = new tobase64json()

module.exports = tobase64_json