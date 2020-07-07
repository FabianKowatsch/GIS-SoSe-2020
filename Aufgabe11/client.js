"use strict";
var Aufgabe11;
(function (Aufgabe11) {
    document.getElementById("set")?.addEventListener("click", hndSet);
    document.getElementById("get")?.addEventListener("click", hndGet);
    async function hndGet(_event) {
        let formData = new FormData(document.forms[0]);
        let url = "https://fabiankowatschgis.herokuapp.com/retrieve";
        // tslint:disable-next-line: no-any
        let query = new URLSearchParams(formData);
        url = url + "?" + query.toString();
        await communicate(url);
    }
    async function hndSet(_event) {
        let formData = new FormData(document.forms[0]);
        let url = "https://fabiankowatschgis.herokuapp.com/send";
        // tslint:disable-next-line: no-any
        let query = new URLSearchParams(formData);
        url = url + "?" + query.toString();
        await communicate(url);
    }
    async function communicate(_url) {
        let response = await fetch(_url);
        let responsestring = await response.text();
        document.getElementById("antwort").innerHTML = responsestring;
    }
})(Aufgabe11 || (Aufgabe11 = {}));
//# sourceMappingURL=client.js.map