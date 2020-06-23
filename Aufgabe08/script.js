"use strict";
var Aufgabe08;
(function (Aufgabe08) {
    let button = document.getElementById("senden");
    button.addEventListener("click", hndClick);
    function hndClick(_event) {
        let formData = new FormData(document.forms[0]);
        let url = "https://fabiankowatschgis.herokuapp.com";
        let query = new URLSearchParams(formData);
        url = url + "?" + query.toString();
        communicate(url);
    }
    async function communicate(_url) {
        let response = await fetch(_url);
        let responsestring = await response.text();
        console.log("Antwort: " + responsestring);
    }
})(Aufgabe08 || (Aufgabe08 = {}));
//# sourceMappingURL=script.js.map