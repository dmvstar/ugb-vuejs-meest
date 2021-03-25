//Reply TErr 200 no
msg.statusCode = 200;

msg.workStop = Date.now();
msg.workTime = 'Work time is: ' + (
    (msg.workStop - msg.workStart) / 1000
) + ' sec.';
var isArray = false;
var resultCnt = 0; // Array

var code = 1502;
var result = 'no';
var data = {};
var details = msg.payload; // default responce Array
var message = details.result;

if(msg.error !== undefined)
    details = msg.error;

if(msg.errorCodeRe !== undefined)
    code = msg.errorCodeRe

msg.payload = {
    result : result,
    code : code,
    time: msg.workTime,
    path: msg.req.route.path,
    message : message,
    details : details,
    error : msg.payload,
    data : {}
}

return msg;
