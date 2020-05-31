"use strict";
let liste = [
    { name: "1m² Rasenfläche", bild: "\"rasen.jpg\"", desc: "Die seltenste Pflanze der Welt!", preis: 5, kat: 1, ad: false },
    { name: "Rosenstrauch", bild: "\"rose.jpg\"", desc: "Perfekt zum verschenken!", preis: 15, kat: 1, ad: false },
    { name: "Lavendel", bild: "\"lavendel.jpg\"", desc: "für den guten Duft im Garten:", preis: 3, kat: 1, ad: false },
    { name: "Sonnenblume", bild: "\"sunflower.jpg\"", desc: "Multifunktionspflanze", preis: 4, kat: 1, ad: false },
    { name: "Nutzhanf", bild: "\"hanf.jpg\"", desc: "Hier gibt es selbstverständlich nur die männlichen Pflanzen ;)", preis: 15, kat: 1, ad: false },
    { name: "Salatsetzling", bild: "\"salat.jpg\"", desc: "eine Kuriosität!", preis: 2, kat: 1, ad: false },
    { name: "Gewächshaus", bild: "\"greenhouse.jpg\"", desc: "Salat wächst hier am besten!", preis: 600, kat: 2, ad: false },
    { name: "Gartenhaus", bild: "\"gartenhaus.jpg\"", desc: "zum verstauen der Werkzeuge", preis: 999, kat: 2, ad: false },
    { name: "Gartenstuhl", bild: "\"chair.jpg\"", desc: "Die perfekte Sitzgelegenheit!", preis: 30, kat: 2, ad: true },
    { name: "Massivholztisch", bild: "\"tisch.png\"", desc: "Der hält ein paar Generationen lang!", preis: 200, kat: 2, ad: true },
    { name: "Gartenbank", bild: "\"bank.jpg\"", desc: "sehr gemütlich", preis: 250, kat: 2, ad: false },
    { name: "Gartenmobiliar-Set", bild: "\"set.jpg\"", desc: "Wieso einzeln kaufen?", preis: 199, kat: 2, ad: false },
    { name: "Biertischgarnitur", bild: "\"biertisch.jpg\"", desc: "Der Klassiker für jedes Fest", preis: 60, kat: 2, ad: false },
    { name: "Schaufel", bild: "\"schaufel.jpg\"", desc: "Die bricht nicht!", preis: 15, kat: 3, ad: true },
    { name: "Gartenschaufel", bild: "\"gartenschaufel.jpg\"", desc: "Für die Feinarbeit", preis: 5, kat: 3, ad: false },
    { name: "Schubkarren", bild: "\"schubkarrenl.jpg\"", desc: "Der ist in echt noch rostiger!", preis: 40, kat: 3, ad: true },
    { name: "Rechen", bild: "\"rechen.jpg\"", desc: "Raus mit de Viecher!", preis: 15, kat: 3, ad: false },
    { name: "Laubrechen", bild: "\"laubrechen.jpg\"", desc: "ein Rechen", preis: 15, kat: 3, ad: false },
    { name: "Strohbesen", bild: "\"strohbesen.jpg\"", desc: "der altbewährte Bestseller", preis: 5, kat: 3, ad: false }
];
let b = document.createElement("p");
document.body.appendChild(b);
b.innerHTML = "neues E";
let a = document.getElementById("kat1");
a.innerHTML = "a";
let i;
for (i = 0; i < liste.length; i++) {
    switch (liste[i].kat) {
        case 1:
            let element1 = document.getElementById("container1");
            element1.innerHTML = "<div class=\"item\">" + liste[i].name + "<img src=" + liste[i].bild + "alt=\"Bild\"> <p class=\"desc\">" + liste[i].desc + "</p><p>pro Stück: <b class=\"preis\">" + liste[i].preis + "</b></p><button name=\"Kaufen\">Kaufen</button></div>";
            break;
        case 2:
            let element2 = document.getElementById("container2");
            element2.innerHTML = "<div class=\"item\">" + liste[i].name + "<img src=" + liste[i].bild + "alt=\"Bild\"> <p class=\"desc\">" + liste[i].desc + "</p><p>pro Stück: <b class=\"preis\">" + liste[i].preis + "</b></p><button name=\"Kaufen\">Kaufen</button></div>";
            break;
        case 3:
            let element3 = document.getElementById("container3");
            element3.innerHTML = "<div class=\"item\">" + liste[i].name + "<img src=" + liste[i].bild + "alt=\"Bild\"> <p class=\"desc\">" + liste[i].desc + "</p><p>pro Stück: <b class=\"preis\">" + liste[i].preis + "</b></p><button name=\"Kaufen\">Kaufen</button></div>";
        default:
            console.log("Fehler");
            break;
    }
}
//# sourceMappingURL=data.js.map