import fetch from 'node-fetch';
//
let x = await fetch("https://get.cbord.com/wpi/full/food_merchant.php?ID=014fef42-dd08-4799-88a0-487c402481b4", {
    "headers": {
        "cookie": "",
    },
    "method": "GET"
});

let html = await x.text();


let menu = await fetch("https://get.cbord.com/wpi/full/menu.php", {
    "headers": {
        "cookie": "AWSELBCORS=95F71BEB1851E28EB0CC1461768351FDE0992944B0690494FDE817311D30830757A63723EB7285B5F246AF3CA03050ADBB46AFC2189F10D6CA9DB6C8E7C8AB16EBC004FB0F; PHPSESSID=eutk2qunuvr14702evhisod5b6",
    },
    "body": "formToken=6206fa43231a04.59465450&due_time=",
    "method": "POST"
});

console.log(await menu.text());
