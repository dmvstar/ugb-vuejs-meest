//@what checker4fmtields.js
//https://regex101.com/ 
//--------------------------------------------------------------------------

var isConsole = true;
var isLocalWork = true;
if (typeof msg != "undefined") {
    isLocalWork = false;
}    
else var msg;

var validateData;
var validateMapa
if(isLocalWork) { 
    validateData = require('./validateData.json');
    validateMapa = require('./validateMapa.json');
    msg = {};
    msg.vBIdata = validateData;
    msg.vBImapa = validateMapa;   
}
//console.log(validateMapa);
//--------------------------------------------------------------------------
var regSD10  = "^[0-9]{10}$"
var regSD09  = "^[0-9]{9}$"
var regSPass = "^[А-Ю][А-Ю][0-9]{6}$"
var regSBIINN= "(^[0-9]{10}$)|(^[0-9]{9}$)|(^[А-Ю][А-Ю][0-9]{6}$)";

//--------------------------------------------------------------------------
//@what checker4fmtields.js
function validateItem(vmap, check, parent, field) {
    //console.log("validateItem", check, parent, field, vmap);    
    var mcheck;
    var result = true;
    if(check===undefined) {
        if(vmap.needed) {
            mcheck = "Отсутвует значение обязательного поля !";        
            result = false;
        }
    } else {
        const regexp = new RegExp(vmap.express, "gm");
        result = regexp.test(check);
        mcheck = check;
    }     
    const message = vmap.message!==undefined&!result?vmap.message+" ("+parent+'->'+field+")["+mcheck+"]":"";
    var ret = {
        result:     result,
        path:       parent+'->'+field,
        check:      mcheck, 
        express:    vmap.express,
        message:    message
    }
    //console.log("validateItem", result);
    return ret;
}

function s(level)
{
    var ret = "";
    for (i=0; i<level*4; i++,ret +=" ");
    return ret;
}

function validateTree(vmap, data, parent, path, alevel) {
    
    var ret = [];    
    var level = alevel + 1;
    
    for (var imap in vmap) {
        path += (parent+".");
        var result;

        if(typeof vmap[imap] === "object"){
            //console.log(s(level),'0',level, (typeof vmap[imap]), imap);
            if(!Array.isArray(vmap[imap])) {
                if (vmap[imap].express !== undefined) {
                    if(!Array.isArray(data)) {
                        if(isLocalWork) console.log(s(level),'22',level, (typeof vmap[imap]), imap, Array.isArray(data), vmap[imap], data);
                        if(data!==undefined)
                        {
                            result = validateItem(vmap[imap], data[imap], parent, imap); 
                            ret.push(result); 
                        }    
                    } else {
                        //console.log(s(level),'33',level, data);
                        for (var idat of data) { // array
                            var testData = idat[imap];
                            result = validateItem(vmap[imap], testData, parent, imap);
                            ret.push(result); 
                        }
                    }    
                }
                else { 
                    //console.log(s(level),'2',level, (typeof vmap[imap]), imap);
                    var oret = validateTree(vmap[imap], data[imap], imap, path, level);
                    ret = ret.concat(oret);
                }    
            }
            else {                            
                //console.log(s(level),'3',level, (typeof vmap[imap]), imap, vmap[imap]);
                var oret = validateTree(vmap[imap][0], data[imap], imap, path, level);
                ret = ret.concat(oret);
            }             
        }
    }
    return ret;
}

function validateResult(checkErrors)
{
    var hasError = false;
    var result = [];

    for (var o of checkErrors) {
        if(!o.result) {
            hasError = true;
            result.push(o);
        }
    }

    return {
        hasError : hasError,
        errorCount : result.length,
        result : result
    }
}
//--------------------------------------------------------------------------
var out = validateTree(msg.vBImapa, msg.vBIdata, '', '', 0);
var check = validateResult(out);
if(isLocalWork) {
    console.log('-------------------------');
    console.log(out);
    console.log('-------------------------');
    console.log(check);
    console.log('-------------------------');
}
//--------------------------------------------------------------------------
if(!isLocalWork) { 
    var mess = "Ошибка формата полей";
    if(check.hasError) {
        msg.payload = {
            result : "error",
            mess: mess,
            data: check
        }    
        msg.errorCodeRe = 1455;
        //return msg;
        node.error(mess, msg);
    } else {
        msg.payload = {
            result : "ok",
            mess: "Ok",
            data: []
        }    
        msg.errorCodeRe = 200;
        return msg;
    }
}