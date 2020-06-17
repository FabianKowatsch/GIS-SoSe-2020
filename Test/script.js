"use strict";
async function communicate(_url) {
    let response = await fetch(_url);
    console.log("Response", response);
    let ausgabe = await response.json();
    console.log(ausgabe);
    console.log("a");
}
console.log("start");
communicate("https://hs-furtwangen.github.io/GIS-SoSe-2020/L07/testjson.json");
console.log("end");
//# sourceMappingURL=script.js.map