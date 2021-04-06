var amsg = [
        {out : {result: {hasErrors : "false", errors: ""}}},
        {out : {result: {hasErrors : "false", errors: "1"}}},
        {out : {result: {hasErrors : "true", errors: "1"}}},
        {out : {result: {hasErrors : "true", errors: ""}}}
    ]

for (msg of amsg){
    console.log(msg);

if( (msg.out.result.hasErrors === undefined 
        || msg.out.result.hasErrors === "false")
    && 
    (msg.out.result.errors === undefined 
        || msg.out.result.errors === "")
) 

{
    console.log("Ok");
} else {
    console.log("Error");
}

}



