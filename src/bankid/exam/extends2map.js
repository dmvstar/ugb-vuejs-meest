var validateData = require('./kk-client-info-0.json');

var ext = validateData.extends;
var out = {};

for(var o in ext){
    //console.log(o);
    out[o] = {
            "value": ext[o],
            "needed": false,
            "express": "^[1-9]$",
            "message": "Ошибка формата поля " + o
        }
}

console.log(JSON.stringify(out, null, 2));
