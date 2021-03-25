msg.workStop = Date.now();
msg.workTime = 'Work time is: ' + (
    (msg.workStop - msg.workStart) / 1000
) + ' sec.';

var cdata = msg.payload.checkClientResponse.checkClientResult.client;
var errors = msg.payload.checkClientResponse.checkClientResult.errors;

var relev = 0;
var findCount = 0;
var info = "";

if (cdata !== undefined && cdata.checkClients !== undefined) {
    if (Array.isArray(cdata.checkClients)) {
        for (var o of cdata.checkClients) {
            if (o.weight === '100.00') {
                relev = 1;
                findCount++;
                // info += (o.systemName+" ");
                info = o.systemName;
            }
        }
        findCount = cdata.checkClients.length;
    } else {
        if (cdata.checkClients.weight === '100.00') {
            relev = 1;
            findCount = 1;
            info = cdata.checkClients.systemName;
        }
    }
}
if (relev === 1) {
    msg.statusCode = 200;
    msg.payload = {
        code: '1400',
        result: 'error',
        find: true,
        time: msg.workTime,
        path: msg.req.route.path,
        responce: cdata,
        data: 'BankId Клиент [' + msg. in.name + '] найден в [' + findCount + '][100%] списках: ' + info
    }
    // return msg;
} else {
    if (errors !== undefined && errors !== "" ) {
        msg.statusCode = 500;
        msg.payload = {
            code: '1500',
            result: 'error',
            find: false,
            time: msg.workTime,
            path: msg.req.route.path,
            data: errors
        }
    } else {
        msg.statusCode = 200;
        msg.payload = {
            code: '1200',
            result: 'ok',
            find: false,
            time: msg.workTime,
            path: msg.req.route.path,
            data: 'BankId Клиент [' + msg.in.name + '] не найден в списках террористов'
        }
    }
    // return msg;
}

return msg;
