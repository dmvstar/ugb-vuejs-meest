//@what checker4badfields.js

var error = false;
var regDate = "^(0[1-9]|[12][0-9]|3[01])[.](0[1-9]|1[012])[.](19|20)[0-9]{2}$"
var checkDate = "";

var mess = "У Клиента ["+
msg.in.bankid_cli.person.inn+"]["
+msg.in.bankid_cli.person.lastName+" "
+msg.in.bankid_cli.person.firstName + 
+msg.in.bankid_cli.person.middleName+"]";

if( msg.in.bankid_cli.addresses.length === 0 ) {
    msg.errorCodeRe = 1430;
    mess += " Не задано ни одного адреса"
    msg.payload.result = mess;
    error = true;
} 

if( msg.in.bankid_cli.documents.length === 0 ) {
    msg.errorCodeRe = 1440;
    mess += " Не задано ни одного документа"
    msg.payload.result = mess;
    error = true;
} else {
    for( d of msg.in.bankid_cli.documents){
        const regexpDate = new RegExp(regDate, "gm");
        if( !regexpDate.test(d.dateIssue) ){
            msg.errorCodeRe = 1441;
            mess += " Ошибка формата поля dateIssue " + d.dateIssue + 
            " ("+regexpDate.test(d.dateIssue)+")"
            msg.payload.result = mess;
            error = true;
            break;
        }
    }
}

if( msg.in.bankid_cli.person.phone === undefined ) {
    msg.errorCodeRe = 1450;
    mess += " Не задан номер телефона"
    msg.payload.result = mess;
    error = true;
}

checkDate = msg.in.bankid_cli.person.birthDay;
const regexpDate = new RegExp(regDate, "gm");
if( !regexpDate.test(checkDate) ) {
    msg.errorCodeRe = 1451;
    mess += " Ошибка формата поля birthDay "+ checkDate + 
        " ("+regexpDate.test(checkDate)+")"
    msg.payload.result = mess;
    error = true;
}

if (error) {
    msg.payload = {
        data : msg.in.bankid_cli,
        //trans : {},
        result : msg.payload.result,
        //info: {},
        //docs: {}
    };
    node.error(mess, msg);
}
else {
    return msg;
}