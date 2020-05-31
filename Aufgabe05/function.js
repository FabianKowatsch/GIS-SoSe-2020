"use strict";
var Aufgabe05;
(function (Aufgabe05) {
    for (let i = 0; i < Aufgabe05.liste.length; i++) {
        switch (Aufgabe05.liste[i].kat) {
            case 1:
                let newDiv = document.createElement("div");
                newDiv.setAttribute("class", "item");
                newDiv.innerHTML = Aufgabe05.liste[i].name;
                document.getElementById("container1")?.appendChild(newDiv);
                let bild = document.createElement("img");
                bild.setAttribute("src", Aufgabe05.liste[i].bild);
                bild.setAttribute("alt", Aufgabe05.liste[i].name);
                newDiv.appendChild(bild);
                let desc = document.createElement("p");
                desc.setAttribute("class", "desc");
                desc.innerHTML = Aufgabe05.liste[i].desc;
                newDiv.appendChild(desc);
                let txt = document.createElement("p");
                txt.innerHTML = "pro Stück: ";
                newDiv.appendChild(txt);
                let preis = document.createElement("b");
                preis.setAttribute("class", "preis");
                preis.innerHTML = "" + Aufgabe05.liste[i].preis + " €";
                txt.appendChild(preis);
                let knopf = document.createElement("button");
                knopf.setAttribute("name", "kaufen");
                knopf.innerHTML = "Kaufen";
                newDiv.appendChild(knopf);
                break;
            case 2:
                let newDiv2 = document.createElement("div");
                newDiv2.setAttribute("class", "item");
                newDiv2.innerHTML = Aufgabe05.liste[i].name;
                document.getElementById("container2")?.appendChild(newDiv2);
                let bild2 = document.createElement("img");
                bild2.setAttribute("src", Aufgabe05.liste[i].bild);
                bild2.setAttribute("alt", Aufgabe05.liste[i].name);
                newDiv2.appendChild(bild2);
                let desc2 = document.createElement("p");
                desc2.setAttribute("class", "desc");
                desc2.innerHTML = Aufgabe05.liste[i].desc;
                newDiv2.appendChild(desc2);
                let txt2 = document.createElement("p");
                txt2.innerHTML = "pro Stück :";
                newDiv2.appendChild(txt2);
                let preis2 = document.createElement("b");
                preis2.setAttribute("class", "preis");
                preis2.innerHTML = "" + Aufgabe05.liste[i].preis + " €";
                txt2.appendChild(preis2);
                let knopf2 = document.createElement("button");
                knopf2.setAttribute("name", "kaufen");
                knopf2.innerHTML = "Kaufen";
                newDiv2.appendChild(knopf2);
                break;
            case 3:
                let newDiv3 = document.createElement("div");
                newDiv3.setAttribute("class", "item");
                newDiv3.innerHTML = Aufgabe05.liste[i].name;
                document.getElementById("container3")?.appendChild(newDiv3);
                let bild3 = document.createElement("img");
                bild3.setAttribute("src", Aufgabe05.liste[i].bild);
                bild3.setAttribute("alt", Aufgabe05.liste[i].name);
                newDiv3.appendChild(bild3);
                let desc3 = document.createElement("p");
                desc3.setAttribute("class", "desc");
                desc3.innerHTML = Aufgabe05.liste[i].desc;
                newDiv3.appendChild(desc3);
                let txt3 = document.createElement("p");
                txt3.innerHTML = "pro Stück :";
                newDiv3.appendChild(txt3);
                let preis3 = document.createElement("b");
                preis3.setAttribute("class", "preis");
                preis3.innerHTML = "" + Aufgabe05.liste[i].preis + " €";
                txt3.appendChild(preis3);
                let knopf3 = document.createElement("button");
                knopf3.setAttribute("name", "kaufen");
                knopf3.innerHTML = "Kaufen";
                newDiv3.appendChild(knopf3);
            default:
                console.log("Fehler");
                break;
        }
        if (Aufgabe05.liste[i].ad) {
            if (Aufgabe05.liste[i].kat == 2) {
                let newDiv = document.createElement("div");
                newDiv.setAttribute("class", "item");
                newDiv.innerHTML = Aufgabe05.liste[i].name;
                document.getElementById("ad1")?.appendChild(newDiv);
                let bild = document.createElement("img");
                bild.setAttribute("src", Aufgabe05.liste[i].bild);
                bild.setAttribute("alt", Aufgabe05.liste[i].name);
                newDiv.appendChild(bild);
                let desc = document.createElement("p");
                desc.setAttribute("class", "desc");
                desc.innerHTML = Aufgabe05.liste[i].desc;
                newDiv.appendChild(desc);
                let txt = document.createElement("p");
                txt.innerHTML = "pro Stück: ";
                newDiv.appendChild(txt);
                let preis = document.createElement("b");
                preis.setAttribute("class", "preis");
                preis.innerHTML = "" + Aufgabe05.liste[i].preis + " €";
                txt.appendChild(preis);
                let knopf = document.createElement("button");
                knopf.setAttribute("name", "kaufen");
                knopf.innerHTML = "Kaufen";
                newDiv.appendChild(knopf);
            }
            if (Aufgabe05.liste[i].kat == 3) {
                let newDiv2 = document.createElement("div");
                newDiv2.setAttribute("class", "item");
                newDiv2.innerHTML = Aufgabe05.liste[i].name;
                document.getElementById("ad2")?.appendChild(newDiv2);
                let bild2 = document.createElement("img");
                bild2.setAttribute("src", Aufgabe05.liste[i].bild);
                bild2.setAttribute("alt", Aufgabe05.liste[i].name);
                newDiv2.appendChild(bild2);
                let desc2 = document.createElement("p");
                desc2.setAttribute("class", "desc");
                desc2.innerHTML = Aufgabe05.liste[i].desc;
                newDiv2.appendChild(desc2);
                let txt2 = document.createElement("p");
                txt2.innerHTML = "pro Stück :";
                newDiv2.appendChild(txt2);
                let preis2 = document.createElement("b");
                preis2.setAttribute("class", "preis");
                preis2.innerHTML = "" + Aufgabe05.liste[i].preis + " €";
                txt2.appendChild(preis2);
                let knopf2 = document.createElement("button");
                knopf2.setAttribute("name", "kaufen");
                knopf2.innerHTML = "Kaufen";
                newDiv2.appendChild(knopf2);
            }
        }
    }
})(Aufgabe05 || (Aufgabe05 = {}));
//# sourceMappingURL=function.js.map