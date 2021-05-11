#!/bin/sh

curl -XPOST \
-H "Content-type:application/json" \
-d @tercheck-1.json \
-w "%{http_code}" \
https://nr-openbanking.ukrgasaws.com/api/openbanking/bankid/client 