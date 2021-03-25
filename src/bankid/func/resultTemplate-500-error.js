//Reply 500 error unhandled
msg.statusCode = 500;

msg.workStop = Date.now();
msg.workTime = 'Work time is: ' + (
    (msg.workStop - msg.workStart) / 1000
) + ' sec.';

var errorCode = 1502;
var result = 'error';
var data = {};
var error = msg.payload;

var message = "Шото пошло не так ((.";
var details = "Critical error. Reply 500 error unhandled";

if(data.message !== undefined)
    message += data.message;

if(msg.error !== undefined)
    error = msg.error;

if(msg.errorCodeRe !== undefined)
    errorCode = msg.errorCodeRe

var data = msg.payload;
if(data.length !== 0){
    msg.payload = {
        result : result,
        code : errorCode,
        time: msg.workTime,
        path: msg.req.route.path,
        message : message,
        details : details,
        error: error,
        data : data
    }
} 
return msg;
