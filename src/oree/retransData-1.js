msg.workDate = '2020-10-26T18:51:13Z';

var out = [];

for (var o of msg.payload) {

    var item = {
        "participant": {
            "bankAccountId": "1",
            "bankCode": "320478",
            "dic": "1",
            "ean": "1",
            "edrpou": o.edrpou,
            "eic": "0",
            "iban": o.iban,
            "ic": "1",
            "name": o.name,
            "particId": "1",
            "data": {
                "currency": o.currency,
                "type": "limit",
                "value": o.value
            }
        }
    };

    out.push(item);
}

msg.payload = out;
msg.data = out;

return msg;