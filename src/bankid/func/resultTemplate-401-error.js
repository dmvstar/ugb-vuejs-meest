//Reply 401 error
msg.statusCode = 401;

msg.workStop = Date.now();
msg.workTime = 'Work time is: ' + (
    (msg.workStop - msg.workStart) / 1000
) + ' sec.';

var errorCode = 1401;
var result = 'error';
var data = msg.payload;

var message = "Помилка авторизації. ";
var description = "";

if(msg.error !== undefined)
    description = msg.error;

if(data.message !== undefined)
    message += data.message;

if(msg.errorCodeRe !== undefined)
    errorCode = msg.errorCodeRe;

if(data.length !== 0){
    msg.payload = {
        code : errorCode,
        result : result,
        time: msg.workTime,
        path: msg.req.route.path,
        message : message,
        error : data,        
        data : {}
    }
} 
return msg;
