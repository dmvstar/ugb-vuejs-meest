// Прямое преобразование из структуры типа BankId в WebBank XML 
// RUN 
// export NODE_PATH="$(npm root -g)"
// node retransformer.js  totransformer.js

var MODE_WORK_LOCAL = true;
if (typeof msg != "undefined") MODE_WORK_LOCAL = false;
var MODE_DEBUG  = true;
var MODE_TEST = true;

var bankid_client;// = require('./bankid-cli-1.json');
// @TODO - добавить ClientNames TNames + Тип клієнта* + Дата верифікації клієнта + Спосіб верифікації клієнта
var bankid_mapping;// = require('./bankid_mapping.json');
var bankid_dicts;// = require('./dicts_mapping.json');
var client_xml_data;// = require('./client_xml_data.json');
var client_xml_template;// = require('./client_xml_template.json');
var bankid_transform_web;// = require('./bankid_transform_web.json');
var bankid_transform_bid;// = require('./bankid_transform_bid.json');

var bankid_transform_out = {};

// FUNCTIONS -----------------------------------------------
function get_reftrans(refmaps, idrefcode, idvalue) {
    var ret = idvalue;
    for (o of refmaps[idrefcode]) {
        //console.log(' get_reftrans'+ JSON.stringify(o));
        if (o.bankidcode === idvalue) {
            ret = o.webbankid;
            break;
        }
    }
    return ret;
}

function trans_date(date) {
    var ret = date;
    // from DD.MM.YYYY
    // to 1982-05-03T00:00:00
    if (date.length > 0) {
        var parts = date.split('.');
        ret = parts[2] + '-' + parts[1] + '-' + parts[0] + 'T00:00:00';
    }
    return ret;
}

function getIPNKey(data) {
    var aMulti = [-1, 5, 7, 9, 4, 6, 10, 5, 7, 0];
    var key = data.length;
    if (data.length == 10) {
        var sum = 0;
        for (var i = 0; i < aMulti.length; i++) {
            var o = data[i] * aMulti[i];
            sum += o;
        }
    }
    var msum = sum - (Math.trunc(sum / 11) * 11);
    return msum < 10 ? msum : 0;
}

function excelDateToJSDate(serialDate) {
    var e0date = new Date(0); // epoch "zero" date
    var offset = e0date.getTimezoneOffset(); // tz offset in min
    var dateOut = new Date(Math.round((serialDate - 25568) * 86400 * 1000));
    return dateOut.toJSON();
}

function generateIPN() {

    var requestAmo;
    var requestSex;
    var requestDat;
    var requestKey;

    requestDat = Math.floor(Math.random() * 20000) + 20000;
    requestAmo = Math.floor(Math.random() * 100) + 100;
    requestSex = Math.floor(Math.random() * 10 - 1) + 1;
    requestKey = Math.floor(Math.random() * 10 - 1) + 1;
    var dataPre = '' + requestDat + requestAmo + requestSex + requestKey;
    var dataOk = dataPre.substr(0, 9) + getIPNKey(dataPre);
    return dataOk;
}

function load_file( name ) {
    if (MODE_WORK_LOCAL !== true) return;
    const fs = require('fs');
    return fs.readFileSync(name, {
        encoding: 'utf8',
        flag: 'r'
    });    
}

function load_xml_templates_files() {
    if (MODE_WORK_LOCAL !== true) return;
    const fs = require('fs');

    client_xml_data.top = load_file(client_xml_template.top.name);

    client_xml_data.client_top = load_file(client_xml_template.client_top.name);
    client_xml_data.client_man = load_file(client_xml_template.client_man.name);
    client_xml_data.client_bot = load_file(client_xml_template.client_bot.name);

    client_xml_data.names_top = load_file(client_xml_template.names_top.name);
    client_xml_data.names_man = load_file(client_xml_template.names_man.name);
    client_xml_data.names_bot = load_file(client_xml_template.names_bot.name);

    client_xml_data.indiv_top = load_file(client_xml_template.indiv_top.name);
    client_xml_data.indiv_man = load_file(client_xml_template.indiv_man.name);
    client_xml_data.indiv_bot = load_file(client_xml_template.indiv_bot.name);
    client_xml_data.props_top = load_file(client_xml_template.props_top.name);
    client_xml_data.props_man = load_file(client_xml_template.props_man.name);
    client_xml_data.props_bot = load_file(client_xml_template.props_bot.name);
    client_xml_data.ident_top = load_file(client_xml_template.ident_top.name);
    client_xml_data.ident_man = load_file(client_xml_template.ident_man.name);
    client_xml_data.ident_bot = load_file(client_xml_template.ident_bot.name);
    client_xml_data.addre_top = load_file(client_xml_template.addre_top.name);
    client_xml_data.addre_man = load_file(client_xml_template.addre_man.name);
    client_xml_data.addre_bot = load_file(client_xml_template.addre_bot.name);
    client_xml_data.commu_top = load_file(client_xml_template.commu_top.name);
    client_xml_data.commu_man = load_file(client_xml_template.commu_man.name);
    client_xml_data.commu_bot = load_file(client_xml_template.commu_bot.name);
    client_xml_data.bot = load_file(client_xml_template.bot.name);

    return;
}

