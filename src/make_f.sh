#!/bin/sh
cat index.html | sed 's:<script type="text/javascript" src="main.js"></script>:<script src="/public/meest/ui/main.js"></script>:' > flows/index.html
cat main.js | sed 's:var modeUrl = 1;:var modeUrl = 3;:' > flows/main.js
 