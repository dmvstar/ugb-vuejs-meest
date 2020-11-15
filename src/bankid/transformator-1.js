const fs = require('fs');

var bankid_client = require('./bankid-cli-1.json');
var bankid_mapping = require('./bankid_mapping.json');
var bankid_dicts = require('./doc_types.json');

var bankid_transform = {};
var bankid_transform_sub = [
    {name: "Client", array: false},
    {name: "Individuals", array: true}, // array
    {name: "Identifications", array: true}, // array documents
    {name: "Addresses", array: true}, // array
    {name: "Communications", array: false},
    {name: "Properties", array: false},
    {name: "Scans", array: true}, // array
    {name: "Operations", array: false}
]

for (k of bankid_transform_sub) {
    bankid_transform[k.name] = [];
}
  

for (o of bankid_mapping) {
    //console.log(o);
    var item = {};

    if (o.bankid.block !== 'none' && o.bankid.code !== 'none') {
        console.log("["+o.bankid.block+"]["+o.bankid.code+"]="+bankid_client[o.bankid.block][o.bankid.code]);
        if (bankid_client[o.bankid.block][o.bankid.code] !== undefined) {
            item = {
                "webbank": {
                    "code": o.webbank.code,
                    "type": o.webbank.type,
                    "default": o.webbank.default
                },
                "bankid": {
                    "block": o.bankid.block,
                    "code": o.bankid.code,
                    "type": o.bankid.type
                },
                "value": bankid_client[o.bankid.block][o.bankid.code]
            };
            bankid_transform[o.webbank.block].push(item);
        }
    }
}

console.log(bankid_transform);