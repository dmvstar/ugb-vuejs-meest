//Reply 401 error
msg.statusCode = 401;

var workTime = 0;
msg.workStop = Date.now();
workTime = (msg.workStop - msg.workStart) / 1000;
msg.workTime = 'Work time is: '+workTime +' sec.';
var errorCode = 1401;
if(msg.errorCodeRe !== undefined)
    errorCode = msg.errorCodeRe
var data = msg.payload;
if(data.length !== 0){
    msg.payload = {
        code : errorCode,
        result : 'error',
        time: msg.workTime,
        path: msg.req.route.path,
        data : data
    }
} 
return msg;
