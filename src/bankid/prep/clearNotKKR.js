/**
 * @WHAT  Clear update data except socStatus + KKR
 * @WHERE clearNotKKR.js
 */

var msg = {
    in: {
        bankid_cli :{
            "person": {
                "type": "physical",
                "lastName": "Рабушенко",
                "firstName": "Антон",
                "middleName": "Володимирович",
                "inn": "3074319822",
                "birthDay": "15.12.1991",
                "sex": "M",
                "phone": "380671112223",
                "uaResident": "1",
                "flagPersonTerror": "0",
                "flagPEPs": "0",
                "flagTopLevelRisk": "0"
            },
            "extends": {
                "socStatus": "1",
                "limitWanted": "1",
                "codProduct": "12",
                "nameLat": "Kateryna Ivanova",
                "verifyDate": "16.01.2021",
                "signDate": "16.01.2021"
            },
            "addresses": [
                {
                    "type": "factual",
                    "country": "Ук",
                    "state": "Київська",
                    "area": "",
                    "city": "Буча",
                    "street": "Шухевича Романа",
                    "houseNo": "1Г",
                    "flatNo": ""
                },
                {
                    "type": "juridical",
                    "country": "Ук",
                    "state": "Київська",
                    "area": "",
                    "city": "Буча",
                    "street": "Шухевича Романа",
                    "houseNo": "1Г",
                    "flatNo": ""
                }
            ],
            "documents": [
                {
                    "type": "passport",
                    "typeName": "НВ",
                    "series": "НВ",
                    "number": "498823",
                    "issue": "Шепетівським МВ УМВС України в Хмельницькій област",
                    "dateIssue": "24.07.2008",
                    "dateExpiration": "",
                    "issueCountryIso2": "UA"
                }
            ],
            "timestamp": "202101221516377103",
            "merchant_name": "easypay_test"
        }
    }
};        


var saveParams = [
    "inn",
    "socStatus",
    "wrkPosition",
    "wrkExperience",
    "wrkCodObl",
    "countofKeeps",
    "limitWanted",
    "monthAmount",
    "ownFundAmount",
    "codProduct"
];


for(var o in msg.in.bankid_cli) {
    //console.log(o, (typeof msg.in.bankid_cli[o]));
    if(typeof msg.in.bankid_cli[o] === 'object' ) {
        for (var p in msg.in.bankid_cli[o]){
        //console.log('   ', p, (typeof p));
            
            if( !saveParams.includes(p) ) {
                delete(msg.in.bankid_cli[o][p]);
            }
            /*
            if(p !== 'inn' && p !== 'socStatus') {
                console.log('   del    ', p, (typeof p));
                delete(msg.in.bankid_cli[o][p]);
            }
            */
        }    
    }
}

console.log(msg.in.bankid_cli);

//msg.payload = msg.in.bankid_cli; 
//return msg;
