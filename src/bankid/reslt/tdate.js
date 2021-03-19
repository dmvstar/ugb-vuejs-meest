var sdate = '2021-03-16T22:17:38.343Z'
var ddate = new Date(sdate)

console.log(ddate.toISOString())
myTZO = 2;
var ldate=new Date(ddate.getTime() - (60000*(ddate.getTimezoneOffset()-myTZO)));
console.log(ldate.toISOString())

function checkParams(params) {
    // set up regex for each parameter
    const validateMap = {
        "keyId"             : "^[0-9a-z-]{1,40}$", 
        "userId"            : "^[a-zA-Z_]{1,40}$",
        "transactionType"   : "(^(chng_mol|chng_st|chng_pmol)$)",
        "idTo"              : "(^[0-9]+$|^[a-zA-Z_]{1,40}$)"
    };
    var checked = true;
    for (const param in validateMap) {
        const regexp = new RegExp(validateMap[param], "gm")
        if(!regexp.test(params[param])){
            checked = false;
        }
    }
    return checked;
}



var dts = [
    "01.01.1990",
    "44.01.1990",
    "01011990",
    "1990.01.01",
    "01.21.1990",
    "10.09.1977",
    "01.07.1991",
    "23.07.1991",
    "23.07.1991",
    "23.07.1991",
    "23.07.1991",
    "23.07.1991",
    "10.09.1977"
]

var regDate = "^[0-3][0-9].[0-2][0-9].[1-2][0-9][0-9][0-9]"
regDate = "^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$ "
regDate = "^(0[1-9]|[12][0-9]|3[01])[.](0[1-9]|1[012])[.](19|20)[0-9]{2}$"

for(d of dts) {
    const regexpDate = new RegExp(regDate, "gm")
    console.log(d, regexpDate.test(d))
}

var regSD10  = "^[0-9]{10}$"
var regSD09  = "^[0-9]{9}$"
var regSPass = "^[А-Ю][А-Ю][0-9]{6}$"
var regSAddr = "^(factual|juridical)$";
var regSDocs = "^(passport|idpassport)$";

var digs = [
    "9876765656",
    "987676565",
    "АВ123456",
    "АВ123456 ",
    "98767656561",
    "АВ1234561",
    "A876765656"
]

console.log('----------------- regSD10')

for(d of digs) {
    const regexp = new RegExp(regSD10, "gm");
    console.log(d, regexp.test(d));
}

console.log('----------------- regSD09')

for(d of digs) {
    const regexp = new RegExp(regSD09, "gm");
    console.log(d, regexp.test(d));
}

console.log('----------------- regSPass')

for(d of digs) {
    const regexp = new RegExp(regSPass, "gm");
    console.log(d, regexp.test(d));
}

console.log('-----------------')

var regexpTest;
var atypes = ['factual','juridical'];
regexpTest = new RegExp(regSAddr, "gm");
console.log('factual', regexpTest.test('factual'));
console.log('2factual', regexpTest.test('2factual'));
console.log('factual', regexpTest.test('factual'));

console.log('-----------------')

var dtypes = ['passport','idpassport','zpassport','ident'];
regexpTest = new RegExp(regSDocs, "gm");
console.log('passport', regexpTest.test('passport'));
console.log('ксива', regexpTest.test('ксива'));



