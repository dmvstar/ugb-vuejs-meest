var WSSecurity = require('wssecurity');
var soap = require('soap');
var username = 'ukrgaz';
var password = 'WFtCRyFJt3';
const wsSecurity = new soap.WSSecurity(username, password);

 
var sec = new WSSecurity('ukrgaz', 'WFtCRyFJt3');
 
var xml = sec.toXML();

console.log( xml );

console.log( wsSecurity.toXML() );


// https://stackoverflow.com/questions/57113648/how-to-wsse-soap-request-in-javascript-node
