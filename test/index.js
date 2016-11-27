var expect = require('chai').expect;
var Tobase64JSON = require('../index.js');

var DATA_MIME_TYPE_JPG = 'data:image/jpeg;base64,';
var DATA_MIME_TYPE_PNG = 'data:image/png;base64,';
var DATA_MIME_TYPE_GIF = 'data:image/gif;base64,';

var IMAGE_50 = 'iVBORw0KGgoAAAANSUhEUgAAADIAAAAyBAMAAADsEZWCAAAAGFBMVEUAAAD///+fn59/f38/Pz8fHx9fX1+/v78CFFm8AAAAiUlEQVQ4je2PPQqFMBCEh0RzDkHSB3xaW1kviL34e/8bmF2j0fp1kiEk7H7sZBZISvpP+aui8JZVaxobClX9ME8BOaCHCkT7eYfiJgt3Or78MS23TjeqYQhmtOxWa8J6/eiEYBd7/SLihnIUEt08kQSKNiExQTORpB6Q+f5mY2peLG6aPzZN+pYOXLMRI0lTo4MAAAAASUVORK5CYII=';
var IMAGE_100 = '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';
var IMAGE_150 = 'R0lGODdhlgCWAOMAAAAAAP///z8/P9/f37+/v39/f5+fnx8fH19fXwAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAAlgCWAAAE/hDISau9OOvNu/9gKI5kaZ5oqq5s675wLM90bd94ru987//AoHBILBqPyKRyyWw6n9CodEqtWq/YrHbL7Xq/4LB4TC6bz+i0es1uu9/wuHxOr9vv+Lx+z+/7/4CBgoOEhYaHiImKi4yNjo+QkZKTlJWWl5iZmpucXwcCAgdZn6E2AgMEGQQBrK2tFwgDAQOyBAI4p6kYq66usLK0AbYzBbO6FwQFB8vMyxbFyhIHBgEINsWoqsrNzM8B0QDT1TEGAwIGxxYD1hwCAbcVxaIz5efpFesd7vAU8i4HBAaIQpdhHAcCBnYljAFQIACCGAxuQKiwxYEBCx/eo/COw4GO/rACMMQ4AeIFkBo+8quAQCSLAwUomKygkkPLDDUxIMhoQcBGCjBl/gyHMsNNDDlhzAQaYJ6GAkMl5ENKsuc3EEsnfHSaAaqGqUqHujuwkwDClRIM8LSQLGXVCe5iYhXbtOxZC2o1tCVHFyOCv+UIcKWoaq2FixnjisgqwZ1fwKgGG6ZAOCxScFrNUpZbcQNiAIoXD4XJNZzmCXs7WwbxkR2AysgmH8Z4dQTjlBJhs5Wt4rbejHm1eWgZlYPvwiV5v+b84jgGk14zgNXgrpxyDc4vQC8+3UV2vBlj4SyKQfFn0YvDDxiPtsX3CpWTsnRJvXa4tx/eU84on8JRviG0vLafauXZJw1+HegnjUSvyaabd8Vptx4F+1jQUmkVhEYTghso+NCEcJEHwIX0DFWAASv55FA89sHEICzM0XRdBbedmGJAGEKjVTGuAXjBNMDIEoABGEoQyyy1tFciUuUgyQqROgUpjJI7kFLkYaBcCYSVHXDZyZdghinmmGSWaeaZaKap5ppstunmm3DGKeecdNZp55145qnnnnz26eefgAYq6KCEFmrooYgmquiijDbq6KOQRirppJRWGkMEADs=';

var IMAGE_50_PNG = DATA_MIME_TYPE_PNG + IMAGE_50;
var IMAGE_100_JPG = DATA_MIME_TYPE_JPG + IMAGE_100;
var IMAGE_150_GIF = DATA_MIME_TYPE_GIF + IMAGE_150;

var imagesPath = __dirname + '/images/';
var simplePath = __dirname + '/simple/';
var treePath = __dirname + '/tree/';


