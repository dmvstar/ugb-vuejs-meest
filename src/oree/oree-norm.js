
function normaliseJsonObject(jsonObject, out, akey){
    for(var key in jsonObject){
        if (typeof jsonObject[key] === 'object') {
            //console.log("o  "+akey + " " + key);
            if( key !== "$" ) {
                out[key] = {};
                normaliseJsonObject(jsonObject[key], out, key);
            } else {
                normaliseJsonObject(jsonObject[key], out, akey);
            }
            
        } else{
            //console.log("v  "+akey + " " + key + ": " + jsonObject[key]);
            var skey = key;
            if( key === "_")  skey = "result";
            if( key !== "$" ) out[akey][skey] = jsonObject[key];
        }
    }
};

// MAIN --------------------------------------------------------------------------------
var resn = require('./oree-no.json');
var out = {};
normaliseJsonObject( resn, out);
console.log( JSON.stringify(out, null, 4) );

var reso = require('./oree-ok.json');
out = {};
normaliseJsonObject( reso, out);
console.log( JSON.stringify(out, null, 4) );
// MAIN --------------------------------------------------------------------------------