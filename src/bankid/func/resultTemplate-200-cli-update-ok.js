// resultTemplate-200-cli-update-ok.js
msg.statusCode = 200;
var path = '';
if (msg.req !== undefined)
    path = msg.req.route.path;

//----------------------------------------
msg.workTime = 'Work time is: ' + ((Date.now() - msg.workStart) / 1000) + ' sec.';

var data = {
    orig:   msg.in.bankid_orig,
    input:  msg.in.bankid_cli,
    trans:  msg.in.trans_data,
    result: msg.payload.result,
};

if (msg.isDebug === undefined && msg.isDebug === false) {
    delete (data.input);
    delete (data.trans);
    delete (data.docs);
    delete (data.orig);
}

msg.payload = {
    result: 'ok',
    code: 1200,
    time: msg.workTime,
    path: path,
    data: data
}

// Если вдруг
if (data.result.HasErrors === "true" || (data.result.Errors !== undefined && data.result.Errors.length > 0)) {
    msg.statusCode = 500;
    msg.payload.result = "error";
    msg.payload.code = '1502';
    msg.payload.message = 'Клиент с ошибками, необходимо связаться с сотрудником банка !';
    
    if (data.result.Errors[0].Text !== undefined)
        msg.payload.details = data.result.Errors[0].Text;
    if (data.result.Errors.length > 0)
        msg.payload.errors = data.result.Errors;
        
}
return msg;