describe ('Tobase64JSON', function () {

  describe('#general', function () {

    it ('should set options after instanciation', function () {
      var instance = new Tobase64JSON(treePath).setOptions({
        dataMimeType: false,
        ignoreFiles: ['.DS_Store', '50x50.png'],
        keysExt: false,
        recursive: false
      });

      expect(instance.get()).to.deep.equal({
        '100x100': IMAGE_100,
        '150x150': IMAGE_150
      });
    });

    it ('should work using same instance and different options', function () {
      var instance = new Tobase64JSON(simplePath).setOptions({
        dataMimeType: true,
        keysExt: false,
      });

      expect(instance.get()).to.deep.equal({
        '50x50': IMAGE_50_PNG,
        '100x100': IMAGE_100_JPG,
        '150x150': IMAGE_150_GIF
      });

      instance.setOptions({
        dataMimeType: false,
        keysExt: true,
      });

      expect(instance.get()).to.deep.equal({
        '50x50.png': IMAGE_50,
        '100x100.jpg': IMAGE_100,
        '150x150.gif': IMAGE_150
      });
    });

    it ('should work with 2 instances at the same time', function () {
      var simple = new Tobase64JSON(simplePath).get();
      var tree = new Tobase64JSON(treePath).get();

      expect(simple).to.deep.equal({
        '50x50.png': IMAGE_50_PNG,
        '100x100.jpg': IMAGE_100_JPG,
        '150x150.gif': IMAGE_150_GIF
      });

      expect(tree).to.deep.equal({
        '50x50.png': IMAGE_50_PNG,
        '100x100.jpg': IMAGE_100_JPG,
        '150x150.gif': IMAGE_150_GIF,
        'branch1': {
          '50x50.png': IMAGE_50_PNG,
          '150x150.gif': IMAGE_150_GIF,
          'branch1': {
            '100x100.jpg': IMAGE_100_JPG
          },
          'branch2': {
            '100x100.jpg': IMAGE_100_JPG,
            '150x150.gif': IMAGE_150_GIF,
          }
        },
        'branch2': {
          '100x100.jpg': IMAGE_100_JPG,
          '150x150.gif': IMAGE_150_GIF,
        }
      });
    });

  });

  describe('#single directory', function () {

    it ('should convert with default options', function () {
      var json = new Tobase64JSON(simplePath).get();

      expect(json).to.deep.equal({
        '50x50.png': IMAGE_50_PNG,
        '100x100.jpg': IMAGE_100_JPG,
        '150x150.gif': IMAGE_150_GIF
      });
    });

    it ('should convert without data mime type', function () {
      var json = new Tobase64JSON(simplePath, { dataMimeType: false }).get();

      expect(json).to.deep.equal({
        '50x50.png': IMAGE_50,
        '100x100.jpg': IMAGE_100,
        '150x150.gif': IMAGE_150
      });
    });

    it ('should convert without extensions in keys', function () {
      var json = new Tobase64JSON(simplePath, { keysExt: false }).get();

      expect(json).to.deep.equal({
        '50x50': IMAGE_50_PNG,
        '100x100': IMAGE_100_JPG,
        '150x150': IMAGE_150_GIF
      });

    });

  });

  describe('#tree directory', function () {

    it ('should convert with default options', function () {
      var json = new Tobase64JSON(treePath).get();

      expect(json).to.deep.equal({
        '50x50.png': IMAGE_50_PNG,
        '100x100.jpg': IMAGE_100_JPG,
        '150x150.gif': IMAGE_150_GIF,
        'branch1': {
          '50x50.png': IMAGE_50_PNG,
          '150x150.gif': IMAGE_150_GIF,
          'branch1': {
            '100x100.jpg': IMAGE_100_JPG
          },
          'branch2': {
            '100x100.jpg': IMAGE_100_JPG,
            '150x150.gif': IMAGE_150_GIF,
          }
        },
        'branch2': {
          '100x100.jpg': IMAGE_100_JPG,
          '150x150.gif': IMAGE_150_GIF,
        }
      });
    });

    it ('should convert without data mime type', function () {
      var json = new Tobase64JSON(treePath, { dataMimeType: false }).get();

      expect(json).to.deep.equal({
        '50x50.png': IMAGE_50,
        '100x100.jpg': IMAGE_100,
        '150x150.gif': IMAGE_150,
        'branch1': {
          '50x50.png': IMAGE_50,
          '150x150.gif': IMAGE_150,
          'branch1': {
            '100x100.jpg': IMAGE_100
          },
          'branch2': {
            '100x100.jpg': IMAGE_100,
            '150x150.gif': IMAGE_150,
          }
        },
        'branch2': {
          '100x100.jpg': IMAGE_100,
          '150x150.gif': IMAGE_150,
        }
      });
    });

    it ('should convert without keys extensions', function () {
      var json = new Tobase64JSON(treePath, { keysExt: false }).get();

      expect(json).to.deep.equal({
        '50x50': IMAGE_50_PNG,
        '100x100': IMAGE_100_JPG,
        '150x150': IMAGE_150_GIF,
        'branch1': {
          '50x50': IMAGE_50_PNG,
          '150x150': IMAGE_150_GIF,
          'branch1': {
            '100x100': IMAGE_100_JPG
          },
          'branch2': {
            '100x100': IMAGE_100_JPG,
            '150x150': IMAGE_150_GIF,
          }
        },
        'branch2': {
          '100x100': IMAGE_100_JPG,
          '150x150': IMAGE_150_GIF,
        }
      });
    });

    it ('should convert without recursive', function () {
      var json = new Tobase64JSON(treePath, { recursive: false }).get();

      expect(json).to.deep.equal({
        '50x50.png': IMAGE_50_PNG,
        '100x100.jpg': IMAGE_100_JPG,
        '150x150.gif': IMAGE_150_GIF
      });

    });

  });

});
