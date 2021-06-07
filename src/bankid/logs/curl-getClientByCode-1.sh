#REM msg.payload = {};
#REM msg.headers = {};
#REM msg.headers['x-auth-token'] = 'PTzQlEIYZVslkOyzKh41cJCfJCSuhJJ8';
#REM msg.headers['x-get-pathto'] = 'scrooge/webbank/getDataReferenceValues';
#REM msg.headers['x-get-method'] = 'getDataReferenceValues';
#REM msg.headers['x-get-params'] = 'catalogCode=D08';
#REM  ext-dev-api
#REM scrooge/webbank/getDataReferenceValuesgetDataReferenceValues?catalogCode=D08
#REM scrooge/webbank/getDataReferenceValues?catalogCode=D08

usage () {
    echo "$0 DEV|PRO INN"
}

INN="2949404835"
DIR="DEV"
[ $# -eq 0 ] && { usage; exit 1; }
[ $# -gt 0 ] && { DIR=$1; }
[ $# -gt 1 ] && { INN=$2; }

URL="https://nr-clients.dev.ukrgasaws.com/webbank/clients/bankid/inn"
[[ "$DIR" == "PRO" ]] && { URL="https://nr-clients.ukrgasaws.com/webbank/clients/bankid/inn"; }
echo "$0 $DIR $INN $URL"
curl -XPOST \
-H "Content-type:application/json" \
-H "x-auth-token:PTzQlEIYZVslkOyzKh41cJCfJCSuhJJ8" \
-d "{\"inn\" : \"$INN\"}" \
$URL 2>/dev/null \
| jq "."

