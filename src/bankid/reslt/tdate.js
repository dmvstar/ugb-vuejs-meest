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







