var dt = new Date();

function localTZDates(zdate){
    // 2021-03-31T10:46:48.841Z
    var ldate=new Date(zdate.getTime() - (60000*(zdate.getTimezoneOffset()-2)));
    var ldateTime = ldate.toISOString().replace('Z', '');
    
    var ldate = ldateTime.substring(8,10)+'.'+
              ldateTime.substring(5,7)+'.'+
              ldateTime.substring(0,4)
              
    var ltime = ldateTime.substring(11,13)+':'+
              ldateTime.substring(14,16)+':'+
              ldateTime.substring(17)
              
    return {
        zeroDateTime: zdate.toISOString(),
        localDate: ldate,
        localTime: ltime,
        localISODateTime: ldateTime,
        localTZDateTime:  ldate+"T"+ltime
    };
}

msg.payload = {
    zdate : dt.toISOString(),
    ldate : localTZDates(dt)
};
return msg;
