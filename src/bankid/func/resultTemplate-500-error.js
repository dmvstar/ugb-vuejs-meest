//Reply 500 error
msg.statusCode = 500;

msg.workStop = Date.now();
msg.workTime = 'Work time is: ' + (
    (msg.workStop - msg.workStart) / 1000
) + ' sec.';

var errorCode = 1502;
var result = 'error';

var message = "Шото пошло не так ((.";
var description ="";

if(data.message !== undefined)
    message += data.message;

if(msg.error !== undefined)
    description = msg.error;

if(msg.errorCodeRe !== undefined)
    errorCode = msg.errorCodeRe

var data = msg.payload;
if(data.length !== 0){
    msg.payload = {
        code : errorCode,
        result : result,
        time: msg.workTime,
        path: msg.req.route.path,
        message : message,
        error: data,
        data : data
    }
} 
return msg;
