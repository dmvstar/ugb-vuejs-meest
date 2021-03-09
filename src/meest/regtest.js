//https://regex101.com/r/QiUlSp/1
//https://learn.javascript.ru/regular-expressions

var s = ['вул.Хрисчатик. ..     ',
'вул. Бобкіна-Окт. ..     ',
'вул Заводская. ..     ',
'пр.       Обломова. ..     ',
'просп. Победный ..     ',
'тупік Крайний. ..     ',
'вул Невідома',
'вулНевідома'
]

for(var o of s) {
    var rex = new RegExp(/^.*?(\.\s|\s|\.)/gm);
    if(rex.test(o)) 
    {
        var match = o.match(rex);
        console.log(rex.test(o), match, o.split(rex)[2].trim());
    }    
}

Вопрос о однозначном поиске городов и улиц с учетом переименований

Мы столкнулись с проблемой когда по фильтрам мы получаем набор данных 
1 Города
При фильтре 
{
    "cityDescr": "Дніпро%",
    "regionID": "d15e301b-60b0-11de-be1e-0030485903e8",
    "countryID": "c35b6195-4ea3-11de-8591-001d600938f8"
}
Мы получаем
[
    {
        "cityID": "50c5951b-749b-11df-b112-00215aee3ebe",
        "cityKATUU": "1210100000",
        "cityDescr": {
            "descrUA": "Дніпро",
            "descrRU": "Днепр",
            "descrEN": "Dnipro"
        },
        "districtID": "d00d3b5d-41b9-11df-907f-00215aee3ebe",
        "districtDescr": {
            "descrUA": "Дніпро (місто)",
            "descrRU": "Днепро (город)",
            "descrEN": "Dnipro (misto)"
        },
        "regionID": "d15e301b-60b0-11de-be1e-0030485903e8",
        "regionDescr": {
            "descrUA": "ДНІПРОПЕТРОВСЬКА",
            "descrRU": "ДНЕПРОПЕТРОВСКАЯ",
            "descrEN": "DNIPROPETROVS`KA"
        },
        "countryID": "c35b6195-4ea3-11de-8591-001d600938f8",
        "isBranchInCity": true,
        "deliveryZone": "1",
        "deliveryDays": {
            "Mon": true,
            "Tue": true,
            "Wed": true,
            "Thu": true,
            "Fri": true,
            "Sat": true,
            "Sun": false
        },
        "latitude": 48.464041,
        "longitude": 35.023355
    },
    {
        "cityID": "50c5950b-749b-11df-b112-00215aee3ebe",
        "cityKATUU": "1221486203",
        "cityDescr": {
            "descrUA": "Дніпрове",
            "descrRU": "Днепровое",
            "descrEN": "Dniprove"
        },
        "districtID": "6b07f886-41b9-11df-907f-00215aee3ebe",
        "districtDescr": {
            "descrUA": "Дніпровський",
            "descrRU": "Днепрвский",
            "descrEN": "Dniprovskyi"
        },
        "regionID": "d15e301b-60b0-11de-be1e-0030485903e8",
        "regionDescr": {
            "descrUA": "ДНІПРОПЕТРОВСЬКА",
            "descrRU": "ДНЕПРОПЕТРОВСКАЯ",
            "descrEN": "DNIPROPETROVS`KA"
        },
        "countryID": "c35b6195-4ea3-11de-8591-001d600938f8",
        "isBranchInCity": false,
        "deliveryZone": "2",
        "deliveryDays": {
            "Mon": false,
            "Tue": false,
            "Wed": true,
            "Thu": false,
            "Fri": false,
            "Sat": false,
            "Sun": false
        },
        "latitude": 48.335275,
        "longitude": 35.142381
    },
    {
        "cityID": "50c5950d-749b-11df-b112-00215aee3ebe",
        "cityKATUU": "1221884707",
        "cityDescr": {
            "descrUA": "Дніпровка",
            "descrRU": "Днепровка",
            "descrEN": "Dniprovka"
        },
        "districtID": "903ccaa5-41b9-11df-907f-00215aee3ebe",
        "districtDescr": {
            "descrUA": "Криворізький",
            "descrRU": "Криворожский",
            "descrEN": "Kryvorizkyi"
        },
        "regionID": "d15e301b-60b0-11de-be1e-0030485903e8",
        "regionDescr": {
            "descrUA": "ДНІПРОПЕТРОВСЬКА",
            "descrRU": "ДНЕПРОПЕТРОВСКАЯ",
            "descrEN": "DNIPROPETROVS`KA"
        },
        "countryID": "c35b6195-4ea3-11de-8591-001d600938f8",
        "isBranchInCity": false,
        "deliveryZone": "2",
        "deliveryDays": {
            "Mon": false,
            "Tue": false,
            "Wed": true,
            "Thu": false,
            "Fri": false,
            "Sat": false,
            "Sun": false
        },
        "latitude": 47.935249,
        "longitude": 33.572908
    },
    {
        "cityID": "50c59512-749b-11df-b112-00215aee3ebe",
        "cityKATUU": "1221084401",
        "cityDescr": {
            "descrUA": "Дніпровокам`янка",
            "descrRU": "Днепровокаменка",
            "descrEN": "Dniprovokamianka"
        },
        "districtID": "4ffc4bcc-41b9-11df-907f-00215aee3ebe",
        "districtDescr": {
            "descrUA": "Верхньодніпровський",
            "descrRU": "Верхнеднепровский",
            "descrEN": "Verkhnodniprovskyi"
        },
        "regionID": "d15e301b-60b0-11de-be1e-0030485903e8",
        "regionDescr": {
            "descrUA": "ДНІПРОПЕТРОВСЬКА",
            "descrRU": "ДНЕПРОПЕТРОВСКАЯ",
            "descrEN": "DNIPROPETROVS`KA"
        },
        "countryID": "c35b6195-4ea3-11de-8591-001d600938f8",
        "isBranchInCity": false,
        "deliveryZone": "2",
        "deliveryDays": {
            "Mon": false,
            "Tue": false,
            "Wed": true,
            "Thu": false,
            "Fri": false,
            "Sat": true,
            "Sun": false
        },
        "latitude": 48.795315,
        "longitude": 34.018921
    },
    {
        "cityID": "50c59513-749b-11df-b112-00215aee3ebe",
        "cityKATUU": "1221055400",
        "cityDescr": {
            "descrUA": "Дніпровське",
            "descrRU": "Днепровское",
            "descrEN": "Dniprovske"
        },
        "districtID": "4ffc4bcc-41b9-11df-907f-00215aee3ebe",
        "districtDescr": {
            "descrUA": "Верхньодніпровський",
            "descrRU": "Верхнеднепровский",
            "descrEN": "Verkhnodniprovskyi"
        },
        "regionID": "d15e301b-60b0-11de-be1e-0030485903e8",
        "regionDescr": {
            "descrUA": "ДНІПРОПЕТРОВСЬКА",
            "descrRU": "ДНЕПРОПЕТРОВСКАЯ",
            "descrEN": "DNIPROPETROVS`KA"
        },
        "countryID": "c35b6195-4ea3-11de-8591-001d600938f8",
        "isBranchInCity": true,
        "deliveryZone": "2",
        "deliveryDays": {
            "Mon": false,
            "Tue": false,
            "Wed": true,
            "Thu": false,
            "Fri": false,
            "Sat": true,
            "Sun": false
        },
        "latitude": 48.591765,
        "longitude": 34.450517
    },
    {
        "cityID": "50c59514-749b-11df-b112-00215aee3ebe",
        "cityKATUU": "1225055104",
        "cityDescr": {
            "descrUA": "Дніпровське",
            "descrRU": "Днепровское",
            "descrEN": "Dniprovske"
        },
        "districtID": "5d3112a6-41b9-11df-907f-00215aee3ebe",
        "districtDescr": {
            "descrUA": "Солонянський",
            "descrRU": "Солонянский",
            "descrEN": "Solonianskyi"
        },
        "regionID": "d15e301b-60b0-11de-be1e-0030485903e8",
        "regionDescr": {
            "descrUA": "ДНІПРОПЕТРОВСЬКА",
            "descrRU": "ДНЕПРОПЕТРОВСКАЯ",
            "descrEN": "DNIPROPETROVS`KA"
        },
        "countryID": "c35b6195-4ea3-11de-8591-001d600938f8",
        "isBranchInCity": false,
        "deliveryZone": "2",
        "deliveryDays": {
            "Mon": false,
            "Tue": false,
            "Wed": false,
            "Thu": true,
            "Fri": false,
            "Sat": false,
            "Sun": false
        },
        "latitude": 48.194872,
        "longitude": 34.819311
    },
    {
        "cityID": "cdc44f3e-dde8-11df-9197-00215aee3ebe",
        "cityKATUU": "1224888502",
        "cityDescr": {
            "descrUA": "Дніпровське",
            "descrRU": "Днепровское",
            "descrEN": "Dniprovske"
        },
        "districtID": "903ccaaa-41b9-11df-907f-00215aee3ebe",
        "districtDescr": {
            "descrUA": "Синельниківський",
            "descrRU": "Синельниковский",
            "descrEN": "Synelnykivskyi"
        },
        "regionID": "d15e301b-60b0-11de-be1e-0030485903e8",
        "regionDescr": {
            "descrUA": "ДНІПРОПЕТРОВСЬКА",
            "descrRU": "ДНЕПРОПЕТРОВСКАЯ",
            "descrEN": "DNIPROPETROVS`KA"
        },
        "countryID": "c35b6195-4ea3-11de-8591-001d600938f8",
        "isBranchInCity": false,
        "deliveryZone": "2",
        "deliveryDays": {
            "Mon": true,
            "Tue": false,
            "Wed": true,
            "Thu": false,
            "Fri": true,
            "Sat": false,
            "Sun": false
        },
        "latitude": 48.209243,
        "longitude": 35.609972
    }
]

2 Улицы
При фильтре (убираем  [вул.] [вул] [ул] [ул.], т.к. если этого не сделать - поиск пустой)
{
    "addressDescr": "%Хрещатик%",
    "cityID": "5cb61671-749b-11df-b112-00215aee3ebe",
    "countryID": "c35b6195-4ea3-11de-8591-001d600938f8"
}
Мы получаем
[
    {
        "addressID": "681d4858-e0d2-11df-9b37-00215aee3ebe",
        "addressDescr": {
            "descrUA": "вул. Садова (Хрещатик)",
            "descrRU": "ул. Садовая",
            "descrEN": "Sadova (Khreshchatyk) st."
        },
        "cityID": "5cb61671-749b-11df-b112-00215aee3ebe"
    },
    {
        "addressID": "6e23d513-e0d2-11df-9b37-00215aee3ebe",
        "addressDescr": {
            "descrUA": "вул. Хрещатик",
            "descrRU": "ул. Крещатик",
            "descrEN": "Khreshchatyk st."
        },
        "cityID": "5cb61671-749b-11df-b112-00215aee3ebe"
    }
]

Подскажите наиболее правильный путь - как проводить поиск по данным параметрам