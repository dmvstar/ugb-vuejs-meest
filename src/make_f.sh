#!/bin/sh
cat $1 | sed 's:<script type="text/javascript" src="main.js"></script>:<script src="/public/meest/ui/main.js"></script>:'
