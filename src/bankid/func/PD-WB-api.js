msg.workDir = 'LOC';
if(env.get("ENVIRONMENT") !== undefined) 
    msg.workDir = env.get("ENVIRONMENT").substring(0,3).toUpperCase();
if (msg.workDir == "PRO") {
    msg.aurl='https://kv00-v-appfe-pr/WebBank/Api/ClientApi/ModifyClientFL';
    msg.url='https://10.13.97.8/Webbank/Api/ClientApi/ModifyClientFL';
    msg.host='kv00-v-appfe-pr';
    return [msg, null];
} else if (msg.workDir == "DEV") {
    msg.urla='https://app-front-pp.ukrgasbank.com/Webbank/Api/ClientApi/ModifyClientFL';
    msg.url='https://10.13.97.10/Webbank/Api/ClientApi/ModifyClientFL';
    msg.host='app-front-pp.ukrgasbank.com';
    return [null, msg];
} 