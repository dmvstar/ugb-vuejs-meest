var body = {
    main :{
        f1 : 0,
        f2 : 1
        },
    ext : {
        maybe0 : true,
        maybe1 : "{{main.f1}}===1",
        maybe2 : "{{main.f2}}===1"
    }
}

//console.log(eval('2 + 2'));
//console.log(eval('2 === 2'));

function isNeeds(root, value) 
{
    ret = value;
    console.log(0);
    console.log(0, value, typeof value === 'string');
    if(typeof value === 'string') {
        var mustache = require("mustache");
        var output = mustache.render(value, root);
        console.log(1, value, output);
        var ret = false;
        ret = eval(output);
    }
    console.log(2, value, ret);
    return ret;
}
console.log(body);
isNeeds(body, body.ext.maybe0);
isNeeds(body, body.ext.maybe1);
isNeeds(body, body.ext.maybe2);
