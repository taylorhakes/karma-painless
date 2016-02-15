# karma-painless
A Karma plugin. Adapter for Painless test library.

## Setup

### Install Karma
First install [karma](https://karma-runner.github.io/0.13/intro/installation.html) and get it setup


### Install karma-painless and browserify

```
npm install karma-painless browserify --save-dev
```
You can also use with webpack

### Karma Setup
```js
module.exports = function(config) {
  config.set({
        // ...
        
        frameworks: ['browserify', 'painless'],
        
        
        // list of files / patterns to load in the browser
        files: [
            'test/**/*.js'
        ],
        
        
        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'test/**/*.js': [ 'browserify' ]
        },
        
        // ...
        
    });
}
```
 
### Run your tests
```
karma start
```
