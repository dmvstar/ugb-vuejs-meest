// Importing the Required Modules 

const fs = require('fs');
const readline = require('readline');

// Creating a readable stream from file 
// readline module reads line by line 
// but from a readable stream only. 
const file = readline.createInterface({
  input: fs.createReadStream('mapping.csv'),
  output: process.stdout,
  terminal: true
});

// Printing the content of file line by 
// line to console by listening on the 
// line event which will triggered 
// whenever a new line is read from 
// the stream 
var count = 0;
var ret = [];

file.on('line', (line) => {
  // if(count > 1 && count < 100) {
  if (count > 1) {
    if (count === 100) {
      //lineReader.close();
    }
    //console.log(count + ' '+line);
    var record = line.split(',');
    if (record[2] !== "") {
      var obj = {
        "bankid": {
          "block": record[0],
          "code": record[1]
        },
        "webbank": {
          "block": record[2],
          "code": record[3]
        },
        "dictionary": record[4],
        "isneed": record[5]
      }
      ret.push(obj);
      //console.log(JSON.stringify(obj));
    }
  }
  count++;
});

file.on('close', cb => {
  //console.log('------------------------------');
  //console.log(ret.length);
  console.log(JSON.stringify(ret));
});
