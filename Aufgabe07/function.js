"use strict";
var Aufgabe07;
(function (Aufgabe07) {
    async function communicate(_url) {
        let response = await fetch(_url);
        console.log("Response", response);
        let artikel = await response.json();
        let artArray = JSON.parse(artikel);
        console.log(artArray);
    }
    console.log("start");
    communicate("https://fabiankowatsch.github.io/GIS-SoSe-2020/Aufgabe06/artikel.json");
    console.log("end");
    //Funktion zum erstellen der Artikel
    function addItem(x, i, as) {
        let newDiv = document.createElement("div");
        newDiv.setAttribute("class", "item");
        newDiv.innerHTML = Aufgabe07.liste[i].name;
        if (x == 1) {
            document.getElementById("container1")?.appendChild(newDiv);
        }
        if (x == 2) {
            document.getElementById("container2")?.appendChild(newDiv);
        }
        if (x == 3) {
            document.getElementById("container3")?.appendChild(newDiv);
        }
        if (as && x == 2) {
            document.getElementById("ad1")?.appendChild(newDiv);
        }
        if (as && x == 3) {
            document.getElementById("ad2")?.appendChild(newDiv);
        }
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
        knopf.innerHTML = "Kaufen";
        newDiv.appendChild(knopf);
    }
    //Seitenaufbau  
    for (let i = 0; i < Aufgabe07.liste.length; i++) {
        switch (Aufgabe07.liste[i].kat) {
            case 1:
                addItem(1, i, false);
                break;
            case 2:
                addItem(2, i, false);
                break;
            case 3:
                addItem(3, i, false);
            default:
                break;
        }
        if (Aufgabe07.liste[i].ad) {
            if (Aufgabe07.liste[i].kat == 2) {
                addItem(2, i, true);
            }
            if (Aufgabe07.liste[i].kat == 3) {
                addItem(3, i, true);
            }
        }
    }
    //Event Handling
    let allButtons = document.querySelectorAll("button");
    for (let i = 0; i < allButtons.length; i++) {
        allButtons[i].addEventListener("click", hndClick);
    }
    let k1 = document.querySelector("#k1 *");
    let k2 = document.querySelector("#k2 *");
    let k3 = document.querySelector("#k3 *");
    let showall = document.querySelector("#showall *");
    k1.addEventListener("click", hndKat);
    k2.addEventListener("click", hndKat);
    k3.addEventListener("click", hndKat);
    showall.addEventListener("click", hndKat);
    //Zähler + Summe
    let zähler = 0;
    let summe = 0;
    //Funktion zum Zählen + Summe
    function hndClick(_event) {
        if (zähler == 0) {
            let cnt = document.createElement("span");
            cnt.setAttribute("id", "counter");
            document.getElementById("pay")?.appendChild(cnt);
            zähler += 1;
            cnt.innerHTML = `0${zähler}`;
            let from = _event.target;
            let prs = from.dataset.price;
            summe = summe + parseInt(prs);
            console.log(summe);
        }
        else {
            zähler += 1;
            let cnt2 = document.getElementById("counter");
            if (zähler <= 9 && zähler > 0)
                cnt2.innerHTML = `0${zähler}`;
            if (zähler > 9)
                cnt2.innerHTML = "" + zähler;
            let from = _event.target;
            let prs = from.dataset.price;
            summe = summe + parseInt(prs);
            console.log(summe);
        }
    }
    function hndKat(event) {
        let kat1 = document.querySelector("#kat1");
        let cont1 = document.querySelector("#container1");
        let kat2 = document.querySelector("#kat2");
        let cont2 = document.querySelector("#container2");
        let kat3 = document.querySelector("#kat3");
        let cont3 = document.querySelector("#container3");
        switch (event.target) {
            case k1:
                kat1.setAttribute("class", "katname");
                cont1.setAttribute("class", "container");
                kat2.setAttribute("class", "hide");
                cont2.setAttribute("class", "hide");
                kat3.setAttribute("class", "hide");
                cont3.setAttribute("class", "hide");
                break;
            case k2:
                kat1.setAttribute("class", "hide");
                cont1.setAttribute("class", "hide");
                kat2.setAttribute("class", "katname");
                cont2.setAttribute("class", "container");
                kat3.setAttribute("class", "hide");
                cont3.setAttribute("class", "hide");
                break;
            case k3:
                kat1.setAttribute("class", "hide");
                cont1.setAttribute("class", "hide");
                kat2.setAttribute("class", "hide");
                cont2.setAttribute("class", "hide");
                kat3.setAttribute("class", "katname");
                cont3.setAttribute("class", "container");
                break;
            case showall:
                kat1.setAttribute("class", "katname");
                cont1.setAttribute("class", "container");
                kat2.setAttribute("class", "katname");
                cont2.setAttribute("class", "container");
                kat3.setAttribute("class", "katname");
                cont3.setAttribute("class", "container");
                break;
            default:
                break;
        }
    }
})(Aufgabe07 || (Aufgabe07 = {}));
//# sourceMappingURL=function.js.map