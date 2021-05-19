        fetch(realUrl, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));


        fetch(realUrl, requestOptions)
            .then(response => {response.text();})
            .then(result => { console.log(result);} )
            .catch(error => { console.log('error', error);});


Postman
1)
Req
https://kv-v-webpl-pp1.ukrgas.bank.local/Lime.WebPlatform.Ugb/api/v1/Treaty/cards/{{PAN}}?requestRef={{RequestId}}&processMode=sync
Res
{
    "data": {
        "cardId": 3843344,
        "cardState": "ADOPTED IN BRANCH"
    },
    "status": "Success",
    "processRef": "ff3977a0-9478-407a-9492-881c5366c493",
    "requestRef": "1621451449674"
}

2)
Req
https://kv-v-webpl-pp1.ukrgas.bank.local/Lime.WebPlatform.Ugb/api/v1/Treaty/preissued
{
  "data": {
    "cardId": {{CardId}},
    "clientId": 1469692,
    "packetCode": "EKO-Hamanets",
    "branchCode": "BRANCHID",
    "currencyTag": ""
  },
  "requestRef": "{{RequestId}}",
  "processMode": "sync"
}
Res
{
    "data": {
        "treatyId": 17436543,
        "treatyCode": "2021/PCK/000-000386"
    },
    "status": "Success",
    "processRef": "7594b1bc-c43c-43fc-aeb0-0b1247ebc612",
    "requestRef": "1621451708867"
}

