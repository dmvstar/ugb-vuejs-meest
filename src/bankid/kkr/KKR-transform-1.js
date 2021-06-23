/**
 * @WHERE bankid/kkr/KKR-transform-1.js
 * @WHAT 
 * @VER 0.0.7-23.06.2021 08:08 
 */
var isConsole = true;
var isLocalWork = true;
if (typeof msg != "undefined") {
    isLocalWork = false;
}    
else var msg;

var transformMapa;
if(isLocalWork) { 
    var kkrDefaults = require('./KKR-defaults.json');
    var transformKK2WB = require('./KKR-kk2wb.json');
    var transformMapa = require('./KKR-mapping.json');
    var webBankData = require('./KKR-result-ok-sendtokk-200.json');
    msg = {
        kkr: {}
    };
    msg.kkr.kkrdefaults = kkrDefaults;
    msg.kkr.kk2wb = transformKK2WB;
    msg.kkr.kkrmapa = transformMapa;  
    
    msg.kkr.webdata = webBankData; 
}
var payload = {};

var temp =  msg.kkr.webdata.data.wbcli.Individuals;
payload.name    = temp.FirstName;
payload.surname = temp.LastName;
payload.patronymicName = temp.FatherName;
payload.birthDay = temp.BirthDay.replace(/T/, '@');
payload.sex = temp.Gender;
payload.maritalId = temp.MarriageStatus;

payload.stateCode = msg.kkr.webdata.data.wbcli.Clients.StateCode;
temp =  msg.kkr.webdata.data.wbcli.Clients;
payload.stateCode = temp.StateCode;

temp =  msg.kkr.webdata.data.wbcli.Communications
    .find(x => x.IsMain === true && x.IsVerified === true);
payload.phone = temp.Value;
/*
temp =  msg.kkr.webdata.data.wbcli.Addresses
    .find(x => x.IsMain === true && x.IsVerified === true);
payload.liveRegion.... = temp.Value; FATF_CodObl
*/
temp =  msg.kkr.webdata.data.wbcli.Identifications
    .find(x => x.IsMain === true && x.Checked === true);

payload.docTypeId = temp.TypeCode;
payload.docSeries = temp.Series;
payload.docNumber = temp.Number;
payload.docIssueDate = temp.IssueDate.replace(/T/, '@');

temp =  msg.kkr.webdata.data.wbcli.Properties;

for(o of msg.kkr.kk2wb) {
    //console.log("1Props", o);
    for(v in o){
        var payloadKey = v;
        //console.log("2Props", v, payloadKey);
        if(o[v].type === "Properties"){
            //console.log("3Props", o[v].code);
            var value = temp
            .find(x => x.Code === o[v].code);
            if(value !== undefined) {
                var num = value.Value;
                if(!isNaN(value.Value)) // && !(''+value.Value).includes('.'))
                    num = parseInt(value.Value);
                payload[payloadKey] = num;
                //console.log("4Props", value.Value, num, isNaN(value.Value));
            }
        }
    }
}

if(payload.lastVerificationDate !== undefined) {
    var ldt = payload.lastVerificationDate;
    // dd.mm.yyyy
    payload.lastVerificationDate =  ldt.substring(6,10)+'-'+
                                    ldt.substring(3,5)+'-'+
                                    ldt.substring(0,2)+'@00:00:00'   
}
// remapping dicts
for(p of msg.kkr.kkrmapa){
    var pkey = p.kkField;    
    var oval = payload[pkey];
    console.log("1dicts", pkey, oval);
    
    var tran = p.transform.find(x => x.from.id === ''+oval);
    console.log("2dicts", pkey, oval, tran);
    //if(tran !== undefined)
    {
        var nval = parseInt(tran.tokk.id);
        //console.log("3dicts", pkey, oval, nval);
        payload[pkey] = nval;
    }
     
}

// add defaults
for(p in msg.kkr.kkrdefaults){
    payload[p] = msg.kkr.kkrdefaults[p];    
}

/*
var payload = {

    +"phone": "+380931457919",

    "+lastVerificationDate": "2021-04-22@14:51:17",
    +-"sex": 1,
    +"name": "имя",
    +"surname": "фамилия",
    +"patronymicName": "отчество",
    +"stateCode": "3121121200",
    +"birthDay": "1994-04-24@00:00:00",

    +-"docTypeId": 1,
    +"docSeries": "АА",
    +"docNumber": "123456",
    +"docIssueDate": "2012-11-11@00:00:00",

    +"dependentsNumber": "Properties.COUNTOFUTRIM", 

    +"employmentMonth": "Properties.CLIENT_LASTWORKSTAGE",
    +"salary": "Properties.MONTHSUMM", 
    +"amount": "Properties.limitWanted"

    --"liveRegionId": 6,
    +-"educationId": 5,
    +-"maritalId": 3,
    +-"jobRegionId": 3,
    +-"jobCategoryId": 1,
    +-"positionId": "Properties.STAFFTYPE",
};
*/

msg.payload = payload;
if(isLocalWork) console.log(JSON.stringify(msg.payload,'',4));
return msg;