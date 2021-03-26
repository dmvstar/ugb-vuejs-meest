#!/bin/sh

curl -XPOST \
-H "Content-type:application/json" \
-H "x-auth-token:PTzQlEIYZVslkOyzKh41cJCfJCSuhJJ8" \
-d @tercheck-1.json \
https://nr-openbanking.dev.ukrgasaws.com/openbanking/bankid/client/tercheck 2>/dev/null | jq


curl -XPOST \
-H "Content-type:application/json" \
-H "x-auth-token:PTzQlEIYZVslkOyzKh41cJCfJCSuhJJ8" \
-d @tercheck-2.json \
https://nr-openbanking.dev.ukrgasaws.com/openbanking/bankid/client/tercheck 2>/dev/null | jq

