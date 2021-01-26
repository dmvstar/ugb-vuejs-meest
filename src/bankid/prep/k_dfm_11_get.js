var k_dfm_11 = require('./k_dfm_11.json');
var msg = k_dfm_11.msg;

console.log(msg);

var jaddr = {
            "type": "juridical",
            "country": "UA",
            "state": "Житомирська",
            "area": "",
            "city": "Радомишль",
            "street": "вул. Плетенецька",
            "houseNo": "15",
            "flatNo": "1"
        };

var data = '00';
if( jaddr !== undefined && jaddr.state !== undefined) {
    for (var o of msg.dicts.k_dfm11 )
    {
        console.log(o);
        //if(jaddr.state.toLowerCase().includes( o.code.toLowerCase() ))  {
        if(jaddr.state.includes( o.code ))  {
            data = o.value;
            break;
        }
    }
}
console.log(data);
//msg.in.bankid_cli.extends.codOblRee = data;