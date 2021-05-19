const crypto = global.get('cryptoModule');

var data = JSON.stringify(msg.in.bankid_cli.person);
var key = "person_md5";

var hash_cur = crypto.createHash('md5').update(data).digest("hex");
var hash_chk = flow.get(key);

if(hash_chk === undefined || hash_chk !== hash_cur) {
    flow.set(key, hash_cur);
    return [msg, null];
} else {
    return [null, msg];
}
