const fs = require('fs');

var bankid_client = require('./bankid-cli-1.json');
var bankid_mapping = require('./bankid_mapping.json');
var bankid_dicts = require('./dicts_mapping.json');

var bankid_transform_out = {};
var bankid_transform_web = [{
    name: "Client",
    isarray: false,
    mapping: []
},
{
    name: "Individuals",
    isarray: false,
    mapping: []
}, // array
{
    name: "Identifications",
    isarray: true,
    mapping: []
}, // array documents
{
    name: "Addresses",
    isarray: true,
    mapping: []
}, // array
{
    name: "Communications",
    isarray: false,
    mapping: []
},
{
    name: "Properties",
    isarray: false,
    mapping: []
},
{
    name: "Scans",
    isarray: true,
    mapping: []
}, // array
{
    name: "Operations",
    isarray: false,
    mapping: []
}
]

var bankid_transform_bid = [{
    name: "person",
    isarray: false,
    mapping: []
},
{
    name: "addresses",
    isarray: true,
    mapping: []
},
{
    name: "documents",
    isarray: true,
    mapping: []
},
{
    name: "scans",
    isarray: true,
    mapping: []
},
{
    name: "extends",
    isarray: true,
    mapping: []
},
{
    name: "calculate",
    isarray: false,
    mapping: []
},
]

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
//console.log(bankid_transform_out);

// Parce input data
for (key in bankid_client) {

    var webbank_block = bankid_transform_bid.find(x => x.name === key).mapping[0].webbank.block;


    if (bankid_client[key] instanceof Array) {
        console.log("[" + key + "][" + webbank_block + "] Array ");
        //console.log(bankid_transform_out[webbank_block]);

        var cnt = 0;
        var amapi = [];
        ////console.log(" ["+webbank_block+"]["+key+"] "+a+"="+JSON.stringify(a));    
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
            //console.log(" [" + key + "][" + o + "]");// val=" + JSON.stringify(val));
            if (val !== undefined) {
                val.value = bankid_client[key][o];
                console.log("  [" + key + "][" + o + "]=" + val.value + "-" + val.webbank.default);
                //console.log(" 00 key=" + key + " o=" + o + " val=" + JSON.stringify(val));
                //console.log(val);
                bankid_transform_out[val.webbank.block].push(val);
            }
        }
    }
}
/*
console.log( "bankid_transform_out=");
console.log( bankid_transform_out );
console.log( "----------------------------------");
console.log( bankid_transform_out.Scans[0] );
console.log( bankid_transform_out.Addresses[0] );
console.log( bankid_transform_out.Addresses[1] );
*/

// Calculate field from bankid
var calcm = bankid_transform_bid.find(x => x.name === 'calculate').mapping;
/*
console.log("calcm --------------------------------------------");
console.log(calcm);
console.log("calcm --------------------------------------------");
*/

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

    var wblock = bankid_transform_out[wkey];//.find(x => x.webbank.block === wkey && x.webbank.code === wfld)
    wblock.push(item);
    wblock = bankid_transform_out[wkey];
    /*
    console.log("bankid_transform_out [" + wkey + "][" + wfld + "] ");
    console.log(wblock);
    console.log("bankid_transform_out --------------------------------------------");
    */
}


/*
calcm = bankid_transform_bid.find(x => x.name === 'calculate').mapping;
console.log("calcm --------------------------------------------");
console.log(calcm);
console.log("calcm --------------------------------------------");
/*
console.log( "bankid_transform_out=");
console.log( bankid_transform_out );
console.log( "----------------------------------");
*/
/*
const math = require(mathjs);
var a='Hello', b='world';
var r = math.evaluate(a + ' ' +b);
console.log("evaluate --------------------------------------------");
console.log(r);
console.log("evaluate --------------------------------------------");
*/

console.log("bankid_transform_out --------------------------------------------");
var fill_data = {};
fill_data.client = {};
for (item of bankid_transform_out.Client) {
    fill_data.client[item.webbank.code] = item.value;
}
fill_data.indiv = {};
for (item of bankid_transform_out.Individuals) {
    fill_data.indiv[item.webbank.code] = item.value;
}
var i = 0;
fill_data.ident = [];
for (item of bankid_transform_out.Identification) {
    console.log(item);
}
fill_data.props = [];
i = 0;
for (item of bankid_transform_out.Properties) {
    if (item.webbank.code !== '') {
        console.log(item);
        fill_data.props[i] = {};
        fill_data.props[i].Refs  = item.bankid.maps;
        fill_data.props[i].Code  = item.webbank.code;
        fill_data.props[i].Dict  = item.webbank.dict;
        fill_data.props[i].Value = item.value;

        if (item.bankid.maps !== undefined) {
            fill_data.props[i].Value = 
                get_reftrans(bankid_dicts, item.bankid.maps, item.value);
        }

        i++;
    }
}

