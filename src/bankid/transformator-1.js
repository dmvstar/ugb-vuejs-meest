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

for(o of bankid_mapping) {
    console.log(o);
}



