// scApiReplyOkResult.js
var workTime = 0;
msg.workStop = Date.now();
workTime = (msg.workStop - msg.workStart) / 1000;
msg.workTime = 'Work time is: '+workTime +' sec.';

var data = msg.payload;
if(data.length !== 0){
    msg.statusCode = 200;
    
    if(msg.topicResultCnt !== undefined && 
       msg.topicResultCnt === 1) {

      if(data.length === 1) {
        msg.payload = {
            code : '200',
            result : 'ok',
            time: msg.workTime,
            path: msg.req.route.path,
            data : data[0]
        }          
      } else {
          msg.payload = {
            code : '403',
            message : 'Too many data for request',
            result : 'no',
            workTime: msg.workTime,
            error: "Too many data for request",
            data : {}
        }
      } 

    } else {   
        msg.payload = {
            code : '200',
            result : 'ok',
            time: msg.workTime,
            path: msg.req.route.path,
            data : data
        }
    }
    return msg;
} else {
    msg.statusCode = 200;    
    data = [];

    if(msg.topicResultCnt !== undefined && 
       msg.topicResultCnt === 1 ) {
        data = {};
    }    

    msg.payload = {
        code : '402',
        message : 'Empty, no data for request',
        result : 'no',
        workTime: msg.workTime,
        error: "Empty, no data for request",
        data : data
    }
    return msg;
}
