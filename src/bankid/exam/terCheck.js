var workTime = 0;
msg.workStop = Date.now();
workTime = (msg.workStop - msg.workStart) / 100;
msg.workTime = 'Work time is: '+workTime +' msec.';

var data = msg.payloadcheckClientResponse.checkClientResult.client;
if(data.length !== 0){
    msg.statusCode = 200;
    msg.payload = {
        code : '400',
        result : 'error',
        time: msg.workTime,
        path: msg.req.route.path,
        responce : data,
        data : 'Клиент ['+msg.in.name+'] найден в ['+data.length+'] списках террористов'
    }
    return msg;
} else  {
    msg.statusCode = 200;
    msg.payload = {
        code : '200',
        result : 'ok',
        time: msg.workTime,
        path: msg.req.route.path,
        data : 'Клиент ['+msg.in.name+'] не найден в списках террористов'
    }
    return msg;
    
}
