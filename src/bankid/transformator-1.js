const fs = require('fs');

var bankid_client = require('./bankid-cli-1.json');
var bankid_mapping = require('./bankid_mapping.json');
var bankid_dicts = require('./doc_types.json');

var bankid_transform_out = {};
var bankid_transform_web = [{
        name: "Client",
        isarray: false,
        mapping: []
    },
    {
        name: "Individuals",
        isarray: true,
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
console.log(bankid_transform_out);

// Parce input data
for (key in bankid_client) {

    var webbank_block = bankid_transform_bid.find(x => x.name === key).mapping[0].webbank.block;            
    console.log("[" + key + "]["+webbank_block+"] Array ");
    console.log(bankid_transform_out[webbank_block]);


    if (bankid_client[key] instanceof Array) {
        
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
                console.log("  ["+cnt+"]["+key+"] "+o+"="+a[o]); 
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
            
            cnt ++;
        }
        //console.log(amapi);
        console.log(amapi.length);
        bankid_transform_out[webbank_block] = amapi;
    } else {
        console.log("[" + key + "] Object");
        for (o in bankid_client[key]) {
            var mapi = bankid_transform_bid.find(x => x.name === key).mapping;
            var val = mapi.find(x => x.bankid.code === o);
            if (val !== undefined) {
                val.value = bankid_client[key][o];
                //console.log(" 00 key=" + key + " o=" + o + " val=" + JSON.stringify(val));
                //console.log(val);
                bankid_transform_out[val.webbank.block].push(val);
            }
        }
    }
}

console.log( "bankid_transform_out=");
console.log( bankid_transform_out );
console.log( "----------------------------------");
console.log( bankid_transform_out.Scans[0] );
console.log( bankid_transform_out.Addresses[0] );
