var data = {
    "socStatus": "1",
    "wrkPosition": "4",
    "wrkExperience": "64",
    "wrkCodObl": "53",
    "countofKeeps": "4",
    "limitWanted": "400000",
    "monthAmount": "120000",
    "workInfo": "Головний фахувец",
    "education": "2",
    "verifyDate": "22.06.2021",
    "signDate": "22.06.2021",
    "forTaxStatus": "0",
    "realEstateAvail": "1",
    "movePropAvail": "1",
    "otherBankAccount": "3",
    "otherBankCredit": "0",
    "otherBankDepo": "0",
    "costPaperAvail": "відсутні",
    "profitWay": "14300",
    "profitSrc": "1",
    "ownFundsSrc": "1",
    "typeCli": "Клієнт з відкриттям рахунку",
    "reputation": "Задовільний",
    "verifyType": "3",
    "countryCitizen": "804",
    "planUseServices": "1, 22, 4",
    "statusBusiness": "5",
    "ugbRelatePers": "0",
    "greenCard": "1",
    "usaChiisares": "0",
    "statusFATCA": "3",
    "registryUSA": "0"
};

for(o in data) {
    console.log(o);
    var item = '{"'+o+'": {\
        "example": "'+data[o]+'",\
        "type": "String",\
        "needed": false,\
        "express": "^$",\
        "name": ""\
    }}';
    var jitem = JSON.parse(item);
    console.log(jitem);
}