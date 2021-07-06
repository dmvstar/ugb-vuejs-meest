/**
 * @WHERE bankid/func/localTZDates.js 
 * @WHAT Date transform
 * @VERSION 0.0.1
 * @NODE "6e4be5f7.c3ae24"
 */



function localTZDates(zdate){
    // 2021-03-31T10:46:48.841Z
    var tzShift = -2;
    var ldate=new Date(zdate.getTime() - (60000*(zdate.getTimezoneOffset()+tzShift)));
    var ldateTime = ldate.toISOString();//'.replace('Z', '');
    
    var ldate = ldateTime.substring(8,10)+'.'+
              ldateTime.substring(5,7)+'.'+
              ldateTime.substring(0,4)
              
    var ltime = ldateTime.substring(11,13)+':'+
              ldateTime.substring(14,16)+':'+
              ldateTime.substring(17)

    var rdate = ldateTime.substring(0,4)+'-'+
              ldateTime.substring(5,7)+'-'+
              ldateTime.substring(8,10)

    var exelDate = 25567.0 + ((zdate.getTime() - (zdate.getTimezoneOffset() * 60 * 1000)) / (1000 * 60 * 60 * 24));
    //--44305          
    return {
        requestRef: Math.floor(100000 + Math.random() * 900000),
        num4: Math.floor(1000 + Math.random() * 9000),
        zeroDateTime: zdate.toISOString(),
        exelDate: Math.floor(exelDate),
        localDate: ldate,
        localTime: ltime,
        localRevDate: rdate,
        localISODateTime: ldateTime,
        localTZDateTime:  ldate+"T"+ltime
    };
}

if (typeof msg === "undefined") {
    var msg={
        payload: {}
    }
}

var dt = new Date();
msg.payload = {
    zdate : dt.toISOString(),
    ldate : localTZDates(dt)
};
msg.payload = localTZDates(dt);
console.log(msg);
return msg;
