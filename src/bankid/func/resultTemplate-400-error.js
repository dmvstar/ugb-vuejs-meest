//Reply 400 error bad fmt or field
msg.statusCode = 400;

msg.workStop = Date.now();
msg.workTime = 'Work time is: ' + (
    (msg.workStop - msg.workStart) / 1000
) + ' sec.';

var errorCode = 1402;
var result = 'error';
var data = {};
var error = msg.payload;

var message = "Ошибка формата...";
var details = "Error... Reply 400 error bad fmt or field";

if(error.message !== undefined)
    message = error.message;

if(error.details !== undefined)
    details = error.details;

if(msg.errorCodeRe !== undefined)
    errorCode = msg.errorCodeRe

if(data.length !== 0){
    msg.payload = {
        result : result,
        code : errorCode,
        time : msg.workTime,
        path : msg.req.route.path,
        message : message,
        details : details,
        error: error,
        data : data
    }
} 
return msg;

