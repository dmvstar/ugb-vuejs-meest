var crypto = require('crypto');

var data = "1";
var hash;

hash1 = crypto.createHash('md5').update(data, 'utf8').digest('hex');
console.log(hash1);
hash2 = crypto.createHash('md5').update(data, 'binary').digest("hex");
console.log(hash2);

