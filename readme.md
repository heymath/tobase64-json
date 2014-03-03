tobase64-json
=============

> tobase64-json is a fast way to convert several pictures to base64 in a JSON.
All base64 results are written in the same JSON with pictures' name and directories' name as JSON attributes.


## Use
> tobase64json = require "tobase64-json"
do tobase64json.run

## Use with options
> tobase64json = require "tobase64-json"
tobase64json.short_format = true
tobase64json.dir_keys_int = false
tobase64json.dir_path     = "pictures/"
do tobase64json.run

## Options
- short_format : true or false
- dir_keys_int : true or false
- dir_path     : path to pictures directory
- json_name    : name of the generated json

## Results examples
- short_format = true
```javascript
{
  "img1": "iVBORw0KGgoAAAANSUhEUg[...]=",
  "img2": "iVBORw0KGgoAAAANSUhEUg[...]=",
  "directory1": {
    "img3": "iVBORw0KGgoAAAANSUhEUg[...]"
  }
}
```

- short_format = false
```javascript
{
  "img1": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUg[...]=",
  "img2": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUg[...]=",
  "directory1": {
    "img3": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUg[...]"
  }
}
```

- dir_keys_int = false
```javascript
{
  "img1": "iVBORw0KGgoAAAANSUhEUg[...]=",
  "img2": "iVBORw0KGgoAAAANSUhEUg[...]=",
  "directory1": {
    "img3": "iVBORw0KGgoAAAANSUhEUg[...]"
  }
}
```

- dir_keys_int = true
```javascript
{
  "0": "iVBORw0KGgoAAAANSUhEUg[...]=",
  "1": "iVBORw0KGgoAAAANSUhEUg[...]=",
  "2": {
    "0": "iVBORw0KGgoAAAANSUhEUg[...]"
  }
}
```