var client_data = bankid_transform_out.Client;
const client_xml_files = {
    top: "./data/client-create-top.xml",

    client_top: './data/client-create-Empty.xml',
    client_man: './data/client-create-Clients.xml',
    client_bot: './data/client-create-Empty.xml',

    indiv_top: './data/client-create-Empty.xml',
    indiv_man: './data/client-create-Indiv.xml',
    indiv_bot: './data/client-create-Empty.xml',

    props_top: './data/client-create-Props-top.xml',
    props_man: './data/client-create-Props.xml',
    props_bot: './data/client-create-Props-bot.xml',

    ident_top: './data/client-create-Empty.xml',
    ident_man: './data/client-create-Ident.xml',
    ident_bot: './data/client-create-Empty.xml',

    addre_top: './data/client-create-Addre-top.xml',
    addre_man: './data/client-create-Addre.xml',
    addre_bot: './data/client-create-Addre-bot.xml',

    bot: "./data/client-create-bot.xml"
}
const client_xml = {
    top: null,
    client_top: null,    client_man: null,    client_bot: null,
    indiv_top: null,    indiv_man: null,    indiv_bot: null,
    props_top: null,    props_man: null,    props_bot: null,
    ident_top: null,    ident_man: null,    ident_bot: null,
    addre_top: null,    addre_man: null,    addre_bot: null,
    bot: null
}

client_xml.top = fs.readFileSync(client_xml_files.top, { encoding: 'utf8', flag: 'r' });

client_xml.client_top = fs.readFileSync(client_xml_files.client_top, { encoding: 'utf8', flag: 'r' });
client_xml.client_man = fs.readFileSync(client_xml_files.client_man, { encoding: 'utf8', flag: 'r' });
client_xml.client_bot = fs.readFileSync(client_xml_files.client_bot, { encoding: 'utf8', flag: 'r' });

client_xml.indiv_top = fs.readFileSync(client_xml_files.indiv_top, { encoding: 'utf8', flag: 'r' });
client_xml.indiv_man = fs.readFileSync(client_xml_files.indiv_man, { encoding: 'utf8', flag: 'r' });
client_xml.indiv_bot = fs.readFileSync(client_xml_files.indiv_bot, { encoding: 'utf8', flag: 'r' });

client_xml.props_top = fs.readFileSync(client_xml_files.props_top, { encoding: 'utf8', flag: 'r' });
client_xml.props_man = fs.readFileSync(client_xml_files.props_man, { encoding: 'utf8', flag: 'r' });
client_xml.props_bot = fs.readFileSync(client_xml_files.props_bot, { encoding: 'utf8', flag: 'r' });

client_xml.ident_top = fs.readFileSync(client_xml_files.ident_top, { encoding: 'utf8', flag: 'r' });
client_xml.ident_man = fs.readFileSync(client_xml_files.ident_man, { encoding: 'utf8', flag: 'r' });
client_xml.ident_bot = fs.readFileSync(client_xml_files.ident_bot, { encoding: 'utf8', flag: 'r' });

client_xml.addre_top = fs.readFileSync(client_xml_files.addre_top, { encoding: 'utf8', flag: 'r' });
client_xml.addre_man = fs.readFileSync(client_xml_files.addre_man, { encoding: 'utf8', flag: 'r' });
client_xml.addre_bot = fs.readFileSync(client_xml_files.addre_bot, { encoding: 'utf8', flag: 'r' });

client_xml.bot = fs.readFileSync(client_xml_files.bot, { encoding: 'utf8', flag: 'r' });

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
output = client_xml.top;
output += client_xml.client_top;
output += mustache.render(client_xml.client_man, fill_data.client);
output += client_xml.client_bot;
output += client_xml.indiv_top;
output += mustache.render(client_xml.indiv_man, fill_data.indiv);
output += client_xml.indiv_bot;
// documents
/*
output += client_xml.ident_top;
for (prop of fill_data.ident_man) {
    output += mustache.render(client_xml.props_man, prop);
}
output += client_xml.ident_bot;
*/
output += client_xml.props_top;
for (prop of fill_data.props) {
    output += mustache.render(client_xml.props_man, prop);
}
output += client_xml.props_bot;

output += client_xml.bot;

console.log(output);
// MAIN TRANSFORMATOR --------------------------------------

// FUNCTIONS -----------------------------------------------
function get_reftrans(refmaps, idrefcode, idvalue) {
    var ret = idvalue;

    return ret;
}
// FUNCTIONS -----------------------------------------------