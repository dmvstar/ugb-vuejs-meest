#!/bin/sh

curl -v -XGET \
-H "Content-type:application/json" \
-H "x-auth-token:PTzQlEIYZVslkOyzKh41cJCfJCSuhJJ8" \
-H "x-get-geturl:https://nr-clients.dev.ukrgasaws.com/" \
-H "x-get-pathto:scrooge/webbank/dictionary/" \
-H "x-get-method:data_refs_values" \
-H "x-get-params:catalogCode=KL_K030.DBF" \
https://nr-gateway.dev.ukrgasaws.com/9118aabf34299ead9f57921edb7c8209/


#var atoken = msg.payload.atoken;
#var geturl = msg.payload.geturl;
#var pathto = msg.payload.pathto;
#var method = msg.payload.method;
#var params = msg.payload.params;

