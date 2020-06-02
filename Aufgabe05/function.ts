namespace Aufgabe05 {

   
    function addItem(x: number, i: number, as: boolean): void {
        let newDiv: HTMLElement = document.createElement("div");
        newDiv.setAttribute("class", "item");
        newDiv.innerHTML = liste[i].name;
        if (x == 1) {
        document.getElementById("container1")?.appendChild(newDiv);
    }
        if (x == 2) {
        document.getElementById("container2")?.appendChild(newDiv);
    }
        if  (x == 3) {
        document.getElementById("container3")?.appendChild(newDiv);
    }
        
        if (as && x == 2) {
        document.getElementById("ad1")?.appendChild(newDiv);
    }
        if (as && x == 3) {
        document.getElementById("ad2")?.appendChild(newDiv);
    }
        let bild: HTMLElement = document.createElement("img");
        bild.setAttribute("src", liste[i].bild);
        bild.setAttribute("alt", liste[i].name);
        newDiv.appendChild(bild);
        let desc: HTMLElement = document.createElement("p");
        desc.setAttribute("class", "desc");
        desc.innerHTML = liste[i].desc;
        newDiv.appendChild(desc);
        let txt: HTMLElement = document.createElement("p");  
        txt.innerHTML = "pro Stück: ";
        newDiv.appendChild(txt);
        let preis: HTMLElement = document.createElement("b");
        preis.setAttribute("class", "preis");
        preis.innerHTML = "" + liste[i].preis + " €";
        txt.appendChild(preis);
        let knopf: HTMLElement = document.createElement("button");
        knopf.setAttribute("name", "kaufen");
        knopf.innerHTML = "Kaufen";
        newDiv.appendChild(knopf);
    }

    
    for (let i: number = 0; i < liste.length; i++) {
        
    switch (liste[i].kat) {
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
    if (liste[i].ad) {
        if (liste[i].kat == 2 ) {
            addItem(2, i, true);
        }
        if (liste[i].kat == 3 ) {
            addItem(3, i, true);
        }
    }
    }
}