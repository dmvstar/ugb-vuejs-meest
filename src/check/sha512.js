
/*

def operationName = 'operationName'
def login = 'login'
def transactionId = UUID.randomUUID().toString() 
def applicationSecretKey = 'applicationSecretKey'
def sumStr = transactionId + login + operationName
def encodedSum = java.security.MessageDigest.getInstance("SHA-512")
    .digest( sumStr.getBytes("UTF-8") )
    .encodeBase64()
    .toString() 

def checkStr = encodedSum + applicationSecretKey
println java.security.MessageDigest.getInstance("SHA-512")
    .digest( checkStr.getBytes("UTF- 8") 
    .encodeBase64()
    .toString()
*/


var data = {
    "header": {
        "transactionId": "c403f114-1163-4838-b5c5-bdb9ebd6e631",
        "login": "ukrgaz",
        "password": "ViLZne5sczuwFUMb",
        "operationName": "getSuspendStatus",
        "applicationSecretKey": "bmhiHyb3853t"
    },
    "header1": {
        "transactionId": "fccadb2c-56e7-43b1-94bf-df3d1e90fd97", 
        "login": "login",
        "password": "password",
        "operationName": "operationName",
        "applicationSecretKey": "applicationSecretKey"
    }, "body": {
        "signature": "yfQd6DIAEfwlJt6XgCa3rH1TSmR/FXtPTyvmAO8Y3fkJeDRjp5iMYWu39tA8LvBHG1YODxX7Q+UpQ2uSILSWxg== ",
        "msisdn": "380631111111"
    }
}

const crypto = require('crypto');

var str = data.header.transactionId + data.header.login + data.header.operationName;
var pre = crypto.createHash('sha512').update(str).digest();
console.log(pre);
var buf = Buffer.from(pre).toString('base64');
console.log(buf);
var add = buf + data.header.applicationSecretKey;
pre = crypto.createHash('sha512').update(add).digest();
buf = Buffer.from(pre).toString('base64');
console.log(buf);

