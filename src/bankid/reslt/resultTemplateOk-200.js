var isArray = false;
var resultCnt = 0; // Array
var code = 1200;
var result = 'ok';
msg.workStop = Date.now();
msg.workTime = 'Work time is: ' + (
    (msg.workStop - msg.workStart) / 1000
) + ' sec.';

var data = msg.payload; // default responce Array
if (msg.topicResultCnt !== undefined) 
    resultCnt = msg.topicResultCnt;
if (Array.isArray(data)) 
    isArray = true;
if (data === undefined || data.length === 0) { // no data
    code = 1401;
    result = 'no';
    if (msg.topicResultCnt === 1) 
        // needed responce empty Obj
        data = {};
     else 
        // needed responce empty Array
        data = [];
} else {
    if (msg.topicResultCnt === 1) {
        if (isArray) { // needed responce Obj
            if (data.length == 1) 
                data = msg.payload[0];
             else {
                code = 1501;
                result = 'error';
                data = {};
            }
        }
        // needed responce Array else 
            data = msg.payload;
    }
}

msg.statusCode = 200;
msg.payload = {
    result: result,
    code: code,
    time: msg.workTime,
    path: msg.req.route.path,
    data: data
};

return msg;