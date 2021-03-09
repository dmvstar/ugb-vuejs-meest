//https://regex101.com/r/QiUlSp/1
//https://learn.javascript.ru/regular-expressions

var s = ['вул.Хрисчатик. ..     ',
'вул. Бобкіна-Окт. ..     ',
'вул Заводская. ..     ',
'пр.       Обломова. ..     ',
'просп. Победный ..     ',
'тупік Крайний. ..     ',
'вул Невідома',
'вулНевідома'
]

for(var o of s) {
    var rex = new RegExp(/^.*?(\.\s|\s|\.)/gm);
    if(rex.test(o)) 
    {
        var match = o.match(rex);
        console.log(rex.test(o), match, o.split(rex)[2].trim());
    }    
}



