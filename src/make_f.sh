#!/bin/sh
cp index.html flows/index_l.html
cat index.html | sed 's:<script type="text/javascript" src="main.js"></script>:<script src="/meestua/ui/main.js"></script>:' > flows/index_f.html
cat main.js | sed 's:var modeUrl = 1;:var modeUrl = 3;:' > flows/main.js
 