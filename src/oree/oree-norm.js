
function normalise0(obj, aout, pkey){
    if (typeof obj === 'object') {
        ret = {};
        for(var key in obj){
            if (typeof obj[key] === 'object') {
                console.log("o  "+pkey + " " + key);
                if( key !== "$" ) {
                    aout[key] = {};
                    ret[key] = {};
                    console.log(ret);
                    ret = normalise(obj[key], aout, key);
                } else {
                    ret = normalise(obj[key], aout, pkey);
                }                
            } else{
                console.log("v  "+pkey + " " + key + ": " + obj[key]);
                console.log(ret);
                var skey = key;
                if( key === "_")  skey = "result";
                if( key !== "$" ) aout[pkey][skey] = obj[key];
                if( key !== "$" ) {ret[pkey] = {}; ret[pkey][skey] = obj[key];}
            }
        }
        return ret;
    } else {
        return obj;
    }
};

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
           if( property === 'RESPONSE')
               outProperty = property.toLowerCase();
           else {
               outProperty = property[0].toLowerCase();
               outProperty = outProperty + property.substr(1, property.length);
           }
           out[outProperty] = simplify(obj[property]);
       }
        return out;
    } else {
        return obj;
    }
}


function normalise(obj, pkey, pret){      
        ret = {};
        for(var key in obj){             
            if (typeof obj[key] === 'object') {
                console.log("o  "+pkey + " " + key);
                if( key !== "$" ) {
                    if (ret === undefined ) ret = {}
                    if(pkey === undefined) {                                   
                        console.log(">", key, ret);
                        ret[key] = normalise(obj[key], key,   ret);
                        console.log("<", key, ret);
                    } else {
                        ret[pkey] = {};
                        console.log("+", ret);
                        //ret[pkey][key] = normalise(obj[key],  key,  ret);
                    }                    
                } else {
                    console.log("$", pret);
                    ret = pret;                    
                    pret[key] = normalise(obj[key], pkey, ret);
                }                
            } else {
                console.log("v  "+pkey + " " + key + ": " + obj[key]);
                
                var skey = key;
                //if( key === "_")  skey = "result";                
                if( key !== "$" ) { ret[skey] = obj[key]; }
                console.log(ret);
            }
        }
        return ret;
} 


// MAIN --------------------------------------------------------------------------------
var resn = require('./oree-no.json');
var out = {};
var oout;
oout = normalise( resn );
//console.log( JSON.stringify(out, null, 4) );
console.log( oout );
/*
var reso = require('./oree-ok.json');
out = {};
oout = normalise( reso );
console.log( JSON.stringify(out, null, 4) );
console.log( JSON.stringify(oout, null, 4) );
*/
// MAIN --------------------------------------------------------------------------------