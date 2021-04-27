var inn = '55';

function t(inn) {

    var checkPass = 'inn';
    var num = '', ser = '';
    const regSD09 = "^[0-9]{9}$"
    const regSPass = "^[А-Ю][А-Ю][0-9]{6}$"
    const regD09 = new RegExp(regSD09, "gm");
    const regPass = new RegExp(regSPass, "gm");   

    if (regPass.test(inn)) {
        checkPass = 'passport';
        ser = inn.substr(0, 2);
        num = inn.substr(2);
        inn = '0000000000';
    }
    if (regD09.test(inn)) {
        checkPass = 'idpassport';
        num = inn;
        inn = '0000000000';
    }

    var ret = {
        inn: inn,
        ser: ser,
        num: num,
        pas: checkPass
    }
    return ret;
}

console.log(t('АА575678'))
console.log(t('765675439'))
console.log(t('3765675439'))
