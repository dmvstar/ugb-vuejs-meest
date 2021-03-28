#!/bin/sh

curl -XPOST \
-H "Content-type:application/json" \
-H "x-auth-token:PTzQlEIYZVslkOyzKh41cJCfJCSuhJJ80" \
-d @tercheck-1.json \
-w "%{http_code}" \
https://nr-openbanking.dev.ukrgasaws.com/openbanking/bankid/client/a_tercheck 2>/dev/null | jq


curl -XPOST \
-H "Content-type:application/json" \
-H "x-auth-token:PTzQlEIYZVslkOyzKh41cJCfJCSuhJJ8" \
-d @tercheck-1.json \
-w "%{http_code}" \
https://nr-openbanking.dev.ukrgasaws.com/openbanking/bankid/client/a_tercheck 2>/dev/null | jq



curl -XPOST \
-H "Content-type:application/json" \
-H "x-auth-token:PTzQlEIYZVslkOyzKh41cJCfJCSuhJJ8" \
-d @tercheck-2.json \
-w "%{http_code}" \
https://nr-openbanking.dev.ukrgasaws.com/openbanking/bankid/client/a_tercheck 2>/dev/null | jq

