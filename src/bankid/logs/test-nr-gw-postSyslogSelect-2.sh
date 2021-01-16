#!/bin/sh

SELECT="\
SELECT * \
    FROM public.cllogs \
    WHERE 1=1 \
    AND source like '%%' \
    AND level like '%%' \
    AND message like '%%' \
    ORDER BY ID DESC \
    LIMIT 100;"

SELECT='SELECT * FROM public.cllogs ORDER BY ID DESC LIMIT 100;'
echo "$SELECT"

BASE64=$(echo "$SELECT" | base64 -w0)
D="{\"data\": \"$BASE64\"}"
echo $D

RESULT=`curl -v -XPOST \
-H "Content-type:application/json" \
-H "x-auth-token:PTzQlEIYZVslkOyzKh41cJCfJCSuhJJ8" \
-H "x-post-geturl:https://nr-clients.dev.ukrgasaws.com/" \
-H "x-post-pathto:common/logger/clilog/" \
-H "x-post-method:select" \
-d "$D" \
https://nr-gateway.dev.ukrgasaws.com/9118aabf34299ead9f57921edb7c8209/ 2>/dev/null`

echo $RESULT | base64 -d | jq -C

exit 0

