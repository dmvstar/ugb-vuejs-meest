// @where defaultsInvalid.js

var defaults = msg.in.defaults;
var client   = msg.in.bankid_cli;
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
    // from 2021-01-25T12:56:12.495Z 
    // to 2021-01-25T00:00:00
    if (date.length > 0) {
        var parts = date.split('T');
        ret = parts[0] + 'T00:00:00';
    }
    return ret;
}

for (var d in defaults.extends) {
    if(client.extends[d] === undefined)
        if(defaults.extends[d] === "now")
            client.extends[d] = trans_date_fr(new Date().toISOString());
        else
            client.extends[d] = defaults.extends[d];
}

for (var p in defaults.person) {
    if(client.person[p] === undefined || 
    client.person[p] === null || 
    client.person[p] === "null" || 
    client.person[p] === "")
        client.person[p] = defaults.person[p];
}

// Костіли
if(client.person.sex === 'М') client.person.sex = 'M';
if(client.person.sex === 'Ж') client.person.sex = 'F';
if(client.person.sex === 'Ч') client.person.sex = 'M';

if(client.addresses.length >0){
    for(var a of client.addresses){    
        if(a.state !== undefined)
            a.state = a.state.replace(/i/g,'і');
        if(a.street !== undefined)
            a.street = a.street.replace(/i/g,'і');
        if(a.country === "Ук")
            a.country = "UA";
    }    
}

if(client.documents.length >0){
    for(var dd of client.documents) {   
        if(dd.issueCountryIso2 === "Ук")
            dd.issueCountryIso2 = "UA";
        if(dd.type === "паспорт")
            dd.type = "passport";
    }   
}   

msg.payload = client;
return msg;