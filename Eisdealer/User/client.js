"use strict";
var EisdealerUser;
(function (EisdealerUser) {
    let eis;
    let isLoggedIn = false;
    let url = "http://localhost:8100";
    let personalData;
    let kugelcounter = 1;
    // Init wird beim Start aufgerufen
    init();
    async function init() {
        await getIceData("eis.json");
        buildPage();
        createEvents();
        loadDefaultIce();
    }
    function createEvents() {
        hndClear();
        document.getElementById("addToOrder").addEventListener("click", hndAddToOrder);
        document.getElementById("plus").addEventListener("click", hndAddIce);
        document.getElementById("res").addEventListener("click", hndResetIce);
        document.getElementById("login").addEventListener("click", hndLogin);
        document.getElementById("send").addEventListener("click", sendOrder);
        document.getElementById("iceSelect").addEventListener("change", hndSelect);
        let radios = document.querySelectorAll("input[type=radio]");
        radios.forEach(radio => { radio.addEventListener("change", hndRadio); });
        let checks = document.querySelectorAll("input[type=checkbox]");
        checks.forEach(check => { check.addEventListener("change", hndCheckbox); });
    }
    //Seitenaufbau
    function buildPage() {
        let div = document.getElementById("kugelDiv");
        let h1 = document.createElement("h3");
        div.insertBefore(h1, div.firstChild);
        h1.innerHTML = "Wählen sie Anzahl und Sorte der Kugeln:";
        let div1 = document.getElementById("kugeln");
        let select = document.createElement("select");
        select.setAttribute("id", "iceSelect");
        select.setAttribute("name", "kugeln");
        select.setAttribute("class", "selector");
        eis.kugeln.forEach(element => {
            let option = document.createElement("option");
            option.setAttribute("value", element.toLowerCase());
            option.innerHTML = element;
            select.appendChild(option);
        });
        div1.appendChild(select);
        let div2 = document.getElementById("toppingDiv");
        let h2 = document.createElement("h3");
        div2.appendChild(h2);
        h2.innerHTML = "Wählen sie ihre Verpackung:";
        eis.topping.forEach(element => {
            let label = document.createElement("label");
            label.setAttribute("for", element.toLowerCase());
            let input = document.createElement("input");
            input.setAttribute("type", "checkbox");
            input.setAttribute("name", "topping");
            input.setAttribute("value", element.toLowerCase());
            label.appendChild(input);
            let span = document.createElement("span");
            span.innerHTML = element;
            label.appendChild(span);
            div2.appendChild(label);
        });
        let div3 = document.getElementById("behälterDiv");
        let h3 = document.createElement("h3");
        div3.appendChild(h3);
        h3.innerHTML = "Wählen sie ihre Verpackung:";
        eis.behälter.forEach(element => {
            let label = document.createElement("label");
            label.setAttribute("for", element.toLowerCase());
            let input = document.createElement("input");
            input.setAttribute("type", "radio");
            input.setAttribute("name", "behaelter");
            input.setAttribute("value", element.toLowerCase());
            if (element == "Waffel")
                input.setAttribute("checked", "checked");
            label.appendChild(input);
            let span = document.createElement("span");
            span.innerHTML = element;
            label.appendChild(span);
            div3.appendChild(label);
        });
    }
    //Speichert ein erstelltes Eis bei Knopfdruck im Localstorage(Warenkorb/Bestellung) ab
    function hndAddToOrder() {
        let formData1 = new FormData(document.forms[0]);
        let list = Array.from(formData1.values());
        let preis = list.length;
        let preisinput = document.getElementById("preis");
        preisinput.setAttribute("value", "" + preis);
        let formData = new FormData(document.forms[0]);
        let jsonData = JSON.stringify(Object.fromEntries(formData.entries()));
        console.log(jsonData);
        console.log(formData.entries.length);
        // tslint:disable-next-line: no-any
        let query = new URLSearchParams(formData);
        if (localStorage.length == 0)
            localStorage.setItem("query", "$$?" + query.toString());
        else {
            let querystring = localStorage.getItem("query");
            querystring += "$$?" + query;
            localStorage.setItem("query", querystring);
        }
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
            eis.kugeln.forEach(element => {
                let option = document.createElement("option");
                option.setAttribute("value", element.toLowerCase());
                option.innerHTML = element;
                kugel.appendChild(option);
            });
            div.appendChild(kugel);
            let anzeige = document.getElementById("eisanzeige");
            let defaultEis = document.createElement("img");
            defaultEis.setAttribute("src", image(eis.kugeln[0]));
            defaultEis.setAttribute("id", "k" + kugelcounter);
            defaultEis.setAttribute("class", "kugel");
            defaultEis.setAttribute("alt", "Eiskugel");
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
        eisbilder[kugelnummer].setAttribute("src", image(select.value));
    }
    //Zeigt je nach Auswahl des Radios den Behälter an
    function hndRadio(_event) {
        let radio = _event.target;
        let behälterbild = document.querySelector(".behälter");
        behälterbild.setAttribute("src", image(radio.value));
        behälterbild.setAttribute("id", radio.value);
    }
    //Zeigt je nach auswahl der Checkbox das jeweilige Topping an oder entfernt es
    function hndCheckbox(_event) {
        let check = _event.target;
        if (check.checked) {
            let topping = document.createElement("img");
            let anzeige = document.getElementById("eisanzeige");
            topping.setAttribute("id", check.value);
            topping.setAttribute("src", image(check.value));
            topping.setAttribute("alt", check.value);
            anzeige.appendChild(topping);
        }
        else {
            let topping = document.getElementById(check.value);
            topping.parentNode.removeChild(topping);
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
            allSelects[i].parentNode.removeChild(allSelects[i]);
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
            knopf.parentNode.appendChild(a);
            isLoggedIn = true;
        }
    }
    //sendet Bestellung an den Server
    async function sendOrder() {
        if (!isLoggedIn)
            alert("Bitte Lieferdaten Eingaben");
        else {
            let order = localStorage.getItem("query");
            console.log(personalData);
            console.log(order);
            await communicate(url + "/send" + personalData + order);
            alert("Ihre Bestellung war erfolgreich!");
        }
    }
    //Kommuniziert mit dem Server
    async function communicate(_url) {
        let response = await fetch(_url);
        console.log(response);
    }
    //lädt Eisdaten aus JSON
    async function getIceData(_url) {
        let response = await fetch(_url);
        let rückgabe = await response.json();
        eis = JSON.parse(JSON.stringify(rückgabe));
    }
    //liefert link zum Bild
    function image(s) {
        return "images/" + s.toLowerCase() + ".png";
    }
    //lädt Defaultoptionen des Eises und zeigt diese an
    function loadDefaultIce() {
        let anzeige = document.getElementById("eisanzeige");
        while (anzeige.firstChild) {
            anzeige.removeChild(anzeige.lastChild);
        }
        let defaultBehälter = document.createElement("img");
        let defaultEis = document.createElement("img");
        defaultBehälter.setAttribute("src", image(eis.behälter[0]));
        defaultBehälter.setAttribute("class", "behälter");
        defaultBehälter.setAttribute("id", eis.behälter[0].toLowerCase());
        defaultBehälter.setAttribute("alt", eis.behälter[0]);
        defaultEis.setAttribute("src", image(eis.kugeln[0]));
        defaultEis.setAttribute("class", "kugel");
        defaultEis.setAttribute("id", "k1");
        defaultEis.setAttribute("alt", eis.kugeln[0]);
        anzeige.appendChild(defaultBehälter);
        anzeige.appendChild(defaultEis);
        kugelcounter = 1;
    }
})(EisdealerUser || (EisdealerUser = {}));
//# sourceMappingURL=client.js.map