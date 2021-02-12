#!/home/sdv/.nvm/versions/node/v10.19.0/bin/nod

const fs = require('fs')

try {
    var data = fs.readFileSync('oreex4-in.xml', 'utf8');
    var lines = data.split('\n');
    // console.log(lines.length);
    var end = lines.length - 3;
    var cnt = 1;
    var out = "";
    var not = "";
    for (line of lines) {
        if (cnt > 2 && cnt <= end) {
            out += line;
            not += line.trim();
            if (cnt < end) 
                out += '\n';
            
            console.log(line);
        }
        cnt++;
    }
    fs.writeFileSync('oreex4-out.xml', out);
    fs.writeFileSync('oreex4-ono.xml', not);

} catch (err) {
    console.error(err)
}
