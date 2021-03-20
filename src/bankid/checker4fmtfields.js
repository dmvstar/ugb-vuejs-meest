//@what checker4fmtields.js
//https://regex101.com/ 
//--------------------------------------------------------------------------
var msg;
var isConsole = true;
var validateData;
if(msg === undefined) { msg = {};
    validateData = require('./valdateData.json');
}
//--------------------------------------------------------------------------
var regSD10  = "^[0-9]{10}$"
var regSD09  = "^[0-9]{9}$"
var regSPass = "^[А-Ю][А-Ю][0-9]{6}$"
var regSBIINN= "("+regSD10+")|("+regSD09+")|("+regSPass+")";
const validateMap = {
    "person": {
        "inn": {
            "needed" : true,
            "express": regSBIINN,
            "message": "Ошибка формата поля ИНН"
        },
        "sex": {
            "needed" : true,
            "express": "^[MFЧЖ]$",
            "message": "Ошибка формата поля ПОЛ"
        },
        "birthDay": {
            "needed" : true,
            "express":"^(0[1-9]|[12][0-9]|3[01])[.](0[1-9]|1[012])[.](19|20)[0-9]{2}$",
            "message": "Ошибка формата поля birthDay"
        },
        "type": {
            "needed" : true,
            "express": "^physical$",
            "message": "Ошибка формата поля Тип"
        },
        "lastName": {
            "needed" : true,
            "express": "^[А-я]*$",
            "message": "Ошибка формата поля Фамилия"
        },
        "firstName": {
            "needed" : true,
            "express": "^[А-я]*$",
            "message": "Ошибка формата поля Имя"
        },
        "middleName": {
            "needed" : true,
            "express": "^[А-я]*$",
            "message": "Ошибка формата поля Отчество"
        },

        "ext": {
            "num": {
                "needed" : false,
                "express":regSD10,
                "message": "Ошибка формата поля NUM"
            }
        }
    },
    "documents": [
        {
            "type": {
                "needed" : true,
                "express":"^(паспорт|passport|idpassport)$",
                "message": "Ошибка формата паспорта, поле type"
            },
            "dateIssue": {
                "needed" : true,
                "express":"^(0[1-9]|[12][0-9]|3[01])[.](0[1-9]|1[012])[.](19|20)[0-9]{2}$",
                "message": "Ошибка формата паспорта, поле dateIssue"
            }
        }
    ],
    "addresses": [
        {
            "type": {
                "needed" : true,
                "express":"^(factual|juridical)$",
                "message": "Ошибка формата адреса, поле type"
            }
        }
    ]
};
msg.vdata = validateData;
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
                        //console.log(s(level),'22',level, (typeof vmap[imap]), imap, Array.isArray(data), vmap[imap]);
                        result = validateItem(vmap[imap], data[imap], parent, imap); 
                        ret.push(result); 
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
var out = validateTree(validateMap, msg.vdata, '', '', 0);
var check = validateResult(out);
if(isConsole) {
    console.log('-------------------------');
    console.log(out);
    console.log('-------------------------');
    console.log(check);
    console.log('-------------------------');
}
//--------------------------------------------------------------------------


