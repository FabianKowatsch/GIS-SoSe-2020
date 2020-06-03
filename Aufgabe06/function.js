"use strict";
var Aufgabe06;
(function (Aufgabe06) {
    function addItem(x, i, as) {
        let newDiv = document.createElement("div");
        newDiv.setAttribute("class", "item");
        newDiv.innerHTML = Aufgabe06.liste[i].name;
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
        bild.setAttribute("src", Aufgabe06.liste[i].bild);
        bild.setAttribute("alt", Aufgabe06.liste[i].name);
        newDiv.appendChild(bild);
        let desc = document.createElement("p");
        desc.setAttribute("class", "desc");
        desc.innerHTML = Aufgabe06.liste[i].desc;
        newDiv.appendChild(desc);
        let txt = document.createElement("p");
        txt.innerHTML = "pro Stück: ";
        newDiv.appendChild(txt);
        let preis = document.createElement("b");
        preis.setAttribute("class", "preis");
        preis.innerHTML = "" + Aufgabe06.liste[i].preis + " €";
        txt.appendChild(preis);
        let knopf = document.createElement("button");
        knopf.setAttribute("name", "kaufen");
        knopf.innerHTML = "Kaufen";
        newDiv.appendChild(knopf);
    }
    for (let i = 0; i < Aufgabe06.liste.length; i++) {
        switch (Aufgabe06.liste[i].kat) {
            case 1:
                addItem(1, i, false);
                break;
            case 2:
                addItem(2, i, false);
                break;
            case 3:
                addItem(3, i, false);
            default:
                console.log("Fehler");
                break;
        }
        if (Aufgabe06.liste[i].ad) {
            if (Aufgabe06.liste[i].kat == 2) {
                addItem(2, i, true);
            }
            if (Aufgabe06.liste[i].kat == 3) {
                addItem(3, i, true);
            }
        }
    }
})(Aufgabe06 || (Aufgabe06 = {}));
//# sourceMappingURL=function.js.map