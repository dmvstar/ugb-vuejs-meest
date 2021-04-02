var translit_maps = require('./translit-maps.json');

//console.log(translit_maps);

var example = [
    "Христина",
    "Соломія Марія",
    "Старжинський Дмитро",
    "Рибьчинськй",
    "Шевч'енк'о",
    "Уляна",
    "Іващенко",
    "Згоран",
    "Розгон",
    "Жежелів"
];

for (sname of example) {
    //console.log(sname);     
    var oname = translit(sname);
    console.log(sname, '\n\t', oname);
}

//-----------------------------------------------------
function translit(sname) {
    var out = '';
    var first = true;
    var iname = sname;
    // delete non translate char
    var amapi = translit_maps.filter(x => x.lit === "0");
    for (o of amapi) {
        var reg = new RegExp(o.ua_lit, 'g');
        iname = iname.replace(reg, o.en_lit_f);
    }
    // replace two sequence char 
    var tr = translit_maps.find(x => x.lit === "2");
    if (iname.includes(tr.ua_cap))
        iname = iname.replace(tr.ua_cap, tr.en_cap);
    if (iname.includes(tr.ua_lit))
        iname = iname.replace(tr.ua_lit, tr.en_lit_f)
    var aname = iname.split("");
    for (chr of aname) {
        var ochr = '';
        var tr_c = translit_maps.find(x => x.ua_cap === chr);
        var tr_l = translit_maps.find(x => x.ua_lit === chr);
        if (tr_c !== undefined) {
            ochr = tr_c.en_cap;
        } else {
            if (tr_l !== undefined) {
                if (first)
                    ochr = tr_l.en_lit_f;
                else
                    ochr = tr_l.en_lit_o;
            } else {
                ochr = chr;
            }
        }
        out += ochr;
        if (first) first = !first;
        if (chr === ' ') first = true;
    }
    return out;
}
//-----------------------------------------------------