function create_out_xml() {
    if (MODE_WORK_LOCAL !== true) return;

    var mustache = require("mustache");
    var view = {
        title: "Joe",
        calc: function () {
            return 2 + 4;
        }
    };
    var output = mustache.render("{{title}} spends {{calc}}", view);
    console.log(output);

    const fs = require('fs');
    fs.writeFileSync("client-create-bankid-3.json", JSON.stringify(fill_data, null, 2));
    // XML CREATE ----------------------------------------------
    output = client_xml_data.top;
    // client
    output += client_xml_data.client_top;
    output += mustache.render(client_xml_data.client_man, fill_data.client);
    output += client_xml_data.client_bot;

    // individuals
    output += client_xml_data.indiv_top;
    output += mustache.render(client_xml_data.indiv_man, fill_data.indiv);
    output += client_xml_data.indiv_bot;

    // name Lat
    /*
    output += client_xml_data.names_top;
    output += mustache.render(client_xml_data.names_man, fill_data.names);
    output += client_xml_data.names_bot;
    */

    // documents
    output += client_xml_data.ident_top;
    for (prop of fill_data.ident) {
        output += mustache.render(client_xml_data.ident_man, prop);
    }
    output += client_xml_data.ident_bot;
    // addresses
    output += client_xml_data.addre_top;
    for (prop of fill_data.addr) {
        output += mustache.render(client_xml_data.addre_man, prop);
    }
    output += client_xml_data.addre_bot;
    // comm
    output += client_xml_data.commu_top;
    console.log(fill_data.comm);
    for (prop of fill_data.comm) {
        output += mustache.render(client_xml_data.commu_man, prop); //fill_data.comm);
    }
    output += client_xml_data.commu_bot;
    // props
    output += client_xml_data.props_top;
    for (prop of fill_data.props) {
        output += mustache.render(client_xml_data.props_man, prop);
    }
    output += client_xml_data.props_bot;
    output += client_xml_data.bot;
    //console.log(output);
    fs.writeFileSync("client-create-bankid-3.xml", output);
    // XML CREATE END-------------------------------------------
}

function load_requeries_files(){
    if (MODE_WORK_LOCAL !== true) return;
    bankid_client = require('./bankid-cli-1.json');
    // @TODO - добавить ClientNames TNames
    bankid_mapping = require('./bankid_mapping.json');
//console.log(bankid_mapping);
    bankid_dicts = require('./dicts_mapping.json');
    client_xml_data = require('./client_xml_data.json');
    client_xml_template = require('./client_xml_template.json');
    bankid_transform_web = require('./bankid_transform_web.json');
    bankid_transform_bid = require('./bankid_transform_bid.json');
}

function load_transform_files(){
    if (MODE_WORK_LOCAL === true) return;
    bankid_client = msg.in.bankid_cli;
    bankid_mapping = msg.transform.bankid_mapping;
    bankid_dicts = msg.transform.dicts_mapping;
    bankid_transform_web = msg.transform.bankid_transform_web;
    bankid_transform_bid = msg.transform.bankid_transform_bid;
}
function create_out_nr(){
    if (MODE_WORK_LOCAL === true) return;
    msg.out.trans_data = fill_data;
}
function clog(msg){
    if (MODE_DEBUG === true) 
        console.log(msg);
}
// FUNCTIONS END -------------------------------------------

// MAIN INIT -----------------------------------------------
console.log("MAIN INIT");
load_requeries_files();
load_transform_files();
load_xml_templates_files();

if (MODE_TEST === true)
    bankid_client.person.inn = generateIPN();
console.log(bankid_client);

// MAIN INIT END -------------------------------------------
// MAIN TRANSFORMATOR --------------------------------------
// Prepare out data
for (k of bankid_transform_web) {
    bankid_transform_out[k.name] = [];
}
//console.log("bankid_mapping");
//console.log(bankid_mapping);

for (bim of bankid_mapping) {
    if (bim.bankid.block !== 'none') {
        var web = bankid_transform_web.find(x => x.name === bim.webbank.block);
        if(web !== undefined) {
            web.mapping.push(bim);
            var bid = bankid_transform_bid.find(x => x.name === bim.bankid.block);
            bid.mapping.push(bim);
clog(' ---- Fill '+bim.webbank.block+'<>'+bim.bankid.block+'<>'+bim.bankid.code);
        }
    }    
}

