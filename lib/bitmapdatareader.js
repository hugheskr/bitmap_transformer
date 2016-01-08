const EE = require('events').EventEmitter;
const fs = require('fs');

var ee = new EE();

var bitmap;
var range;
var start;

function transforming(start, bitmap) {
  for(var i = start; i < bitmap.length; i ++) {
      bitmap[i] = 255 - bitmap[i];
  }
  return bitmap;
}

//reading
fs.readFile((__dirname + "/../mushrooms.bmp"), (error, data) => {
  if (error) return console.log('error');
  bitmap = data;
  start = bitmap.readUInt32LE(10);
  range = bitmap.slice(start);
  console.log('start of pixel data: ' +  start);
  console.log('size: ' + bitmap.readUInt32LE(2));
  console.log('type: ' + bitmap.toString('utf8', 0, 2));
  
  ee.emit('read complete');
});

//transforming
//inversion: take 255 - (actual value of rgb)
//r = 255-r
//g = 255-g
//b = 255-b
ee.on('read complete', function() {
  transforming(start, bitmap);	
  ee.emit('transformed');
});

//writing
ee.on('transformed', function() {
  fs.writeFile((__dirname + "/../transformed.bmp"), bitmap, (error, data) => {
    if (error) return console.log('error');
    console.log('complete');
  });
});

module.exports.transforming = transforming;