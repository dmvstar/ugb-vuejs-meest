// Importing the Required Modules 

const fs = require('fs');
const readline = require('readline');

// Creating a readable stream from file 
// readline module reads line by line 
// but from a readable stream only. 
const file = readline.createInterface({
  input: fs.createReadStream('mapping.csv'),
  output: null,
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
  if (count >= 0) {
    //if (count === 100) {
      //lineReader.close();
    //}
    var record = line.split(',');
    //console.log(count + '['+record[2]+'] '+line);
    
    if (record[2] !== "") {
      var obj = {
        "cnt" : record.length,
        "bankid": {
          "block": record[0],
          "code": record[1],
          "type": record[2]
        },
        "webbank": {
          "block": record[3],
          "code": record[4],
          "type": record[6],
          "default": record[7]
        },
        "dictionary": record[5],
        "isneed": record[8]
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
