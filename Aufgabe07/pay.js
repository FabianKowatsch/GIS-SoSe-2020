"use strict";
var Aufgabe07;
(function (Aufgabe07) {
    async function initPay() {
        console.log("start");
        await communicate("https://fabiankowatsch.github.io/GIS-SoSe-2020/Test/artikel.json");
        console.log("end");
        buildPay();
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
        let knopf = document.createElement("button");
        knopf.setAttribute("name", "kaufen");
        knopf.setAttribute("data-price", "" + Aufgabe07.liste[i].preis);
        knopf.setAttribute("data-counter", "" + localStorage.getItem(i + ""));
        knopf.setAttribute("data-index", "" + i);
        knopf.innerHTML = "Kaufen";
        newDiv.appendChild(knopf);
    }
    function buildPay() {
        for (let i = 0; i < localStorage.length; ++i) {
            let storageKey = localStorage.key(i);
            let j = parseInt(storageKey);
            addItemPay(j, Aufgabe07.liste);
        }
    }
})(Aufgabe07 || (Aufgabe07 = {}));
//# sourceMappingURL=pay.js.map