tobase64-json
=============

> tobase64-json is a fast way to convert several pictures to base64 in a JSON.
All base64 results are written in the same JSON with pictures' name and directories' name as JSON attributes.


## Usage
- `npm install`
- copy / past your pictures in `pictures` directory
- `coffee server.coffee` or `nodemon`

## Options
- short_format : true or false

## Results examples
- short_format = true
{
  "img1": "iVBORw0KGgoAAAANSUhEUg[...]=",
  "img2": "iVBORw0KGgoAAAANSUhEUg[...]=",
  "directory1": {
    "img3": "iVBORw0KGgoAAAANSUhEUg[...]"
  }
}

- short_format = false
{
  "img1": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUg[...]=",
  "img2": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUg[...]=",
  "directory1": {
    "img3": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUg[...]"
  }
}