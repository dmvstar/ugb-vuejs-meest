function normalise0(obj, aout, pkey) {
    if (typeof obj === 'object') {
        ret = {};
        for (var key in obj) {
            if (typeof obj[key] === 'object') {
                console.log("o  " + pkey + " " + key);
                if (key !== "$") {
                    aout[key] = {};
                    ret[key] = {};
                    console.log(ret);
                    ret = normalise(obj[key], aout, key);
                } else {
                    ret = normalise(obj[key], aout, pkey);
                }
            } else {
                console.log("v  " + pkey + " " + key + ": " + obj[key]);
                console.log(ret);
                var skey = key;
                if (key === "_") 
                    skey = "result";
                


                if (key !== "$") 
                    aout[pkey][skey] = obj[key];
                


                if (key !== "$") {
                    ret[pkey] = {};
                    ret[pkey][skey] = obj[key];
                }
            }
        }
        return ret;
    } else {
        return obj;
    }
};


function normalise1(obj, pkey, pret) {
    ret = {};
    for (var key in obj) {
        if (typeof obj[key] === 'object') {
            console.log("o  " + pkey + " " + key);
            if (key !== "$") { // if (ret === undefined ) ret = {}
                if (pkey === undefined) { // console.log(">", key, ret);
                    ret[key] = normalise(obj[key], key, ret);
                    console.log("<", key, ret);
                } else { // ret[pkey] = {};
                    ret[key] = normalise(obj[key], key, ret);
                    console.log(">", ret);
                    // ret[pkey][key] = normalise(obj[key],  key,  ret);
                }
            } else {
                console.log(" $", pret);
                ret[key] = normalise(obj[key], key, ret);
                // pret[key] = normalise(obj[key], pkey, ret);
            }
        } else {
            console.log("  v  " + pkey + " " + key + ": " + obj[key]);
            var skey = key;
            // if( key === "_")  skey = "result";
            // if( key !== "$" ) { ret[skey] = obj[key]; }
            console.log(ret);
        }
    }
    return ret;
}

function simplify(obj) {
    if (Object.prototype.toString.call(obj) == "[object Array]") {
        var out = [];
        if (obj.length > 1) {
            for (var i in obj) {
                out[i] = simplify(obj[i]);
            }
            return out;
        } else if (obj.length == 1) {
            out = simplify(obj[0]);
            return out;
        } else {
            return "";
        }
    } else if (Object.prototype.toString.call(obj) == "[object Object]") {
        var out = {};
        for (var property in obj) {
            if (property === 'RESPONSE') 
                outProperty = property.toLowerCase();
             else {
                outProperty = property[0].toLowerCase();
                outProperty = outProperty + property.substr(1, property.length);
            } out[outProperty] = simplify(obj[property]);
        }
        return out;
    } else {
        return obj;
    }
}

function normalise(obj, pkey, pret) {
    if (typeof obj === 'object') {
        var out = {};
        for (var property in obj) {
            console.log(">>>", property, obj[property]);
            console.log("$$$", obj['$']);
            if (obj['$'] !== undefined) { // out[property] = normalise(obj[property]);
                out = obj['$'];
            } else {
                out[property] = normalise(obj[property]);
            }

        }
        return out;
    } else { // console.log("###", obj);
        return obj;
    }
}

function transform_oree(aobj) {
    var obj = aobj['RESPONSE'];
    var out = {};    
    for (var property in obj) {
        if (property === '$') {
            for (var key in obj[property]) {
                out[key] = obj[property][key];
            }
        } else {
            out[property] = {};
            for (var key in obj[property]) {
                var okey = key;
                if (key === '$') {
                    for (var akey in obj[property][key]) {
                        out[property][akey] = obj[property][key][akey];
                    }
                } else {
                    if(key == '_') okey = 'result';                
                    out[property][okey] = obj[property][key]; 
                }
            }
            
        }
    }
    var ret = {
        response : out
    }
    return ret;
}


// MAIN --------------------------------------------------------------------------------
var resn = require('./oree-no.json');
var out = {};
var oout;
oout = transform_oree(resn);
console.log(JSON.stringify(oout, null, 4));
// console.log(oout);
/*
var reso = require('./oree-ok.json');
out = {};
oout = normalise( reso );
console.log( JSON.stringify(out, null, 4) );
console.log( JSON.stringify(oout, null, 4) );
*/
// MAIN --------------------------------------------------------------------------------
