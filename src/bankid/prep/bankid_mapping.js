// Importing the Required Modules 

const fs = require('fs');
const readline = require('readline');

var myArgs = process.argv.slice(2);
// console.log('myArgs: ', myArgs[0]);

// Creating a readable stream from file 
// readline module reads line by line 
// but from a readable stream only. 
const file = readline.createInterface({
  input: fs.createReadStream(myArgs[0]),
  output: null,
  terminal: true
});

// Printing the content of file line by 
// line to console by listening on the 
// line event which will triggered 
// whenever a new line is read from 
// the stream 
var count = 1;
var ret = [];

file.on('line', (line) => {
  // if(count > 1 && count < 100) {
  if (count >= 0) {
    //if (count === 100) {
    //lineReader.close();
    //}
    var record = line.split(',');
    //console.log(count + '['+record[2]+'] '+line);
    //"cnt" : record.length,
    if (record[2] !== "" && record[0] !== "none") {
      var obj = {
        "cnt": count,
        "bankid": {
          "block": record[0],
          "source": record[1],
          "code": record[2],
          "maps": record[3],
          "type": record[4]
        },
        "webbank": {
          "block": record[5],
          "code": record[6],
          "type": record[8],
          "default": record[9],
          "dict": record[7],
          "isneed": record[10]
        }
      }
      count++;
      ret.push(obj);
      //console.log(JSON.stringify(obj));
    }
  }
  //count++;
});

file.on('close', cb => {
  //console.log('------------------------------');
  //console.log(ret.length);
  console.log(JSON.stringify(ret));
});