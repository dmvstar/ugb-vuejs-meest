var soap = require('soap');
var url = 'https://a4.oree.com.ua/Service.svc.xml';  // Download this file and xsd files from cucm admin page
var username = 'ukrgaz';
var password = 'WFtCRyFJt3';

const security = new soap.BasicAuthSecurity(username, password);
const wsSecurity = new soap.WSSecurity(username, password);

/*
soap.createClient(url,function(err,client){
  client.addHttpHeader('Authorization',auth);
});
*/
/*
soap.createClient(url, function(err, client) {

    client.setSecurity( security );
    if (err) {
      console.log(err);
    } else {
      //client.yourMethod();
    }

});
*/


soap.createClientAsync(url).then((client) => {
  client.setSecurity(wsSecurity);
  
  /*
  return  client.Calculate_Service.Calculate_Port.multiply(args,function(err, result, rawResponse, soapHeader, rawRequest) {
      console.log('-------------------rawRequest-------------------------');
      console.log('rawRequest');
      console.log(rawRequest);
      console.log('-----------------------------------------------------');
      console.log('-------------------rawResponse--------------------------');
      console.log(rawResponse);
      console.log('-----------------------------------------------------');
      console.log('RESULT');
      console.log(result);
  });
  */
});