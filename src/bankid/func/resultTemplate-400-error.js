//Reply 400 error
msg.statusCode = 400;

var workTime = 0;
msg.workStop = Date.now();
workTime = (msg.workStop - msg.workStart) / 1000;
msg.workTime = 'Work time is: '+workTime +' sec.';
var message = "Ошибка формата данных";
var description =""
if(msg.error !== undefined)
    description = msg.error;
var errorCode = 1402;
if(msg.errorCodeRe !== undefined)
    errorCode = msg.errorCodeRe
var data = msg.payload;
if(data.length !== 0){
    msg.payload = {
        code : errorCode,
        result : 'error',
        time: msg.workTime,
        path: msg.req.route.path,
        message: message,
        description: description,
        data : data
    }
} 
return msg;

