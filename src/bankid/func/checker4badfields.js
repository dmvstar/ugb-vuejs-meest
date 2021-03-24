//@what checker4badfields.js

var error = false;

var regDate = "^(0[1-9]|[12][0-9]|3[01])[.](0[1-9]|1[012])[.](19|20)[0-9]{2}$"
var regSD10  = "^[0-9]{10}$"
var regSD09  = "^[0-9]{9}$"
var regSPass = "^[А-Ю][А-Ю][0-9]{6}$"
var regSAddr = "^(factual|juridical)$";
var regSDocs = "^(паспорт|passport|idpassport)$";
var regSDocsAll = "^(паспорт|passport|idpassport|zpassport|ident)$";

var checkDate = "";
var inn = msg.in.bankid_cli.person.inn;
var mess = "У Клиента ["+
msg.in.bankid_cli.person.inn+"]["
+msg.in.bankid_cli.person.lastName + " "
+msg.in.bankid_cli.person.firstName + " "
+msg.in.bankid_cli.person.middleName+"]";

const regD09 = new RegExp(regSD09, "gm");
const regPass = new RegExp(regSPass, "gm");
var checkPass = false;

// inn -> '0000000000'
if( regPass.test(msg.in.bankid_cli.person.inn) | 
    regD09.test(msg.in.bankid_cli.person.inn)  )
{
    checkPass = true;
    msg.in.bankid_cli.person.inn = '0000000000';
}

if( msg.in.bankid_cli.addresses.length === 0 ) {
    msg.errorCodeRe = 1430;
    mess += " Не задано ни одного адреса"
    msg.payload.result = mess;
    msg.payload.message = mess;
    error = true;
} 

if( msg.in.bankid_cli.documents.length === 0 ) {
    msg.errorCodeRe = 1440;
    mess += " Не задано ни одного документа"
    msg.payload.result = mess;
    msg.payload.message = mess;
    error = true;
} else {

    for(var  d of msg.in.bankid_cli.documents){
        const regexpDate = new RegExp(regDate, "gm");
        if( !regexpDate.test(d.dateIssue) ){
            msg.errorCodeRe = 1441;
            mess += " Ошибка формата поля документа dateIssue " + d.dateIssue + 
            " ("+regexpDate.test(d.dateIssue)+")"
            msg.payload.result = mess;
            msg.payload.message = mess;
            error = true;
            break;
        }

        const regDocs = new RegExp(regSDocsAll, "gm");
        if( !regDocs.test(d.type) ){
            msg.errorCodeRe = 1442;
            mess += " Ошибка формата поля документа type " + d.type + 
            " ("+regDocs.test(d.type)+")"
            msg.payload.result = mess;
            msg.payload.message = mess;
            error = true;
            break;
        }
    }
    
    if (checkPass) { // for INN N9 | SPass

        var validPass = false;
        for(var  d of msg.in.bankid_cli.documents){
            const regDocs = new RegExp(regSDocs, "gm");   
            if( regDocs.test(d.type) ) {
                validPass = true;
                break;
            }
        }    

        if( !validPass ){
            msg.errorCodeRe = 1443;
            mess += " Ошибка допустимости поля документа type для "+inn;
            msg.payload.result = mess;
            msg.payload.message = mess;
            error = true;
        }
    }
}

if( msg.in.bankid_cli.person.phone === undefined ) {
    msg.errorCodeRe = 1450;
    mess += " Не задан номер телефона"
    msg.payload.result = mess;
    msg.payload.message = mess;
    error = true;
}

checkDate = msg.in.bankid_cli.person.birthDay;
const regexpDate = new RegExp(regDate, "gm");
if( !regexpDate.test(checkDate) ) {
    msg.errorCodeRe = 1451;
    mess += " Ошибка формата поля birthDay "+ checkDate + 
        " ("+regexpDate.test(checkDate)+")"
    msg.payload.result = mess;
    msg.payload.message = mess;
    error = true;
}

if (error) {
    msg.payload = {
        data : msg.in.bankid_cli,
        //trans : {},
        message : msg.payload.message,
        result : msg.payload.result,
        //info: {},
        //docs: {}
    };
    node.error(mess, msg);
}
else {
    return msg;
}