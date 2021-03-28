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
            "type": "^(паспорт|passport|idpassport)$",
            "dateIssue": "^(0[1-9]|[12][0-9]|3[01])[.](0[1-9]|1[012])[.](19|20)[0-9]{2}$"
        }
    ]
};

const validateData = {
    "person": {
        "inn": "28377213759",
        "birthDay": "10.09.1977",
        "ext": {
            "num": "9876q565454"
        }
    },
    "documents": [
        {
            "type": "паспортф",
            "dateIssue": "19.07.1995"
        }
    ],
    "addresses": [
        {
            "type": "factual"
        }
    ]    
}

var inns = [
    "2121212121",
    "121321231",
    "123",
    "1232123456677",
    "АА213421",
    "АА2134214"
]

for(d of inns) {
    const regexp = new RegExp(regSBIINN, "gm");
    console.log(d, regexp.test(d));
}
console.log('-----------------------------')

function validateItem(check, express, parent, field, message) {
    const regexp = new RegExp(express, "gm");
    const result = regexp.test(check);
    //console.log('   #', parent, field,result, check, express); 
    var ret = {
        result: result,
        path: parent+'->'+field,
        check: check, 
        express: express,
        message: message!==undefined&!result?message:""
    }
    //console.log('validateItem', ret);
    return ret;
}

function validateTree(vmap, data, parent, path) {
    for (var imap in vmap) {
        path += (parent+".");
        var result;
        var from = 0;
        if(typeof vmap[imap] === "object"){
            if(!Array.isArray(vmap[imap])) {
                if (vmap[imap].express !== undefined) {
                    from = 1;
                    result = validateItem(data[imap], vmap[imap].express, parent, imap, vmap[imap].message);  
                }
                else { 
                    validateTree(vmap[imap], data[imap], imap, path);  
                }    
            }
            else {                            
                validateTree(vmap[imap][0], data[imap], imap, path);   
            }             
        } else {
            if(!Array.isArray(data)) {
                from = 2;
                result = validateItem(data[imap], vmap[imap], parent, imap);
            } else {
                for (var idat of data) {
                    for (var ikey in idat) {
                        if(ikey == imap) {
                            from = 3;
                            result = validateItem(idat[ikey], vmap[imap], parent, imap);
                        }
                    }
                }
            }            
        }
        console.log();
        console.log(from, imap, typeof vmap[imap], result);
    }
}

validateTree(validateMap, validateData, '', '');


