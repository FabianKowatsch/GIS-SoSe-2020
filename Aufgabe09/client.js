"use strict";
var Aufgabe09;
(function (Aufgabe09) {
    document.getElementById("sendhtml")?.addEventListener("click", hndHTML);
    document.getElementById("sendjson")?.addEventListener("click", hndJSON);
    let antwort;
    async function hndHTML(_event) {
        let formData = new FormData(document.forms[0]);
        let url = "http://localhost:8200/html";
        let query = new URLSearchParams(formData);
        url = url + "?" + query.toString();
        await communicate(url);
        document.getElementById("antwort").innerHTML = antwort;
    }
    async function hndJSON(_event) {
        let formData = new FormData(document.forms[0]);
        let url = "http://localhost:8200/json";
        let query = new URLSearchParams(formData);
        url = url + "?" + query.toString();
        await communicate(url);
        let ausgabe = JSON.parse(antwort);
        console.log(ausgabe);
    }
    async function communicate(_url) {
        let response = await fetch(_url);
        let responsestring = await response.text();
        antwort = responsestring;
    }
})(Aufgabe09 || (Aufgabe09 = {}));
//# sourceMappingURL=client.js.map