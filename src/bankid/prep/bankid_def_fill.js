var defaults = {
    "extends": {    
        "countryCitizen": "804",
        "maritalStatus": "1",
        "uaResident": "1",
        "codOblRee": "",
        "flagTopLevelRisk": "0",
        "workInfo": "Безробітний",
        "birthCountry": "804",
        "birthPlace": "Україна",
        "profitWay": "14430",
        "profitSrc": "16",
        "ownFundsAmount": "1",
        "ownFundsSrc": "9",
        "monthAmouunt": "1",
        "realEstateAvail": "1",
        "movePropAvail": "1",
        "otherBankAccount": "3",
        "otherBankCredit": "0",
        "otherBankDepo": "0",
        "costPaperAvail": "Відсутні",
        "planUseServices": "44652",
        "ugbRelatePers": "2",
        "flagPEPs": "0",
        "statusBusiness": "5",
        "usaChiisares": "0",
        "typeCli": "3",
        "photo25": "1",
        "photo45": "1",
        "verifyDate": "now",
        "signDate": "now",
        "education": "2",
        "forTaxStatus": "0",
        "verifyType": "3",
        "reputation": "Задовільний",
        "countryCitisien": "804",
        "greenCard": "1",
        "registryUSA": "0",
        "statusFATCA": "0"
        },
    "extends0": {
        "countryCitizen": "804",
        "profitWay": "14300",
        "profitSrc": "1",
        "ownFundsAmount": "1",
        "ownFundsSrc": "1",
        "monthAmouunt": "4",
        "realEstateAvail": "1",
        "movePropAvail": "2",
        "otherBankAccount": "1,2,3,4",
        "otherBankCredit": "1",
        "otherBankDepo": "1",
        "costPaperAvail": "Відсутні",
        "planUseServices": "1,2,3",
        "ugbRelatePers": "2",
        "publicPersonExists": "0",
        "statusBusiness": "5",
        "usaChiisares": "0",
        "verifyType": "3",
        "typeCli": "клієнт з відкриттям рахунків",
        "forTaxStatus": "0",
        "reputation": "добре",
        "countryCitisien": "804",
        "greenCard": "1",
        "registryUSA": "0",
        "statusFATCA": "3"
    }
};

var client   = {
    "person": {
        "type": "physical",
        "lastName": "Кетцалькоатль",
        "firstName": "Кукумац",
        "middleName": "Кукулькан",
        "inn": "{{inn}}",
        "birthDay": "28.08.1991",
        "sex": "M",
        "phone": "380631003256",
        "email": "sava@mail.dot.com",
        "web": "www.www.net",
        "uaResident": "1",
        "flagPersonTerror": "1",
        "edication": "Бог"
    },

    "extends": {
        "country_citizen": "804",
        "marital_status": "6",
        "work_info": "безроботный",
        "birth_country": "804",
        "birth_place": "Бердичув",
        "profit_way": "2"
    },

    "addresses": [{
            "type": "factual",
            "country": "UA",
            "state": "Київська",
            "area": "Київ",
            "city": "м. Київ",
            "street": "вул. Бородинского побоища",
            "houseNo": "21",
            "flatNo": "16"
        },
        {
            "type": "juridical",
            "country": "UA",
            "state": "Київська",
            "area": "Київ",
            "city": "м. Чичен-Ица",
            "street": "вул. пирамида Кукулькана.",
            "houseNo": "1",
            "flatNo": "1"
        }
    ],
    "documents": [{
            "type": "passport",
            "typeName": "Паспорт",
            "series": "СН",
            "number": "432311",
            "issue": "Святошинське РУ ГУ МВС у м.Києві",
            "dateIssue": "01.10.1997",
            "dateExpiration": "",
            "issueCountryIso2": "UA"
        },
        {
            "type": "idpassport",
            "typeName": "Паспорт картка",
            "series": "",
            "number": "3425654326",
            "issue": "1456",
            "dateIssue": "01.10.2020",
            "dateExpiration": "01.10.2040",
            "issueCountryIso2": "UA"
        }
    ],
    "scans": [{
            "type": "passport",
            "scanFile": "BASE64",
            "dateCreate": "dd.mm.yyyy",
            "extension": "jpg"

        },
        {
            "type": "photo",
            "scanFile": "{{{in.docs.pass}}}",
            "dateCreate": "dd.mm.yyyy",
            "extension": "jpg"

        }
    ]
};

function trans_date_to(date) {
    var ret = date;
    // from DD.MM.YYYY
    // to 1982-05-03T00:00:00
    if (date.length > 0) {
        var parts = date.split('.');
        ret = parts[2] + '-' + parts[1] + '-' + parts[0] + 'T00:00:00';
    }
    return ret;
}
function trans_date_fr(date) {
    var ret = date;
    // from 1982-05-03T00:00:00
    // to DD.MM.YYYY
    if (date.length > 0) {
        var parts = date.split('-');
        ret = parts[2].substring(0,2) + '.' + parts[1] + '.' + parts[0];
    }
    return ret;
}
function trans_date_date(date) {
    var ret = date;
    // from 2021-01-25T12:56:12.495Z 1982-05-03T00:00:00
    // to 2021-01-25T00:00:00
    if (date.length > 0) {
        var parts = date.split('T');
        ret = parts[0] + 'T00:00:00';
    }
    return ret;
}

console.log(client.extends);
for (d in defaults.extends) {
    if(client.extends[d] === undefined)
        if(defaults.extends[d] === "now")
            client.extends[d] = trans_date_fr(new Date().toISOString());
        else
            client.extends[d] = defaults.extends[d];
}
console.log(client.extends);



