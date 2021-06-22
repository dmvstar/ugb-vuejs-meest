/**
 * @WHERE setUpdCliFlowParams.js
 * @WHAT Установка парасетров для флоу 
 */

msg.workDir = 'LOC';
if(env.get("ENVIRONMENT") !== undefined) 
    msg.workDir = env.get("ENVIRONMENT").substring(0,3).toUpperCase();

let reqs = {};

if (msg.workDir == "PRO") {
    reqs['Webbank/Api/ClientApi/ModifyClientFL'] = {
        headers : { 'Content-Type': 'application/json', 
                    'Host' : 'kv00-v-appfe-pr.ukrgas.bank.local'},
        url : 'https://10.13.97.8/Webbank/Api/ClientApi/ModifyClientFL'
    };   
    reqs['Webbank/Api/ClientApi/FindClientFL'] = {
        headers : { 'Content-Type': 'application/json', 
                    'Host' : 'app-front-pp.ukrgasbank.com'},
        url : 'https://10.13.97.8/Webbank/Api/ClientApi/FindClientFL'
    };
    reqs['api/ccs/credit/order'] = {
        headers : { 'Content-Type': 'application/json', 
                    'Host' : 'ccs.dev.ukrgasaws.com'},
        url : 'http://ccs.dev.ukrgasaws.com/api/ccs/credit/order'
    };  
} else if (msg.workDir == "DEV") {
    reqs['Webbank/Api/ClientApi/ModifyClientFL'] = {
        headers : { 'Content-Type': 'application/json', 
                    'Host' : 'app-front-pp.ukrgasbank.com'},
        url : 'https://10.13.97.10/Webbank/Api/ClientApi/ModifyClientFL'
    };   
    reqs['Webbank/Api/ClientApi/FindClientFL'] = {
        headers : { 'Content-Type': 'application/json', 
                    'Host' : 'app-front-pp.ukrgasbank.com'},
        url : 'https://10.13.97.10/Webbank/Api/ClientApi/FindClientFL'
    };          
    reqs['api/ccs/credit/order'] = {
        headers : { 'Content-Type': 'application/json', 
                    'Host' : 'ccs.dev.ukrgasaws.com'},
        url : 'http://ccs.dev.ukrgasaws.com/api/ccs/credit/order'
    };  
} 

flow.set("reqs", reqs);
msg.payload = reqs;
return msg;