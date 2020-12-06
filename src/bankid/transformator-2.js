const fs = require('fs');

var bankid_client = require('./bankid-cli-1.json');
var bankid_mapping = require('./bankid_mapping.json');
var bankid_dicts = require('./dicts_mapping.json');

var client_xml_names = require('./client_xml_names.json');
var client_xml_data = require('./client_xml_data.json');

var bankid_transform_web = require('./bankid_transform_web.json');
var bankid_transform_bid = require('./bankid_transform_bid.json');
var bankid_transform_out = {};

// FUNCTIONS -----------------------------------------------
function get_reftrans(refmaps, idrefcode, idvalue) {
    var ret = idvalue;

    for (o of refmaps[idrefcode]) {
        //console.log(' get_reftrans'+ JSON.stringify(o));
        if (o.ibancode === idvalue) {
            ret = o.wbid;
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

function load_xml_templates_files() {
    client_xml_data.top = fs.readFileSync(client_xml_names.top, {
        encoding: 'utf8',
        flag: 'r'
    });
    
    client_xml_data.client_top = fs.readFileSync(client_xml_names.client_top, {
        encoding: 'utf8',
        flag: 'r'
    });
    client_xml_data.client_man = fs.readFileSync(client_xml_names.client_man, {
        encoding: 'utf8',
        flag: 'r'
    });
    client_xml_data.client_bot = fs.readFileSync(client_xml_names.client_bot, {
        encoding: 'utf8',
        flag: 'r'
    });
    
    client_xml_data.indiv_top = fs.readFileSync(client_xml_names.indiv_top, {
        encoding: 'utf8',
        flag: 'r'
    });
    client_xml_data.indiv_man = fs.readFileSync(client_xml_names.indiv_man, {
        encoding: 'utf8',
        flag: 'r'
    });
    client_xml_data.indiv_bot = fs.readFileSync(client_xml_names.indiv_bot, {
        encoding: 'utf8',
        flag: 'r'
    });
    
    client_xml_data.props_top = fs.readFileSync(client_xml_names.props_top, {
        encoding: 'utf8',
        flag: 'r'
    });
    client_xml_data.props_man = fs.readFileSync(client_xml_names.props_man, {
        encoding: 'utf8',
        flag: 'r'
    });
    client_xml_data.props_bot = fs.readFileSync(client_xml_names.props_bot, {
        encoding: 'utf8',
        flag: 'r'
    });
    
    client_xml_data.ident_top = fs.readFileSync(client_xml_names.ident_top, {
        encoding: 'utf8',
        flag: 'r'
    });
    client_xml_data.ident_man = fs.readFileSync(client_xml_names.ident_man, {
        encoding: 'utf8',
        flag: 'r'
    });
    client_xml_data.ident_bot = fs.readFileSync(client_xml_names.ident_bot, {
        encoding: 'utf8',
        flag: 'r'
    });
    
    client_xml_data.addre_top = fs.readFileSync(client_xml_names.addre_top, {
        encoding: 'utf8',
        flag: 'r'
    });
    client_xml_data.addre_man = fs.readFileSync(client_xml_names.addre_man, {
        encoding: 'utf8',
        flag: 'r'
    });
    client_xml_data.addre_bot = fs.readFileSync(client_xml_names.addre_bot, {
        encoding: 'utf8',
        flag: 'r'
    });
    
    client_xml_data.commu_top = fs.readFileSync(client_xml_names.commu_top, {
        encoding: 'utf8',
        flag: 'r'
    });
    client_xml_data.commu_man = fs.readFileSync(client_xml_names.commu_man, {
        encoding: 'utf8',
        flag: 'r'
    });
    client_xml_data.commu_bot = fs.readFileSync(client_xml_names.commu_bot, {
        encoding: 'utf8',
        flag: 'r'
    });
    
    client_xml_data.bot = fs.readFileSync(client_xml_names.bot, {
        encoding: 'utf8',
        flag: 'r'
    });
        return;
    }
    
function load_xml_templates_nodes(){

    return;
}
// FUNCTIONS END -------------------------------------------
MODE_WORK_LOCAL = true;

if(MODE_WORK_LOCAL === true)
    load_xml_templates_files();
else
    load_xml_templates_nodes();

bankid_client.person.inn = generateIPN();

console.log(bankid_client);

// Prepare out data
for (k of bankid_transform_web) {
    bankid_transform_out[k.name] = [];
}

for (o of bankid_mapping) {
    //console.log(o);
    if (o.bankid.block !== 'none') {
        var f = bankid_transform_web.find(x => x.name === o.webbank.block);
        f.mapping.push(o);
        var i = bankid_transform_bid.find(x => x.name === o.bankid.block);
        i.mapping.push(o);
    }
}

//console.log(bankid_transform_bid);
console.log(bankid_transform_web);
//console.log(bankid_transform_out);

// Parce input data
for (key in bankid_client) {

    var webbank_block = bankid_transform_bid.find(x => x.name === key).mapping[0].webbank.block;

    if (bankid_client[key] instanceof Array) {
        console.log("[" + key + "][" + webbank_block + "] Array ");
        //console.log(bankid_transform_out[webbank_block]);

        var cnt = 0;
        var amapi = [];
        //console.log(" ++++++++++++["+webbank_block+"]["+key+"] ");    
        var mapr = bankid_transform_bid.find(x => x.name === key).mapping;

        for (a of bankid_client[key]) {
            var mapi = JSON.parse(JSON.stringify((mapr)));
            //var mapi = mapr.slice(0);
            // console.log("mapi++++++++++++++++++++");
            // console.log(mapi);
            // console.log("mapi++++++++++++++++++++");
            //bankid_transform_out.push(val);
            for (o in a) {
                console.log("  [" + cnt + "][" + key + "] " + o + "=" + a[o]);
                var val = mapi.find(x => x.bankid.code === o);
                if (val !== undefined) {
                    val.value = a[o];
                    //console.log(" 00 key=" + key + " o=" + o + " val=" + JSON.stringify(val));
                    //console.log(val);
                }
            }
            // console.log("mapi--------------------");
            // console.log(mapi);
            // console.log("mapi--------------------");
            amapi.push(mapi);

            cnt++;
        }
        //console.log(amapi);
        //console.log(amapi.length);
        bankid_transform_out[webbank_block] = amapi;
    } else {
        console.log("[" + key + "] Object");
        for (o in bankid_client[key]) {
            var mapi = bankid_transform_bid.find(x => x.name === key).mapping;
            var val = mapi.find(x => x.bankid.code === o);
            console.log(" [" + key + "][" + o + "]"); // val=" + JSON.stringify(val));
            if (val !== undefined) {
                val.value = bankid_client[key][o];
                console.log("  ++++[" + key + "][" + o + "]=" + val.value + "-" + val.webbank.block);
                //console.log(" 00 key=" + key + " o=" + o + " val=" + JSON.stringify(val));
                //console.log(val);
                bankid_transform_out[val.webbank.block].push(val);
                // Ищем в знчения по умодчанию в для val.webbank.block
                var mapw = bankid_transform_web.find(x => x.name === val.webbank.block).mapping;
                //console.log("   ++++["+val.webbank.block+"] "+mapw);
                for( d of mapw){
                    //if( val.webbank.block === 'Communications') {
                    if( d.bankid.code === o && d.webbank.default !== '') {
                        var vald = JSON.parse(JSON.stringify(val));
                        vald.value = d.webbank.default;
                        vald.webbank.code = d.webbank.code;
                        console.log("       ++++["+val.webbank.block+"] "+JSON.stringify(d));
                        console.log("       ++++["+val.webbank.block+"] "+JSON.stringify(val));
                        console.log("       ++++["+val.webbank.block+"] "+JSON.stringify(vald));
                        bankid_transform_out[val.webbank.block].push(vald);
                    }
                }
            }
        }
    }
}

// Calculate field from bankid
var calcm = bankid_transform_bid.find(x => x.name === 'calculate').mapping;

for (item of calcm) {
    console.log(item); // x.name === a.source !!!! persons
    var bankid_src = bankid_transform_bid.find(x => x.name === 'person').mapping;
    console.log("bankid_src --------------------------------------------");
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

    var wblock = bankid_transform_out[wkey]; //.find(x => x.webbank.block === wkey && x.webbank.code === wfld)
    wblock.push(item);
    wblock = bankid_transform_out[wkey];
    /*
    console.log("bankid_transform_out [" + wkey + "][" + wfld + "] ");
    console.log(wblock);
    console.log("bankid_transform_out --------------------------------------------");
    */
}

console.log("bankid_transform_out --------------------------------------------");
var fill_data = {};
// Клиент
fill_data.client = {};
for (item of bankid_transform_out.Client) {
    //console.log('!!!!!!!-----------'+JSON.stringify(item.bankid)); 
    if (item.bankid.maps !== undefined && item.bankid.maps !== "") {
        //console.log('!!!!!!!-----------'+item.bankid.maps);      
        console.log(item.bankid.maps);
        fill_data.client[item.webbank.code] =
            get_reftrans(bankid_dicts, item.bankid.maps, item.value);
    } else
        fill_data.client[item.webbank.code] = item.value;
}
// Персональные данные
fill_data.indiv = {};
for (item of bankid_transform_out.Individuals) {
    var value = item.value;
    //console.log('-----------Individuals IN '+value);
    console.log(item);
    if (item.bankid.maps !== undefined && item.bankid.maps !== '')
        value = get_reftrans(bankid_dicts, item.bankid.maps, item.value);
    if (item.bankid.type === 'date')
        value = trans_date(value);
    console.log('-----------Individuals OUT '+value);
    fill_data.indiv[item.webbank.code] = value; //item.value;
}

var i = 0;
// Документы
fill_data.ident = [];
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
//console.log(' +++++++++++++++++++++++++++ '+bankid_transform_out.Addresses.length)
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
console.log('--------------------------------- Communications');
for (item of bankid_transform_out.Communications) {
    console.log(item);
    console.log('--------------------------------- Communications');
    if(comm_codes.indexOf(item.bankid.code) < 0)
        comm_codes.push(item.bankid.code);
}
console.log(comm_codes);
for(c of comm_codes) {
    fill_data.comm[i] = {};
    console.log(c);
    for(item of bankid_transform_out.Communications) {
        var code = item.webbank.code;
        if(item.bankid.code === c) {
            console.log('['+c+']['+code+']['+item.value+']');
            fill_data.comm[i][code] = item.value;    
        }  
    }  
    i++;    
}
console.log('--------------------------------- Communications');

// Реквизиты
fill_data.props = [];
i = 0;
for (item of bankid_transform_out.Properties) {
    if (item.webbank.code !== '') {
        fill_data.props[i] = {};
        fill_data.props[i].Refs = item.bankid.maps;
        fill_data.props[i].Code = item.webbank.code;
        fill_data.props[i].Dict = item.webbank.dict;
        fill_data.props[i].Value = item.value;

        if (item.bankid.maps !== undefined && item.bankid.maps.length > 0) {
            fill_data.props[i].Value =
                get_reftrans(bankid_dicts, item.bankid.maps, item.value);
        }

        i++;
    }
}


console.log("fill_data --------------------------------------------");

console.log(fill_data);

console.log("fill_data --------------------------------------------");

var mustache = require("mustache");

var view = {
    title: "Joe",
    calc: function () {
        return 2 + 4;
    }
};

var output = mustache.render("{{title}} spends {{calc}}", view);
console.log(output);

// MAIN TRANSFORMATOR --------------------------------------
output = client_xml_data.top;
output += client_xml_data.client_top;
output += mustache.render(client_xml_data.client_man, fill_data.client);
output += client_xml_data.client_bot;
output += client_xml_data.indiv_top;
output += mustache.render(client_xml_data.indiv_man, fill_data.indiv);
output += client_xml_data.indiv_bot;
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
for (prop of fill_data.comm) 
{
    output += mustache.render(client_xml_data.commu_man, prop);//fill_data.comm);
}
output += client_xml_data.commu_bot;

// props
output += client_xml_data.props_top;
for (prop of fill_data.props) {
    output += mustache.render(client_xml_data.props_man, prop);
}
output += client_xml_data.props_bot;

output += client_xml_data.bot;

console.log(output);

fs.writeFileSync("client-create-bankid-3.xml", output);

// MAIN TRANSFORMATOR END-----------------------------------

