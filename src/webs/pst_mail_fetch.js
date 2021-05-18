var myHeaders = new Headers();
myHeaders.append("Content-Type", "text/plain;charset=utf-8");

var raw = "{\n    \"subject\" : \"Test from Postman\",\n    \"to\": \"dmvstar@gmail.com\",\n    \"body\": \"Test from Postman\"\n}";

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://script.google.com/macros/s/AKfycbwfFHsU5HaleJTuDSAUPo0KBub38xNvZWKVAuUxzXEBjVpQv2wfJAaQ2sjCfxR2jDcI/exec", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

