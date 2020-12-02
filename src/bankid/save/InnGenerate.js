function getKey(data){
  var aMulti = [  -1,  5,  7,  9,  4,  6,  10,  5,  7,  0];
  var key = data.length;
  if(data.length == 10) {
    var sum = 0;
    for(var i=0;i<aMulti.length;i++) {
      var o = data[i]*aMulti[i];
      sum += o;
    }
  }
  var msum = sum - ( Math.trunc(sum / 11) * 11);
  return msum<10?msum:0;
}

function excelDateToJSDate(serialDate) {
  var e0date = new Date(0); // epoch "zero" date
  var offset = e0date.getTimezoneOffset(); // tz offset in min

  //console.log(''+serialDate);
  //var dateOut = new Date(Date.UTC(0, 0, serialDate, offset));
  //var dateOut = new Date(Math.round((serialDate - 25569)*86400*1000));
  var dateOut = new Date(Math.round((serialDate - 25568)*86400*1000));
  return dateOut.toJSON();
}

function printIPN(data) {
  var dataOk = data.substr(0,9) + getKey(data);
  var requestDat = data.substring(0, 5);
  var myDate = new Date( requestDat *1000);
  var sex = ""+data[8]%2+"("+(data[8]%2==0?"F":"M")+")";
  console.log(''+data+'   '
  +getKey(data)
  +'  '+data[9]
  +'  '+(data[9]==getKey(data)?'Ok':'NO')
  +'  '+dataOk
  +'  '+sex
  +'  '+excelDateToJSDate(requestDat)
  );

}


var requestRef;
var requestAmo;
var requestSex;


printIPN('3076283489');
printIPN('3005212296');
printIPN('2588006534');
console.log();
for (var i=0; i<10; i++){

  requestDat = Math.floor(Math.random() * 20000)+20000;
  requestAmo = Math.floor(Math.random() * 100)+100;
  requestSex = Math.floor(Math.random() * 10-1)+1;
  requestKey = Math.floor(Math.random() * 10-1)+1;

  var min=4;
  var max=5;
  var random = Math.floor(Math.random() * (+max - +min)) + +min;

  var data = ''+requestDat+requestAmo+requestSex+requestKey;
  printIPN(data);

}


//console.log('<ClientId>'.length);
