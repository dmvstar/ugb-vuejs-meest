const crypto = global.get('cryptoModule');

var data = msg.payload.person.inn;
var message;

hash = crypto.createHash('md5').update(data).digest("hex");

if(msg.payload.auth === undefined){
    message = "Отсутсвует блок контрольной суммы";
    msg.errorCodeRe = 1448;
        msg.payload = {
                message : message
        };
    node.error(message, msg)
} else {
    if(hash === msg.payload.auth.order_id) {
        return msg;    
    } else {
        message = "Ошибка валидации контрольной суммы";
        msg.errorCodeRe = 1447;
        msg.payload = {
                message : message
        };
        node.error(message, msg); 
    }
}

