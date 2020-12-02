var fs = require('fs');
var data = fs.readFileSync('./fio.json');
var contents = JSON.parse(data);

var contentsM = [],
  contentsF = [];

for (o of contents) {
  //console.log(o);
  if (o.gender === 1)
    contentsM.push(o);
  else
    contentsF.push(o);
}

console.log(contentsM[0]);
console.log(contentsF[0]);

var aMulti = [-1, 5, 7, 9, 4, 6, 10, 5, 7, 0];

function getKey(data) {
  var key = data.length;
  if (data.length == 10) {
    var sum = 0;
    for (var i = 0; i < aMulti.length; i++) {
      var o = data[i] * aMulti[i];
      sum += o;
    }
  }

  var msum = sum - (Math.trunc(sum / 11) * 11);

  return msum < 10 ? msum : 0;
}

function excelDateToJSDate(serialDate) {
  var e0date = new Date(0); // epoch "zero" date
  var offset = e0date.getTimezoneOffset(); // tz offset in min

  //console.log(''+serialDate);
  //var dateOut = new Date(Date.UTC(0, 0, serialDate, offset));
  //var dateOut = new Date(Math.round((serialDate - 25569)*86400*1000));
  var dateOut = new Date(Math.round((serialDate - 25568) * 86400 * 1000));
  return dateOut.toJSON();
}

function printIPN(data) {
  var dataOk = data.substr(0, 9) + getKey(data);
  var requestDat = data.substring(0, 5);
  var myDate = new Date(requestDat * 1000);

  var gender = (data[8] % 2 == 0 ? 2 : 1);
  var sex = data[8] % 2 + "(" + (data[8] % 2 == 0 ? "F" : "M") + ")";

  var aFio;

  //console.log('sex: ' + sex + ', gender: ' + gender);
  if (gender === 1) {
    aFio = contentsM;
  } else {
    aFio = contentsF;
  }
  //console.log(aFio[0]);

  /*
  console.log(''+data+'   '
  +getKey(data)
  +'  '+data[9]
  +'  '+(data[9]==getKey(data)?'Ok':'NO')
  +'  '+dataOk
  +'  '+sex
  +'  '+excelDateToJSDate(requestDat)
  );
  */

  var fioCount = aFio.length;
  var fioIndex = Math.floor(Math.random() * fioCount - 1) + 1;

  //console.log('fioCount: ' + fioCount + ' fioIndex: ' + fioIndex);

  var client = {
    client: {
      "stateCode": "" + dataOk,
      "residency": "1",
      "name": aFio[fioIndex].lastName + ' ' + aFio[fioIndex].firstName + ' ' + aFio[fioIndex].fatherName, //  "Василенко Марина Юріївна",
      "individuals": {
        "firstName": aFio[fioIndex].firstName,
        "lastName": aFio[fioIndex].lastName,
        "fatherName": aFio[fioIndex].fatherName,
        "gender": "" + gender,
        "birthDay": excelDateToJSDate(requestDat),
        "marriageStatus": "6"
      }
    }
  };

  return client;


}

var requestRef;
var requestAmo;
var requestSex;
/*
printIPN('3076283489');
printIPN('3005212296');
printIPN('2588006534');
*/
console.log();
for (var i = 0; i < 10; i++) {

  requestDat = Math.floor(Math.random() * 20000) + 20000;
  requestAmo = Math.floor(Math.random() * 100) + 100;
  requestSex = Math.floor(Math.random() * 10 - 1) + 1;
  requestKey = Math.floor(Math.random() * 10 - 1) + 1;

  var min = 4;
  var max = 5;
  var random = Math.floor(Math.random() * (+max - +min)) + +min;

  var data = '' + requestDat + requestAmo + requestSex + requestKey;

  var cli = printIPN(data);
  console.log(cli);

}



/*

var stateCode = msg.clientIn.stateCode;
var clientDoc = msg.clientIn.clientDoc;
var clientId  = msg.clientIn.clientId;
var data = {
	client: {
		stateCode: stateCode,
		clientId: clientId,
		clientDoc: clientDoc,
		residency: "1",
		name: "Тролебузина	Снандулия	Аврора",
		individuals: {
			firstName: "Снандулия",
			lastName: "Тролебузина",
			fatherName: "Аврора",
			gender: "2",
			birthDay: "2088-08-29T00:00:00",
			//birthSurname: "Селіванова",
			marriageStatus: "2"
		}/*,
		documents: [
			{
				typeId: "35",
				typeCode: "[СПД,ФО]Паспорт",
				fileName: "paszport.jpg",
				content: msg.pass
			},
			{
				typeId: "35",
				typeCode: "[СПД,ФО]Паспорт",
				fileName: "paszport2.jpg",
				content: msg.pass
			},
		    {
				typeId: "30",
				typeCode: "[ФО,СПД]Фотография",
				fileName: "face.jpg",
			    //comment : "Фоточка",
				content: msg.docx
			}

	}
};

data = {
	client: {
		"stateCode": "3054025805",
		"residency": "1",
		"name": "Василенко Марина Юріївна",
		"individuals": {
			"firstName": "Марина",
			"lastName": "Василенко",
			"fatherName": "Юріївна",
			"gender": "2",
			"birthDay": "1983-08-13T00:00:00",
			"marriageStatus": "6"
		}
	}
};




id	Name
30	[ФО,СПД]Фотография
35	[СПД,ФО]Паспорт
36	[ЮО,СПД,ФО]Документ, що підтверджує реєстрацію у органі Пенсійного фонду України
37	[ЮО,СПД,ФО]Документ, що підтверджує взяття на облік в органі ДПС (довідка 4-ОПП)
45	[СПД,ФО]Ідентифікаційний код
47	[ФО]Картка зі зразками підписів
48	[ФО]Свідоцтва про право на зайняття нот. або адвокат.діяльністю
49	[ЮО,СПД,ФО]Заява на відкриття поточного рахунку (встановленого зразка)
51	[ЮО,СПД,ФО] Опитувальник
54	[ЮО,СПД,ФО]Свідоцтво про сплату податку
57	[ФО]Довіреність
58	[ФО]Інші документи

code	name	value	Description
PVBKI_Subject_gender	Стать.	1	Чоловіча
PVBKI_Subject_gender	Стать.	2	Жіноча

PVBKI_Subject_maritalStatus	Сімейне положення.	1	Неодружений(-на)
PVBKI_Subject_maritalStatus	Сімейне положення.	2	Одружений (-на)
PVBKI_Subject_maritalStatus	Сімейне положення.	3	Розлучений (-на)
PVBKI_Subject_maritalStatus	Сімейне положення.	4	Вдова (-ець)
PVBKI_Subject_maritalStatus	Сімейне положення.	5	В громадянскьму шлюбі
PVBKI_Subject_maritalStatus	Сімейне положення.	6	Невизначено

*/
