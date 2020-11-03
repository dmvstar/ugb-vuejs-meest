// https://stackoverflow.com/questions/57113648/how-to-wsse-soap-request-in-javascript-node

import request from 'request';

var soap = require('soap');
var username = 'ukrgaz';
var password = 'WFtCRyFJt3';
const wsSecurity = new soap.WSSecurity(username, password);

import {wsseHeaderAssoc} from 'backend/wsse';

export function getLocationID() {

    let apiUsername = "username";
    let apiPassword = "password";
    let apiURL = "https://api.serviceprovider.com/wsdl";

    // WSSE authentication header vars
    let wsse = wsseHeaderAssoc(apiUsername, apiPassword);
    let wsseUsername = wsse["Username"];
    let wssePasswordDigest = wsse["PasswordDigest"];
    let wsseCreated = wsse["Created"];
    let wsseNonce = wsse["Nonce"];

    var xml = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:ns="http://oree.com.ua/etsua/soapsvc/bankaccountstatus/2020/09">\
    <soap:Header>\
    </soap:Header/>\
    <soap:Body>\
       <ns:UploadRequest>\
          <ns:BANKLIMITS answer-required="true" date-time="2020-10-26T18:51:13Z " dtd-release="1" dtd-version="1" id="5654" message-code="301">\
             <ns:SenderIdentification id="UGB" coding-scheme="NAME"/>\
             <ns:ReceiverIdentification id="62X-OPERRYNKU--3" coding-scheme="EIC"/>\
             <ns:Limits date="2020-10-26T18:51:13Z" title="FinancialLimit">\
              <ns:Participant  edrpou="23697280" bankCode="320478" iban="UA133204780000026007924864736" name="АТ ДТЕК ДНІПРОЕНЕРГО">\
                   <ns:DataGroups>\
                      <ns:TotalsData>\
                         <ns:Data type="limit" value="1121.42" currency="UAH"/>\
                      </ns:TotalsData>\
                   </ns:DataGroups>\
                </ns:Participant>\
             </ns:Limits>\
          </ns:BANKLIMITS>\
       </ns:UploadRequest>\
    </soap:Body>\
    </soap:Envelope>'

    `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:masked:api">`+
        `<soapenv:Header>`+
            `<wsse:Security xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">`+
                `<wsse:UsernameToken wsu:Id="UsernameToken-19834957983507345987345987345">`+
                    `<wsse:Username>${wsseUsername}</wsse:Username>`+
                    `<wsse:Password Type="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordDigest">${wssePasswordDigest}</wsse:Password>`+
                    `<wsse:Nonce EncodingType="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-soap-message-security-1.0#Base64Binary">${wsseNonce}</wsse:Nonce>`+
                    `<wsu:Created>${wsseCreated}</wsu:Created>`+
                `</wsse:UsernameToken>`+
            `</wsse:Security>`+
        `</soapenv:Header>`+
        `<soapenv:Body>`+
        ...
        `</soapenv:Body>`+
    `</soapenv:Envelope>`

    var options = {
    url: apiURL,
    method: 'POST',
    body: xml,
    headers: {
        'Content-Type':'text/xml;charset=utf-8',
        'Accept-Encoding': 'gzip,deflate',
        'Content-Length':xml.length,
        'SOAPAction':"https://api.serviceprovider.com/wsdl/service",
        'User-Agent':"Apache-HttpClient/4.1.1 (java 1.5)",
        'Connection':"Keep-Alive"
    }
    };

    let callback = (error, response, body) => {
    if (!error && response.statusCode == 200) {
        console.log('Raw result ', response);

        // If you ever get this working, do some mad magic here
    };
    console.log('Error ', response);  
    };

}



/*

<soap:Envelope xmlns:ns="http://oree.com.ua/etsua/soapsvc/bankaccountstatus/2020/09" xmlns:soap="http://www.w3.org/2003/05/soap-envelope">
   <soap:Header><wsse:Security soap:mustUnderstand="true" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd"><wsse:UsernameToken wsu:Id="UsernameToken-B13AC6EA3C73F772FC16043933558912"><wsse:Username>ukrgaz</wsse:Username><wsse:Password Type="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText">WFtCRyFJt3</wsse:Password></wsse:UsernameToken></wsse:Security></soap:Header>
   <soap:Body>
      <ns:UploadRequest>
         <ns:BANKLIMITS answer-required="true" date-time="2020-10-26T18:51:13Z " dtd-release="1" dtd-version="1" id="5654" message-code="301">
            <ns:SenderIdentification coding-scheme="NAME" id="UGB"/>
            <ns:ReceiverIdentification coding-scheme="EIC" id="62X-OPERRYNKU--3"/>
            <ns:Limits date="2020-10-26T18:51:13Z" title="FinancialLimit">
             <ns:Participant bankCode="320478" edrpou="23697280" iban="UA133204780000026007924864736" name="АТ ДТЕК ДНІПРОЕНЕРГО">
                  <ns:DataGroups>
                     <ns:TotalsData>
                        <ns:Data currency="UAH" type="limit" value="1121.42"/>
                     </ns:TotalsData>
                  </ns:DataGroups>
               </ns:Participant>
            </ns:Limits>
         </ns:BANKLIMITS>
      </ns:UploadRequest>
   </soap:Body>
</soap:Envelope>

*/

