//Reply 401 error
msg.statusCode = 401;

msg.workStop = Date.now();
msg.workTime = 'Work time is: ' + (
    (msg.workStop - msg.workStart) / 1000
) + ' sec.';

var errorCode = 1401;
var result = 'error';
var data = {};
var error = msg.payload;

var message = "Помилка авторизації. ";
var details = "Auth error. Reply 401 error. ";

if(msg.error !== undefined)
    error = msg.error;

if(data.message !== undefined)
    message += data.message;

if(msg.errorCodeRe !== undefined)
    errorCode = msg.errorCodeRe;

if(data.length !== 0){
    msg.payload = {
        result : result,
        code : errorCode,
        time: msg.workTime,
        path: msg.req.route.path,
        message : message,
        details : details,
        error : error,        
        data : {}
    }
} 
return msg;
