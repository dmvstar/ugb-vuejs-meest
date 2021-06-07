//@WHERE resultTemplate-500-error-1502-X.js
//Reply 500
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
var details = "";
var errors = {};
if(data.result.errors.errorOperation.text !== undefined)
    details = data.result.errors.errorOperation.text;
if(data.result.errors !== undefined)
    errors = data.result.errors;

    msg.payload = {
    result : 'error',
    code : 1502,
    time: msg.workTime,
    path: msg.req.route.path,
    message : 'Клиент создан с ошибками, необходимо связаться с сотрудником банка !',
    details : details,
    errors : errors,
    data : data
}

return msg;

