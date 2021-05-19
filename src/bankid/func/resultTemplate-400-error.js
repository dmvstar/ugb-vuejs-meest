// Reply 400 error bad fmt or field
msg.statusCode = 400;

msg.workStop = Date.now();
msg.workTime = 'Work time is: ' + (
    (msg.workStop - msg.workStart) / 1000
) + ' sec.';

var errorCode = 1402;
var result = 'error';
var path = 'local';
var data = {};

var payload = msg.payload;

if (msg.error !== undefined) 
    error = msg.error;

var message = "Ошибка формата...";
var details = "Error... Reply 400 error bad fmt or field";

if (error.message !== undefined) 
    message = error.message;

if (error.details !== undefined) 
    details = error.details;
 else if (payload.details !== undefined) 
    details = payload.details;

if (msg.errorCodeRe !== undefined) 
    errorCode = msg.errorCodeRe
 else if (payload.code !== undefined) 
    errorCode = payload.code;

if (msg.req !== undefined && msg.req.route !== undefined && msg.req.route.path !== undefined) 
    path = msg.req.route.path;

if (data.length !== 0) {
    msg.payload = {
        result: result,
        code: errorCode,
        time: msg.workTime,
        path: path,
        message: message,
        details: details,
        error: error,
        data: data
    }
}
return msg;
