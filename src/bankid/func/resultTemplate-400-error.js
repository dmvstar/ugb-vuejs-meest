//Reply 400 error
msg.statusCode = 400;

msg.workStop = Date.now();
msg.workTime = 'Work time is: ' + (
    (msg.workStop - msg.workStart) / 1000
) + ' sec.';

var errorCode = 1402;
var result = 'error';
var data = msg.payload;


var message = "Ошибка формата данных. ";
var description =""

if(data.message !== undefined)
    message += data.message;

if(msg.error !== undefined)
    description = msg.error;

if(msg.errorCodeRe !== undefined)
    errorCode = msg.errorCodeRe

if(data.length !== 0){
    msg.payload = {
        code : errorCode,
        result : result,
        time: msg.workTime,
        path: msg.req.route.path,
        message: message,
        description: description,
        error: data,
        data : {}
    }
} 
return msg;

