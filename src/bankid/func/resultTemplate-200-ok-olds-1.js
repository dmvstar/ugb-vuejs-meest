msg.statusCode = 200;
var key = "person_md5";
flow.set(key, null)
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

//delete(data.trans);
    
if(msg.isDebug === undefined && msg.isDebug === false ){
    delete(data.input);
    delete(data.trans);
    delete(data.docs);
    delete(data.orig);
}

if(data.length !== 0){
    msg.payload = {
        result : 'ok',
        code : 1200,
        time: msg.workTime,
        path: msg.req.route.path,
        data : data
    }
    
    if(msg.payload.data.result.hasErrors === "true" || (msg.payload.data.result.errors !== undefined && msg.payload.data.result.errors !== "")) {
        msg.statusCode = 500;
        msg.payload.result = "error";
        msg.payload.code = 1502;
        msg.payload.message = 'Клиент создан с ошибками, необходимо связаться с сотрудником банка !';
        if(msg.payload.data.result.errors.errorOperation.text !== undefined)
            msg.payload.details = msg.payload.data.result.errors.errorOperation.text;
        if(msg.payload.data.result.errors !== undefined)
            msg.payload.errors = msg.payload.data.result.errors;

    }
    return msg;
} else {
    msg.payload = {
        message : 'no',
        code : 1202,
        workTime: msg.workTime,
        message: "No data for request",
        data : []
    }
    return msg
}
