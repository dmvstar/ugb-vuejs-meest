var oper = require('./transgen-addsender-1.json')

function toDate(aData) {
    var ret = '';
    if (aData !== undefined && aData.length == 10) 
        ret = aData.substring(8, 10) + '/' + aData.substring(5, 7) + '/' + aData.substring(0, 4);
    
    return ret;
}
function buildSenderInfo(sender) {
    var info = ';;;;,;;;0;000000000;';

    if (sender !== undefined) {
        info = '';
        if (sender.middleName === undefined) {
            info += sender.lastName.replace(/;/g, '|') + " " + sender.firstName.replace(/;/g, '|') + ";";
        } else {
            info += sender.lastName.replace(/;/g, '|') + " " + sender.firstName.replace(/;/g, '|') + " " + sender.middleName.replace(/;/g, '|') + ";";
        } 
        info += (sender.documentNameScrooge !== undefined ? sender.documentNameScrooge : '').replace(/;/g, '|') + ';' + 
            (sender.documentSeries !== undefined ? sender.documentSeries : '' ).replace(/;/g, '|') + ';' + 
            (sender.documentNumber !== undefined ? sender.documentNumber : '' ).replace(/;/g, '|') + ';' + 
            (sender.documentIssuedBy !== undefined ? sender.documentIssuedBy : '' ).replace(/;/g, '|') + ',' + toDate(sender.documentIssueDate) + ';' + toDate(sender.dateofBirth) + ';' + 
            (sender.address !== undefined ? sender.address : '').replace(/;/g, '|') + ';' + 
            '0;' + '000000000;';
    }
    return info;
}

//--------------------------------------------------------------------
console.log(toDate('2003-12-22'));
console.log(buildSenderInfo(oper.sender));
//--------------------------------------------------------------------
