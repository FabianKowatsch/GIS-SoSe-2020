namespace Aufgabe06 {

//Funktion zum erstellen der Artikel
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
        knopf.setAttribute("data-price", "" + liste[i].preis);
        knopf.innerHTML = "Kaufen";
        newDiv.appendChild(knopf);
    } 
    //Seitenaufbau  
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
    let target: HTMLButtonElement = document.querySelector("button") as HTMLButtonElement;
    target.addEventListener("click", hndClick);
    let zähler: number = 0;
    let summe: number = 0;

    function hndClick(_onclick: Event): void {
    
    if (zähler == 0) {
    let cnt: HTMLElement = document.createElement("span");
    cnt.setAttribute("id", "counter");
    document.getElementById("pay")?.appendChild(cnt);
    zähler += 1;
    cnt.innerHTML = `0${zähler}`; 
    let prs: string = target.dataset.price as string;
    summe = summe + parseInt(prs); 
    console.log(summe);
}
    
    else {  
    zähler += 1;
    let cnt2: HTMLElement = document.getElementById("counter") as HTMLElement;
    if (zähler <= 9 && zähler > 0)
    cnt2.innerHTML = `0${zähler}`;
    if (zähler > 9) 
        cnt2.innerHTML = "" + zähler;
    let prs: string = target.dataset.price as string;
    summe = summe + parseInt(prs);
    console.log(summe);
    
}
    }
}