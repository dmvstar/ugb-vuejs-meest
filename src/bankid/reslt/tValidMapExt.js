var regSD10  = "^[0-9]{10}$"
var regSD09  = "^[0-9]{9}$"
var regSPass = "^[А-Ю][А-Ю][0-9]{6}$"
var regSBIINN= "("+regSD10+")|("+regSD09+")|("+regSPass+")";
const validateMap = {
    "person": {
        "inn": {
            "express": regSBIINN,
            "message": "Ошибка формата поля ИНН"
        },
        "birthDay": {
            "express":"^(0[1-9]|[12][0-9]|3[01])[.](0[1-9]|1[012])[.](19|20)[0-9]{2}$",
            "message": "Ошибка формата поля birthDay"
        },
        "ext": {
            "num": {
                "express":regSD10,
                "message": "Ошибка формата поля NUM"
            }
        }
    },
    "documents": [
        {
            "type": {
                "express":"^(паспорт|passport|idpassport)$",
                "message": "Ошибка формата паспорта, поле type"
            },
            "dateIssue": {
                "express":"^(0[1-9]|[12][0-9]|3[01])[.](0[1-9]|1[012])[.](19|20)[0-9]{2}$",
                "message": "Ошибка формата паспорта, поле dateIssue"
            }
        }
    ]
};

const validateData = {
    "person": {
        "inn": "2837213759",
        "birthDay": "10.09.1977",
        "ext": {
            "num": "9876q565454"
        }
    },
    "documents": [
        {
            "type": "паспортф",
            "dateIssue0": "19.07.1995"
        }
    ],
    "addresses": [
        {
            "type": "factual"
        }
    ]    
}

console.log('-----------------------------')

function validateItem(check, express, parent, field, message) {
    console.log("validateItem", check, express, parent, field, message);
    const regexp = new RegExp(express, "gm");
    const result = regexp.test(check);
    check = check===undefined?"Отсутвует значение поля !":check;
    var ret = {
        result: result,
        path: parent+'->'+field,
        check: check, 
        express: express,
        message: message!==undefined&!result?message+" ("+parent+'->'+field+")["+check+"]":""
    }
    //console.log("------", message);
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
        var from = 0;

        if(typeof vmap[imap] === "object"){
            //console.log(s(level),'0',level, (typeof vmap[imap]), imap);
            if(!Array.isArray(vmap[imap])) {
                if (vmap[imap].express !== undefined) {
                    from = 1;
                    if(!Array.isArray(data)) {
                        //console.log(s(level),'22',level, (typeof vmap[imap]), imap, Array.isArray(data), vmap[imap]);
                        result = validateItem(data[imap], vmap[imap].express, parent, imap, vmap[imap].message); 
                        ret.push(result); 
                    } else {
                        //console.log(s(level),'33',level, data);
                        for (var idat of data) { // array
                            var testData = idat[imap];
                            result = validateItem(testData, vmap[imap].express, parent, imap, vmap[imap].message);
                            ret.push(result); 
                        }
                    }    
                }
                else { 
                    from = 2;
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
        } else {
            //console.log(s(level),'Z',level,(typeof vmap[imap]),Array.isArray(vmap[imap]), imap);
            if(!Array.isArray(data)) {
                from = 3;
                result = validateItem(data[imap], vmap[imap], parent, imap, "");
            } else               
            {
                for (var idat of data) { // array
                    var testData = idat[imap];
                    result = validateItem(testData, vmap[imap], parent, imap, "");
                    ret.push(result); 
                }
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
        result : result
    }
}

var out = validateTree(validateMap, validateData, '', '', 0);
console.log('-------------------------');
console.log(out);
console.log('-------------------------');
var check = validateResult(out);
console.log(check);
console.log('-------------------------');



