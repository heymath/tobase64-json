fs    = require "fs"
util  = require "util"
mime  = require "mime"
_     = require "lodash"

pictures = {}
root_path         = "./"
dir_path          = "#{root_path}pictures/"
dir_keys_int      = false
json_name         = "base64.json"
files_exceptions  = [
  ".DS_Store"
  json_name
]


# Options.
short_format      = false


imgToBase64 = (src) ->
  data = fs.readFileSync(src).toString "base64"
  format = if short_format then data else "data:" + mime.lookup(src) + ";base64," + data
  util.format format


toBase64Json = () ->
  directory = fs.readdirSync dir_path

  for file, i in directory
    if fs.lstatSync(dir_path + file).isDirectory()
      file_is_dir = file
      subdirectory = fs.readdirSync dir_path + file_is_dir

      for subfile in subdirectory
        is_exception = _.findIndex files_exceptions, (exception) -> exception is subfile

        if is_exception is -1
          json_key = if dir_keys_int then i else file_is_dir
          short_name = subfile.substring 0, subfile.length - 4
          pictures[json_key] = {} if typeof pictures[file_is_dir] isnt "object"
          pictures[json_key][short_name] = imgToBase64 "#{dir_path}#{file_is_dir}/#{subfile}"
    else
      is_exception = _.findIndex files_exceptions, (exception) -> exception is file

      if is_exception is -1
        short_name = file.substring 0, file.length - 4
        pictures[short_name] = imgToBase64 dir_path + file

  fs.writeFile root_path + json_name, JSON.stringify(pictures, null, 2), (err) ->
    unless err
      console.log "JSON saved to ", json_name
    else console.log err


do toBase64Json