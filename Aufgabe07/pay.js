"use strict";
var Aufgabe07;
(function (Aufgabe07) {
    async function communicate(_url) {
        let response = await fetch(_url);
        let rückgabe = await response.json();
        console.log("Response", response);
        Aufgabe07.liste = JSON.parse(JSON.stringify(rückgabe));
    }
    async function initPay() {
        console.log("start");
        await communicate("https://fabiankowatsch.github.io/GIS-SoSe-2020/Test/artikel.json");
        console.log("end");
        printStorage();
        buildPay();
        createPayEvents();
    }
    initPay();
    function addItemPay(i, obj) {
        let newDiv = document.createElement("div");
        newDiv.setAttribute("class", "item");
        newDiv.innerHTML = obj[i].name;
        document.getElementById("container1")?.appendChild(newDiv);
        let bild = document.createElement("img");
        bild.setAttribute("src", Aufgabe07.liste[i].bild);
        bild.setAttribute("alt", Aufgabe07.liste[i].name);
        newDiv.appendChild(bild);
        let desc = document.createElement("p");
        desc.setAttribute("class", "desc");
        desc.innerHTML = Aufgabe07.liste[i].desc;
        newDiv.appendChild(desc);
        let txt = document.createElement("p");
        txt.innerHTML = "pro Stück: ";
        newDiv.appendChild(txt);
        let preis = document.createElement("b");
        preis.setAttribute("class", "preis");
        preis.innerHTML = "" + Aufgabe07.liste[i].preis + " €";
        txt.appendChild(preis);
        let leiste = document.createElement("div");
        leiste.setAttribute("class", "leiste");
        newDiv.appendChild(leiste);
        let knopf = document.createElement("button");
        knopf.setAttribute("name", "kaufen");
        knopf.setAttribute("class", "kaufen");
        knopf.setAttribute("data-price", "" + Aufgabe07.liste[i].preis);
        knopf.setAttribute("data-index", "" + i);
        knopf.innerHTML = "+";
        leiste.appendChild(knopf);
        let anzahl = document.createElement("span");
        anzahl.setAttribute("id", "zähler");
        anzahl.setAttribute("data-counter", localStorage.getItem(i + "") + "");
        anzahl.innerHTML = localStorage.getItem(i + "") + "";
        leiste.appendChild(anzahl);
        let del = document.createElement("button");
        del.setAttribute("name", "löschen");
        del.setAttribute("class", "löschen");
        del.setAttribute("data-price", "" + Aufgabe07.liste[i].preis);
        del.setAttribute("data-index", "" + i);
        del.innerHTML = "-";
        leiste.appendChild(del);
    }
    let summe = parseInt(localStorage.getItem("summe") + "");
    function buildPay() {
        for (let i = 0; i < localStorage.length; ++i) {
            if (localStorage.key(i) != "summe") {
                let storageKey = localStorage.key(i);
                let j = parseInt(storageKey);
                addItemPay(j, Aufgabe07.liste);
            }
        }
        let gesamt = document.querySelector("#gesamtpreis");
        if (localStorage.getItem("summe") != null)
            gesamt.innerHTML = localStorage.getItem("summe") + "€";
        else
            gesamt.innerHTML = "0€";
    }
    function printStorage() {
        for (let i = 0; i < localStorage.length; ++i) {
            let storageKey = localStorage.key(i);
            console.log(storageKey + ":" + localStorage.getItem(storageKey));
        }
        console.log("______________");
    }
    function createPayEvents() {
        let allAdd = document.getElementsByClassName("kaufen");
        for (let i = 0; i < allAdd.length; i++) {
            allAdd[i].addEventListener("click", hndAdd);
        }
        let allDel = document.getElementsByClassName("löschen");
        for (let i = 0; i < allDel.length; i++) {
            allDel[i].addEventListener("click", hndDel);
        }
        let clear = document.querySelector("#clear");
        clear.addEventListener("click", hndClear);
    }
    function hndAdd(_event) {
        let gesamt = document.querySelector("#gesamtpreis");
        let from = _event.target;
        let anzahl = from.nextElementSibling;
        let prs = from.dataset.price;
        let aktuellstr = anzahl.dataset.counter;
        let aktuellid = from.dataset.index;
        let aktuellint = parseInt(aktuellstr) + 1;
        anzahl.setAttribute("data-counter", "" + aktuellint);
        summe = summe + parseInt(prs);
        localStorage.setItem("summe", summe + "");
        localStorage.setItem(aktuellid, aktuellint + "");
        anzahl.innerHTML = localStorage.getItem(aktuellid) + "";
        printStorage();
        gesamt.innerHTML = localStorage.getItem("summe") + "€";
    }
    function hndDel(_event) {
        let gesamt = document.querySelector("#gesamtpreis");
        let from = _event.target;
        let anzahl = from.previousElementSibling;
        let prs = from.dataset.price;
        let aktuellstr = anzahl.dataset.counter;
        let aktuellid = from.dataset.index;
        let aktuellint = parseInt(aktuellstr) - 1;
        if (aktuellint > -1) {
            anzahl.setAttribute("data-counter", "" + aktuellint);
            summe = summe - parseInt(prs);
            localStorage.setItem("summe", summe + "");
            localStorage.setItem(aktuellid, aktuellint + "");
            from.previousElementSibling.innerHTML = localStorage.getItem(aktuellid) + "";
            printStorage();
            gesamt.innerHTML = localStorage.getItem("summe") + "€";
        }
        else {
            localStorage.removeItem(aktuellid);
            from.parentElement?.parentElement?.setAttribute("class", "hide");
        }
    }
    function hndClear(_event) {
        localStorage.clear();
        location.reload();
        printStorage();
    }
})(Aufgabe07 || (Aufgabe07 = {}));
//# sourceMappingURL=pay.js.map