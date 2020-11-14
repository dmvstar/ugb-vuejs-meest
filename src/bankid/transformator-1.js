const fs = require('fs');

var bankid_client = require('./bankid-cli-1.json'); 
var bankid_mapping = require('./bankid_mapping.json'); 
var bankid_dicts = require('./doc_types.json'); 

var bankid_transform = {}; 
/*
{
    Client
    Individual
    Identifications
    Addresses
    Communications
    Properties
    Scans
    Operations
}
*/
//console.log(bankid_mapping);
bankid_transform.Client = [];
bankid_transform.Individual = [];
bankid_transform.Identifications = [];
bankid_transform.Addresses = [];
bankid_transform.Communications = [];
bankid_transform.Properties = [];
bankid_transform.Scans = [];
bankid_transform.Operations = [];
for(o of bankid_mapping) {
    console.log(o);
    var item = {};
    switch(o.webbank.block) {
        case "Client": {
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
            bankid_transform.Client.push(item);
        } 
        break;
        case "Individual": {

        } 
        break;
        case "Identifications": {

        } 
        break;
        case "Addresses": {

        } 
        break;
        case "Communications": {

        } 
        break;
        case "Properties": {

        } 
        break;
        case "Scans": {

        } 
        break;
        case "Operations": {

        } 
        break;
    }
    

}

console.log(bankid_transform);



