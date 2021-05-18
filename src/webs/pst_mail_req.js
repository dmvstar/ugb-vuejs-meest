var request = require('request');
var options = {
  'method': 'POST',
  'url': 'https://script.google.com/macros/s/AKfycbwfFHsU5HaleJTuDSAUPo0KBub38xNvZWKVAuUxzXEBjVpQv2wfJAaQ2sjCfxR2jDcI/exec',
  'headers': {
    'Content-Type': 'text/plain;charset=utf-8'
  },
  body: '{\n    "subject" : "Test from Postman",\n    "to": "dmvstar@gmail.com",\n    "body": "Test from Postman"\n}'

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});