/*
clog('bankid_transform_web ---------------------------');
clog(bankid_transform_web);
clog('bankid_transform_web ---------------------------');    
*/

clog('bankid_transform_bid ---------------------------');    
clog(JSON.stringify(bankid_transform_bid, null,2));
clog('bankid_transform_bid ---------------------------');                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               


// Parsing input data
for (key in bankid_client) {

    var webbank_block = bankid_transform_bid.find(x => x.name === key).mapping[0].webbank.block;
    //console.log("1 bankid_client[key]");
    //console.log(JSON.stringify(bankid_client[key]));
    //console.log("2 bankid_client[key]");
    var citem = bankid_client[key]
    //if (citem instanceof Array) { // do not wort in nodered
    if (Array.isArray(citem)) { 
        
        clog("[" + key + "][" + webbank_block + "] Array ");
        //console.log(bankid_transform_out[webbank_block]);

        var cnt = 0;
        var amapi = [];
        //console.log(" ++++++++++++["+webbank_block+"]["+key+"] ");    
        var mapr = bankid_transform_bid.find(x => x.name === key).mapping;

        for (a of bankid_client[key]) {
            var mapi = JSON.parse(JSON.stringify((mapr)));
            for (o in a) {
                //clog("  [" + cnt + "][" + key + "] " + o + "=" + a[o]);
                clog("  [" + cnt + "][" + key + "] " + o + "=" + a[o]);
                var val = mapi.find(x => x.bankid.code === o);
                if (val !== undefined) {
                    val.value = a[o];
                }
            }
            amapi.push(mapi);
            cnt++;
        }
        bankid_transform_out[webbank_block] = amapi;
    } else {
        clog("[" + key + "] Object");
        for (o in bankid_client[key]) {
            // key ~ extends,  o ~ nameLat
            var mapi = bankid_transform_bid.find(x => x.name === key).mapping;

            var amapi = mapi.filter(it => it.bankid.code === o); 
clog("  ----[" + key + "][" + o + "] val=" + amapi.length);
            if( amapi !== undefined) {
                for(mapa of amapi) {
clog("    ----[" + key + "][" + o + "] val=" + JSON.stringify(mapa));  
                    mapa.value = bankid_client[key][o];

                    bankid_transform_out[mapa.webbank.block].push(mapa);
                    // Ищем в знчения по умодчанию в для val.webbank.block
                    var mapw = bankid_transform_web.find(x => x.name === mapa.webbank.block).mapping;
                    for (d of mapw) {
                        if (d.bankid.code === o && d.webbank.default !== '') {
                            var vald = JSON.parse(JSON.stringify(mapa));
                            vald.value = d.webbank.default;
                            vald.webbank.code = d.webbank.code;
                            bankid_transform_out[mapa.webbank.block].push(vald);
                        }
                    }
                }
            }
            /* -------
            var val = mapi.find(x => x.bankid.code === o);
//clog("  +++-[" + key + "][" + o + "] val=" + JSON.stringify(val));
            if (val !== undefined) {
                val.value = bankid_client[key][o];
//clog("  ++++[" + key + "][" + o + "]=" + val.value + "-" + val.webbank.block);
                //console.log(" 00 key=" + key + " o=" + o + " val=" + JSON.stringify(val));
                //console.log(val);
                bankid_transform_out[val.webbank.block].push(val);
                // Ищем в знчения по умодчанию в для val.webbank.block
                var mapw = bankid_transform_web.find(x => x.name === val.webbank.block).mapping;
                for (d of mapw) {
                    if (d.bankid.code === o && d.webbank.default !== '') {
                        var vald = JSON.parse(JSON.stringify(val));
                        vald.value = d.webbank.default;
                        vald.webbank.code = d.webbank.code;
                        bankid_transform_out[val.webbank.block].push(vald);
                    }
                }
            }
            */
        }
    }
}

// Calculate field from bankid
var calcm = bankid_transform_bid.find(x => x.name === 'calculate').mapping;

for (item of calcm) {
    console.log(item); // x.name === a.source !!!! persons
    var bankid_src = bankid_transform_bid.find(x => x.name === 'person').mapping;
    console.log("-------------------------------------------- calcm bankid_src ");
    console.log(bankid_src);

    var fields = item.bankid.code.split('+');
    var calculate = "";
    for (f of fields) {
        var n = bankid_src.find(x => x.bankid.block === 'person' && x.bankid.code === f)
        //console.log("  bankid_fld "+f+" "+n.value + JSON.stringify(n));
        calculate += n.value + " ";
        calculate = calculate;
    }
    item.value = calculate.trimRight();
    var wkey = item.webbank.block;
    var wfld = item.webbank.code;

    var wblock = bankid_transform_out[wkey];
    wblock.push(item);
    wblock = bankid_transform_out[wkey];
}

