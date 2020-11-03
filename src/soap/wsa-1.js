const WebSocket = require('ws');
// a4.oree.com.ua 94.131.247.4  ukrgaz WFtCRyFJt3
const ws = new WebSocket('wss://ukrgaz:WFtCRyFJt3@a4.oree.com.ua/index.php/bank_ws/upload');

var xml = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:ns="http://oree.com.ua/etsua/soapsvc/bankaccountstatus/2020/09">\
<soap:Header/>\
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

ws.on('open', function open() {
  ws.send(xml);
});

ws.on('message', function incoming(data) {
  console.log(data);
});

