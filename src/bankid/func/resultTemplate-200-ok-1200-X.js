//@WHERE resultTemplate-200-ok-1200-X.js
//Reply 200 ok
msg.statusCode = 200;
msg.statusCode = 500;
msg.workStop = Date.now();
msg.workTime = 'Work time is: ' + ((msg.workStop - msg.workStart) / 1000) + ' sec.';
var data = {
    orig:  msg.in.bankid_orig,
    input: msg.in.bankid_cli,
    trans: msg.out.trans_data,
    result: msg.out.result,
    info: msg.out.info,
    terr: msg.out.terr,
    docs: msg.out.docs
};
delete(data.trans);
if(msg.isDebug === undefined && msg.isDebug === false ){
    delete(data.input);
    delete(data.docs);
    delete(data.orig);
}
msg.payload = {
    result : 'ok',
    code : 1200,
    time: msg.workTime,
    path: msg.req.route.path,
    message : 'Клиент создан успешно',
    data : data
}

return msg;

