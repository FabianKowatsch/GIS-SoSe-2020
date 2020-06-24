"use strict";
var Aufgabe09;
(function (Aufgabe09) {
    let button = document.getElementById("senden");
    button.addEventListener("click", hndClick);
    function hndClick(_event) {
        let formData = new FormData(document.forms[0]);
        let url = "http://localhost:8100";
        let query = new URLSearchParams(formData);
        url = url + "?" + query.toString();
        communicate(url);
    }
    async function communicate(_url) {
        let response = await fetch(_url);
        let responsestring = await response.text();
        console.log("Antwort: " + responsestring);
    }
})(Aufgabe09 || (Aufgabe09 = {}));
//# sourceMappingURL=client.js.map