clog("--------------------- bankid_transform_out ");
var fill_data = {};
// Клиент
fill_data.client = {};
clog('--------------------- bankid_transform_out.Client ');
clog(bankid_transform_out.Client);
for (item of bankid_transform_out.Client) {
    if (item.bankid.maps !== undefined && item.bankid.maps !== "") {
        console.log(item.bankid.maps);
        fill_data.client[item.webbank.code] =
            get_reftrans(bankid_dicts, item.bankid.maps, item.value);
    } else
        fill_data.client[item.webbank.code] = item.value;
    if (item.bankid.type === 'date')
        fill_data.client[item.webbank.code] = trans_date(item.value);
}
// Персональные данные
fill_data.indiv = {};
for (item of bankid_transform_out.Individuals) {
    var value = item.value;
    console.log(item);
    if (item.bankid.maps !== undefined && item.bankid.maps !== '')
        value = get_reftrans(bankid_dicts, item.bankid.maps, item.value);
    if (item.bankid.type === 'date')
        value = trans_date(value);
    //console.log('   indiv value = '+value);
    fill_data.indiv[item.webbank.code] = value;
}
clog('--------------------- bankid_transform_out.ClientNames ');
clog(bankid_transform_out.ClientNames);
fill_data.names = {};
for (item of bankid_transform_out.ClientNames) {
    var value = item.value;
    console.log(item);
    fill_data.names[item.webbank.code] = value;
    fill_data.names["Lang"] = "LAT";
}
clog('--------------------- bankid_transform_out.ClientNames ');
var i = 0;
// Документы
fill_data.ident = [];

console.log('------------ bankid_transform_out.Identifications');
console.log(bankid_transform_out.Identifications);
console.log('------------ bankid_transform_out.Identifications');

for (item of bankid_transform_out.Identifications) {
    fill_data.ident[i] = {};
    for (o of item) {
        var code = o.webbank.code;
        var value = o.value;
        if (o.bankid.type === 'date')
            value = trans_date(value);
        if (o.bankid.maps !== undefined && o.bankid.maps.length > 0) {
            value = get_reftrans(bankid_dicts, o.bankid.maps, value);
        }
        fill_data.ident[i][code] = value;
        if (fill_data.ident[i]['ExpirationDate'] === '') {
            fill_data.ident[i]['ExpirationDate'] = '2099-01-01T00:00:00';
        };
    }
    i++;
}
// Адреса
console.log(bankid_transform_out.Addresses);
i = 0;
fill_data.addr = [];
for (item of bankid_transform_out.Addresses) {
    fill_data.addr[i] = {};
    for (o of item) {
        var code = o.webbank.code;
        var value = o.value;
        if (o.bankid.type === 'date')
            value = trans_date(value);
        if (o.bankid.maps !== undefined && o.bankid.maps.length > 0) {
            value = get_reftrans(bankid_dicts, o.bankid.maps, value);
        }
        fill_data.addr[i][code] = value;
    }
    i++;
}
// явки пароли телефоны
i = 0;
fill_data.comm = [];
var comm_codes = [];
for (item of bankid_transform_out.Communications) {
    console.log(item);
    if (comm_codes.indexOf(item.bankid.code) < 0)
        comm_codes.push(item.bankid.code);
}
console.log(comm_codes);
for (c of comm_codes) {
    fill_data.comm[i] = {};
    console.log(c);
    for (item of bankid_transform_out.Communications) {
        var code = item.webbank.code;
        if (item.bankid.code === c) {
            console.log('[' + c + '][' + code + '][' + item.value + ']');
            fill_data.comm[i][code] = item.value;
        }
    }
    i++;
}
// Реквизиты
fill_data.props = [];
i = 0;
for (item of bankid_transform_out.Properties) {
    if (item.webbank.code !== '') {
        fill_data.props[i] = {};
        fill_data.props[i].Refs  = item.bankid.maps;
        fill_data.props[i].Code  = item.webbank.code;
        fill_data.props[i].Dict  = item.webbank.dict;
        fill_data.props[i].Value = item.value;

        if (item.bankid.maps !== undefined && item.bankid.maps.length > 0) {
            fill_data.props[i].Value =
                get_reftrans(bankid_dicts, item.bankid.maps, item.value);
        }
        if (item.bankid.type === 'date')
            fill_data.props[i].Value = trans_date(item.value);
        i++;
    }
}
// MAIN TRANSFORMATOR END-----------------------------------

console.log("fill_data --------------------------------------------");
console.log(fill_data);
console.log("fill_data --------------------------------------------");

create_out_xml();
create_out_nr();
if (MODE_WORK_LOCAL !== true) return msg;
