// defaultsBysocStatus.js

var defaultsProp = require('./defaultsBysocStatus.json');
//var defaultsProp = msg.in.defaults_ext;

var outputProps = [];
var defaultsMain = defaultsProp.find(x => x.socStatus === "1");

for(var o of defaultsProp) {
    //console.log(o.socStatus, o.socInfo);
    var outputProp = JSON.parse(JSON.stringify(defaultsMain));
    delete (outputProp.extendsRest);
    delete (o.extendsRest);

    for(var add in o) {
        if(typeof o[add] === 'string') {
            outputProp[add] = o[add];
        }
        if(typeof o[add] === 'object') {
            for(var rest in o[add]) {
                outputProp[add][rest] = o[add][rest];
            }
        }

    }
    outputProps.push(outputProp);
}
console.log(outputProps);
//msg.in.defaults_all = outputProps;
//return msg;


