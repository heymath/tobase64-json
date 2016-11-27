tobase64-json
=============

> tobase64-json is a fast way to convert files to base64 into a JSON like object.


## Install
`$ npm install --save tobase64-json`


## Examples

### With default options
```javascript
// import the library
var Tobase64JSON = require('tobase64-json');

// your files directory to convert into base64
var dirPath = __dirname + '/whatever';

var base64json = new Tobase64JSON(dirPath).get();
```

### With custom options
```javascript
// import the library
var Tobase64JSON = require('tobase64-json');

// these are actually the default options
var options = {
  dataMimeType: true,
  ignoreFiles: ['.DS_Store'],
  keysExt: true,
  recursive: true
};

// then can do it like one of these ways:
var base64json = new Tobase64JSON(dirPath, options).get();
var base64json = new Tobase64JSON(dirPath).setOptions(options).get();
```


## Options

### dataMimeType
- **desc**: prefix base64 width data mime type
- **type**: boolean
- **default**: true


### ignoreFiles
- **desc**: files name to ignore
- **type**: array
- **default**: ['.DS_Store']


### keysExt
- **desc**: include files extensions in JSON keys or not
- **type**: boolean
- **default**: true


### recursive
- **desc**: convert directory content recursively or not
- **type**: boolean
- **default**: true


## Output examples

### default
```javascript
new Tobase64JSON(__dirname + '/images').get();

{
  'image1.jpg': 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD//...',
  'image2.png': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAA...',
  'directory': {
    'image3.gif': 'data:image/gif;base64,R0lGODdhlgCWAOMAAAAAAP///z8/P9...'
  },
  'folder': {
    'image1.jpg': 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD//...',
    'image2.png': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAA...'
  }
}
```

### dataMimeType: false
```javascript
new Tobase64JSON(__dirname + '/images', { dataMimeType: false }).get();

{
  'image1.jpg': '/9j/4AAQSkZJRgABAQAAAQABAAD//...',
  'image2.png': 'iVBORw0KGgoAAAANSUhEUgAAADIAAA...',
  'directory': {
    'image3.gif': 'R0lGODdhlgCWAOMAAAAAAP///z8/P9...'
  },
  'folder': {
    'image1.jpg': '/9j/4AAQSkZJRgABAQAAAQABAAD//...',
    'image2.png': 'iVBORw0KGgoAAAANSUhEUgAAADIAAA...'
  }
}
```

### ignoreFiles: ['image1.jpg']
```javascript
new Tobase64JSON(__dirname + '/images', { ignoreFiles: ['image1.jpg'] }).get();

{
  'image2.png': 'iVBORw0KGgoAAAANSUhEUgAAADIAAA...',
  'directory': {
    'image3.gif': 'R0lGODdhlgCWAOMAAAAAAP///z8/P9...'
  },
  'folder': {
    'image2.png': 'iVBORw0KGgoAAAANSUhEUgAAADIAAA...'
  }
}
```

### keysExt: false
```javascript
new Tobase64JSON(__dirname + '/images').setOptions({ keysExt: false }).get();

{
  'image1': 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD//...',
  'image2': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAA...',
  'directory': {
    'image3': 'data:image/gif;base64,R0lGODdhlgCWAOMAAAAAAP///z8/P9...'
  },
  'folder': {
    'image1': 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD//...',
    'image2': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAA...'
  }
}
```

### recursive: false
```javascript
new Tobase64JSON(__dirname + '/images').setOptions({ recursive: false }).get();

{
  'image1.jpg': 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD//...',
  'image2.png': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAA...'
}
```
