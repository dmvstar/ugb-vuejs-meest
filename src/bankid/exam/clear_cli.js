var msg = {};
msg.in = {}
msg.in.bankid_cli = {
    "wbId": 189064,
    "person": {
        "inn": "3501414619"
    },
    "extends": {
        "socStatus": "1",
        "wrkPosition": "4",
        "wrkExperience": "64",
        "wrkCodObl": "53",
        "countOfKeeps": "4",
        "limitWanted": "40000",
        "nameLat": "BUBLYKOV VOLODYMYR",
        "photo25": "0",
        "photo45": "1",
        "typeCli": "клієнт з відкриттям рахунків",
        "flagPEPs": "0",
        "signDate": "08.04.2021",
        "verifyDate": "08.04.2021",
        "workInfo": "Головний фахувец",
        "codOblRee": "53",
        "education": "2",
        "greenCard": "1",
        "profitSrc": ",XX:інше",
        "profitWay": "14430",
        "birthPlace": "Україна",
        "reputation": "Задовільний",
        "uaResident": "1",
        "verifyType": "3",
        "ownFundsSrc": "9",
        "registryUSA": "0",
        "statusFATCA": "3",
        "verifyType1": "1",
        "birthCountry": "804",
        "forTaxStatus": "0",
        "monthAmouunt": "1",
        "usaChiisares": "0",
        "maritalStatus": "1",
        "movePropAvail": "1",
        "otherBankDepo": "0",
        "ugbRelatePers": "2",
        "costPaperAvail": "Відсутні",
        "countryCitizen": "804",
        "ownFundsAmount": "1",
        "statusBusiness": "5",
        "countryCitisien": "804",
        "otherBankCredit": "0",
        "planUseServices": "1,4,22",
        "realEstateAvail": "1",
        "flagTopLevelRisk": "0",
        "otherBankAccount": "3"
    },
    "timestamp": "1617880028473",
    "merchant_name": "bankid_easypay",
    "merchantName": "bank_main"
};


for(var o in msg.in.bankid_cli) {
    console.log(o, (typeof msg.in.bankid_cli[o]));
    if(typeof msg.in.bankid_cli[o] === 'object' ) {
        for (var p in msg.in.bankid_cli[o]){
        console.log('   ', p, (typeof p));
            if(p !== 'inn' && p !== 'socStatus') {
                console.log('   del    ', p, (typeof p));
                delete(msg.in.bankid_cli[o][p]);
            }
        }    
    }
}

console.log(msg.in.bankid_cli);

