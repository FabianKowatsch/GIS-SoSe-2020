"use strict";
var Eisdealer;
(function (Eisdealer) {
    window.addEventListener("load", hndClear);
    document.getElementById("add")?.addEventListener("click", hndAddToOrder);
    document.getElementById("plus")?.addEventListener("click", hndAddIce);
    document.getElementById("res")?.addEventListener("click", hndResetIce);
    document.getElementById("login")?.addEventListener("click", hndLogin);
    document.getElementById("send")?.addEventListener("click", sendOrder);
    document.getElementById("iceSelect")?.addEventListener("change", hndSelect);
    let radios = document.querySelectorAll("input[type=radio]");
    radios.forEach(radio => { radio.addEventListener("change", hndRadio); });
    let checks = document.querySelectorAll("input[type=checkbox]");
    checks.forEach(check => { check.addEventListener("change", hndCheckbox); });
    let isLoggedIn = false;
    let url = "http://localhost:8200";
    let personalData;
    let kugelcounter = 1;
    //Speichert ein erstelltes Eis bei Knopfdruck im Localstorage(Warenkorb/Bestellung) ab
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
    //Fügt dem DOM eine Selektoption zu, die eine Eiskugel repräsentiert
    function hndAddIce() {
        if (kugelcounter < 4) {
            kugelcounter++;
            let div = document.getElementById("kugeln");
            let kugel = document.createElement("select");
            kugel.addEventListener("change", hndSelect);
            kugel.setAttribute("name", "kugeln");
            kugel.setAttribute("id", "" + kugelcounter);
            kugel.setAttribute("class", "selector");
            let option1 = document.createElement("option");
            let option2 = document.createElement("option");
            let option3 = document.createElement("option");
            let option4 = document.createElement("option");
            let option5 = document.createElement("option");
            option1.setAttribute("value", "vanille");
            option2.setAttribute("value", "erdbeere");
            option3.setAttribute("value", "schokolade");
            option4.setAttribute("value", "zitrone");
            option5.setAttribute("value", "himbeere");
            option1.innerHTML = "Vanille";
            option2.innerHTML = "Erdbeere";
            option3.innerHTML = "Schokolade";
            option4.innerHTML = "Zitrone";
            option5.innerHTML = "Himbeere";
            div.appendChild(kugel);
            kugel.appendChild(option1);
            kugel.appendChild(option2);
            kugel.appendChild(option3);
            kugel.appendChild(option4);
            kugel.appendChild(option5);
            let anzeige = document.getElementById("eisanzeige");
            let defaultEis = document.createElement("img");
            defaultEis.setAttribute("src", "Images/vanille.png");
            defaultEis.setAttribute("id", "k" + kugelcounter);
            defaultEis.setAttribute("class", "kugel");
            anzeige.appendChild(defaultEis);
        }
        else
            alert("Es können maximal 4 Kugeln ausgewählt werden");
    }
    //zeigt die richtige Eissorte an
    function hndSelect(_event) {
        let select = _event.target;
        let aktuellekugel = select.id;
        let kugelnummer;
        if (aktuellekugel == "iceSelect")
            kugelnummer = 0;
        else
            kugelnummer = parseInt(aktuellekugel) - 1;
        let eisbilder = document.querySelectorAll(".kugel");
        switch (select.value) {
            case "vanille":
                eisbilder[kugelnummer].setAttribute("src", "Images/vanille.png");
                break;
            case "erdbeere":
                eisbilder[kugelnummer].setAttribute("src", "Images/erdbeere.png");
                break;
            case "schokolade":
                eisbilder[kugelnummer].setAttribute("src", "Images/schokolade.png");
                break;
            case "himbeere":
                eisbilder[kugelnummer].setAttribute("src", "Images/himbeere.png");
                break;
            case "zitrone":
                eisbilder[kugelnummer].setAttribute("src", "Images/zitrone.png");
                break;
            default:
                break;
        }
    }
    //Zeigt je nach Auswahl des Radios den Behälter an
    function hndRadio(_event) {
        let radio = _event.target;
        let behälterbild = document.querySelector(".behälter");
        switch (radio.value) {
            case "waffel":
                behälterbild.setAttribute("src", "Images/eistüte.png");
                behälterbild.setAttribute("id", "waffel");
                break;
            case "becher":
                behälterbild.setAttribute("src", "Images/eisbecher.png");
                behälterbild.setAttribute("id", "becher");
                break;
            default:
                break;
        }
    }
    //Zeigt je nach auswahl der Checkbox das jeweilige Topping an oder entfernt es
    function hndCheckbox(_event) {
        let check = _event.target;
        if (check.checked) {
            let topping = document.createElement("img");
            let anzeige = document.getElementById("eisanzeige");
            topping.setAttribute("id", check.value);
            switch (check.value) {
                case "sauce":
                    topping.setAttribute("src", "Images/schoko.png");
                    break;
                case "schokoflocken":
                    topping.setAttribute("src", "Images/schokoflocken.png");
                    break;
                case "streusel":
                    topping.setAttribute("src", "Images/streusel.png");
                    break;
            }
            anzeige.appendChild(topping);
        }
        else {
            let topping = document.getElementById(check.value);
            topping.parentNode?.removeChild(topping);
        }
    }
    // löscht Eis aus der Anzeige und aus dem localstorage
    function hndClear() {
        localStorage.clear();
        loadDefaultIce();
    }
    //setzt gerade erstelltes Eis zurück
    function hndResetIce() {
        let create = document.forms[0];
        create.reset();
        let allSelects = document.querySelectorAll("select");
        for (let i = allSelects.length - 1; i > 0; i--) {
            allSelects[i].parentNode?.removeChild(allSelects[i]);
        }
        loadDefaultIce();
    }
    // loggt den Benutzer ein, sodass seine Bestellung versendet werden kann
    function hndLogin(_event) {
        let formData = new FormData(document.forms[1]);
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
    //sendet Bestellung an den Server
    async function sendOrder() {
        if (!isLoggedIn)
            alert("Bitte Lieferdaten Eingaben");
        else {
            let order = localStorage.getItem("query");
            await communicate(url + "/send" + personalData + order);
            alert("Ihre Bestellung war erfolgreich!");
        }
    }
    //Kommuniziert mit dem Server
    async function communicate(_url) {
        let response = await fetch(_url);
        console.log(response);
    }
    //lädt Defaultoptionen des Eises und zeigt diese an
    function loadDefaultIce() {
        let anzeige = document.getElementById("eisanzeige");
        while (anzeige.firstChild) {
            anzeige.removeChild(anzeige.lastChild);
        }
        let defaultBehälter = document.createElement("img");
        let defaultEis = document.createElement("img");
        defaultBehälter.setAttribute("src", "Images/eistüte.png");
        defaultBehälter.setAttribute("class", "behälter");
        defaultBehälter.setAttribute("id", "waffel");
        defaultEis.setAttribute("src", "Images/vanille.png");
        defaultEis.setAttribute("class", "kugel");
        defaultEis.setAttribute("id", "k1");
        anzeige.appendChild(defaultBehälter);
        anzeige.appendChild(defaultEis);
        kugelcounter = 1;
    }
})(Eisdealer || (Eisdealer = {}));
//# sourceMappingURL=client3.js.map