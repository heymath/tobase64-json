tobase64-json
=============

> tobase64-json is a fast way to convert filess to base64 into a JSON.

## Use
```javascript
var Tobase64JSON = require("tobase64-json");
var options = {
  src: __dirname + '/images',
  dist: __dirname
};
var tobase64json = new Tobase64JSON(options);
```

```javascript
var Tobase64JSON = require("tobase64-json");
var options = {
  src: __dirname + '/images',
  dist: __dirname,
  autorun: false
};
var tobase64json = new Tobase64JSON(options);
tobase64json.run();
```

## Options
>
- src
    - type: string
    - desc: Path to the directory to convert
    - default: ""
- dist:
  - type: string
  - desc: Path to the directory of the JSON output
  - default: ""
- json_name:
  - type: string
  - desc: JSON file name white extension
  - default: "tobase64.json"
- keys_int:
  - type: boolean
  - desc: true = JSON keys are integers (0, 1, 2)
  - default: false
- keys_ext:
  - type: boolean
  - desc: true = JSON keys are files/directories name with extension (animals, dog.jpg, cat.gif)
  - default: false
- recursive:
  - type: boolean
  - desc: true = Search in src directory recursilvely
  - default: true
- autorun:
  - type: boolean
  - desc: true = Run convertion at instanciating
  - default: true
- data_mime:
  - type: boolean
  - desc: true = Add data mime before base64 encoding
  - default: true
- exclude:
  - type: array
  - desc: Files name to not convert
  - default: [".DS_Store", ".gitignore"]
