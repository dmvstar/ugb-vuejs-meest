/** @where checkPersonHash-X.js
 *  @what check double run with same person data 
*/
const crypto = global.get('cryptoModule');

var data = JSON.stringify(msg.in.bankid_cli.person);
var key = "person_md5";

var hash_cur = crypto.createHash('md5').update(data).digest("hex");
var hash_chk = flow.get(key);

if(hash_chk === undefined || hash_chk !== hash_cur) {
    flow.set(key, hash_cur);
    return msg;
} else {
    var error = {
        inn : data.inn,
        hash : hash_cur
    }
    var message = 'Обработка данных по запросу '+msg.logRef+' уже идет.';
    var details = 'Same MD5 for old and new person data.'
    msg.errorCodeRe = 1465;
    msg.payload = {
        result : "error",
        message : message,
        details : details,
        data : error
    };

    node.error(message, msg)
}
