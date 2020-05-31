namespace Aufgabe05 {

    
    for (let i: number = 0; i < liste.length; i++) {
        
    switch (liste[i].kat) {
        case 1:
            let newDiv: HTMLElement = document.createElement("div");
            newDiv.setAttribute("class", "item");
            newDiv.innerHTML = liste[i].name;
            document.getElementById("container1")?.appendChild(newDiv);
            let bild: HTMLElement = document.createElement("img");
            bild.setAttribute("src", liste[i].bild);
            bild.setAttribute("alt", liste[i].name);
            newDiv.appendChild(bild);
            let desc: HTMLElement = document.createElement("p");
            desc.setAttribute("class", liste[i].bild);
            desc.innerHTML = liste[i].desc;
            newDiv.appendChild(desc);
            let txt: HTMLElement = document.createElement("p");  
            txt.innerHTML = "pro Stück: ";
            newDiv.appendChild(txt);
            let preis: HTMLElement = document.createElement("b");
            preis.setAttribute("class", "preis");
            preis.innerHTML = "" + liste[i].preis + " €";
            txt.appendChild(preis);
            
      
            break;
        case 2:
            let newDiv2: HTMLElement = document.createElement("div");
            newDiv2.setAttribute("class", "item");
            newDiv2.innerHTML = liste[i].name;
            document.getElementById("container1")?.appendChild(newDiv2);
            let bild2: HTMLElement = document.createElement("img");
            bild2.setAttribute("src", liste[i].bild);
            bild2.setAttribute("alt", liste[i].name);
            newDiv2.appendChild(bild2);
            let desc2: HTMLElement = document.createElement("p");
            desc2.setAttribute("class", liste[i].bild);
            desc2.innerHTML = liste[i].desc;
            newDiv2.appendChild(desc2);
            let txt2: HTMLElement = document.createElement("p");  
            txt2.innerHTML = "pro Stück :";
            newDiv2.appendChild(txt2);
            let preis2: HTMLElement = document.createElement("b");
            preis2.setAttribute("class", "preis");
            preis2.innerHTML = "" + liste[i].preis + " €";
            txt2.appendChild(preis2);
            break;
        case 3:
            let newDiv3: HTMLElement = document.createElement("div");
            newDiv3.setAttribute("class", "item");
            newDiv3.innerHTML = liste[i].name;
            document.getElementById("container1")?.appendChild(newDiv3);
            let bild3: HTMLElement = document.createElement("img");
            bild3.setAttribute("src", liste[i].bild);
            bild3.setAttribute("alt", liste[i].name);
            newDiv3.appendChild(bild3);
            let desc3: HTMLElement = document.createElement("p");
            desc3.setAttribute("class", liste[i].bild);
            desc3.innerHTML = liste[i].desc;
            newDiv3.appendChild(desc3);
            let txt3: HTMLElement = document.createElement("p");  
            txt3.innerHTML = "pro Stück :";
            newDiv3.appendChild(txt3);
            let preis3: HTMLElement = document.createElement("b");
            preis3.setAttribute("class", "preis");
            preis3.innerHTML = "" + liste[i].preis + " €";
            txt3.appendChild(preis3);
        default:
            console.log("Fehler");
            break;
    }
    }

}