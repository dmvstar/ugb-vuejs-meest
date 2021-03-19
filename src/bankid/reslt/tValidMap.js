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
            "num": "9876565454"
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
    for (var o in vmap) {
        path += (parent+".");
        //console.log(' 0',(typeof vmap[o]), o, 'Array',Array.isArray(vmap[o]))
        //console.log(o, obj[o]);
        if(typeof vmap[o] === "object"){
            if(!Array.isArray(vmap[o])) {
                if (vmap[o].express !== undefined) {
                    var result = validateItem(data[o], vmap[o].express, parent, o, vmap[o].message);  
                    console.log(result);
                }
                else  
                    validateTree(vmap[o],    data[o], o, path);  
            }
            else {                            
                validateTree(vmap[o][0], data[o], o, path);   
            }             
        } else {
            console.log(' +',parent, o, vmap[o]);                      
            if(!Array.isArray(data)) {
                //console.log('  *',data[parent][o]);
                var result = validateItem(data[o], vmap[o], parent, o);  
                console.log(result);
            } else {
                for (var a of data) {
                    //console.log('   a',a);   
                    for (var oa in a) {
                        if(oa == o) {
                            var result = validateItem(a[oa], vmap[o], parent, o);
                            console.log(result);
                        }
                    }
                }
            }            
        }
    }
}




validateTree(validateMap, validateData, '', '');


