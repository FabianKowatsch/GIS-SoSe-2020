"use strict";
var Eisdealer;
(function (Eisdealer) {
    window.addEventListener("load", hndClearOrder);
    document.getElementById("add")?.addEventListener("click", hndAddToOrder);
    document.getElementById("plus")?.addEventListener("click", hndAddIce);
    document.getElementById("res")?.addEventListener("click", hndResetIce);
    document.getElementById("login")?.addEventListener("click", hndLogin);
    document.getElementById("send")?.addEventListener("click", sendOrder);
    let isLoggedIn = false;
    let url = "http://localhost:8200";
    let personalData;
    function hndAddToOrder() {
        let formData = new FormData(document.forms[0]);
        let jsonData = JSON.stringify(Object.fromEntries(formData.entries()));
        console.log(jsonData);
        console.log(formData.entries.length);
        // tslint:disable-next-line: no-any
        let query = new URLSearchParams(formData);
        if (localStorage.length == 0)
            localStorage.setItem("query", query.toString());
        else {
            let querystring = localStorage.getItem("query");
            querystring += "$$?" + query;
            localStorage.setItem("query", querystring);
        }
        console.log(localStorage.getItem("query"));
    }
    function hndAddIce() {
        let div = document.getElementById("kugeln");
        let kugel = document.createElement("select");
        kugel.setAttribute("name", "kugeln");
        let option1 = document.createElement("option");
        let option2 = document.createElement("option");
        let option3 = document.createElement("option");
        option1.setAttribute("value", "vanille");
        option2.setAttribute("value", "erdbeere");
        option3.setAttribute("value", "schokolade");
        option1.innerHTML = "Vanille";
        option2.innerHTML = "Erdbeere";
        option3.innerHTML = "Schokolade";
        div.appendChild(kugel);
        kugel.appendChild(option1);
        kugel.appendChild(option2);
        kugel.appendChild(option3);
    }
    function hndClearOrder() {
        localStorage.clear();
    }
    function hndResetIce() {
        let create = document.forms[0];
        create.reset();
        let allSelects = document.querySelectorAll("select");
        for (let i = allSelects.length - 1; i > 0; i--) {
            allSelects[i].parentNode?.removeChild(allSelects[i]);
        }
    }
    function hndLogin(_event) {
        let formData = new FormData(document.forms[1]);
        // tslint:disable-next-line: no-any
        let querystring = "";
        for (let value of formData.values()) {
            querystring += "" + value;
        }
        if (querystring == "") {
            alert("Bitte Lieferdaten Eingaben");
        }
        else {
            console.log(querystring);
            // tslint:disable-next-line: no-any
            let query = new URLSearchParams(formData);
            personalData = "?" + query.toString();
            document.forms[1].disabled = true;
            let knopf = _event.target;
            knopf.setAttribute("class", "hide");
            knopf.previousElementSibling.setAttribute("class", "hide");
            knopf.previousElementSibling.previousElementSibling.setAttribute("class", "hide");
            knopf.previousElementSibling.previousElementSibling.previousElementSibling.setAttribute("class", "hide");
            let a = document.createElement("div");
            a.innerHTML = "Ihre Daten wurden erfolgreich übernommen!";
            knopf.parentNode?.appendChild(a);
            isLoggedIn = true;
        }
    }
    async function sendOrder() {
        if (!isLoggedIn)
            alert("Bitte Lieferdaten Eingaben");
        else {
            let order = localStorage.getItem("query");
            await communicate(url + "/send" + personalData + order);
            alert("Ihre Bestellung war erfolgreich!");
        }
    }
    async function communicate(_url) {
        let response = await fetch(_url);
        console.log(response);
    }
})(Eisdealer || (Eisdealer = {}));
//# sourceMappingURL=client.js.map