namespace Aufgabe07 {
    async function communicate(_url: RequestInfo): Promise<void> {
        let response: Response = await fetch(_url);
        let rückgabe: JSON = await response.json();
        console.log("Response", response);
        liste = JSON.parse(JSON.stringify(rückgabe));
        
      }
    
    
    async function init(): Promise<void> {
    console.log("start");
    await communicate("https://fabiankowatsch.github.io/GIS-SoSe-2020/Test/artikel.json");
    console.log("end");
    buildPage();
    createButtonEvents();
}
    init();
    
//Funktion zum erstellen der Artikel
    function addItem(x: number, i: number, as: boolean, obj: Artikel[]): void {
        let newDiv: HTMLElement = document.createElement("div");
        newDiv.setAttribute("class", "item");
        newDiv.innerHTML = obj[i].name;
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
        knopf.setAttribute("data-counter", "" + 0);
        knopf.setAttribute("data-index", "" + i);
        knopf.innerHTML = "Kaufen";
        newDiv.appendChild(knopf);
    } 
//Seitenaufbau
    function buildPage(): void {
    for (let i: number = 0; i < liste.length; i++) {
        
    switch (liste[i].kat) {
        case 1:
            addItem(1, i, false, liste);     
            break;
        case 2:
            addItem(2, i, false, liste);
            break;
        case 3:
            addItem(3, i, false, liste);
        default:
            
            break;
    }
    if (liste[i].ad) {
        if (liste[i].kat == 2 ) {
            addItem(2, i, true, liste);
        }
        if (liste[i].kat == 3 ) {
            addItem(3, i, true, liste);
        }
    }
    }
}
//Event Handling
    function createButtonEvents(): void {
    let allButtons: NodeListOf<HTMLButtonElement> = document.querySelectorAll("button");
    for (let i: number = 0; i < allButtons.length; i++) {
        allButtons[i].addEventListener("click", hndClick);
    }
}
    let k1: HTMLElement = document.querySelector("#k1 *") as HTMLElement;
    let k2: HTMLElement = document.querySelector("#k2 *") as HTMLElement;
    let k3: HTMLElement = document.querySelector("#k3 *") as HTMLElement;
    let showall: HTMLElement = document.querySelector("#showall *") as HTMLElement;
    k1.addEventListener("click", hndKat);
    k2.addEventListener("click", hndKat);
    k3.addEventListener("click", hndKat);
    showall.addEventListener("click", hndKat);
    
//Zähler + Summe
    let zähler: number = 0;
    let summe: number = 0;

//Funktion zum Zählen + Summe
    function hndClick(_event: Event): void {
    
    if (zähler == 0) {
    let cnt: HTMLElement = document.createElement("span");
    cnt.setAttribute("id", "counter");
    document.getElementById("pay")?.appendChild(cnt);
    zähler += 1;
    cnt.innerHTML = `0${zähler}`;   
}  
    else {  
    zähler += 1;
    let cnt2: HTMLElement = document.getElementById("counter") as HTMLElement;
    if (zähler <= 9 && zähler > 0)
        cnt2.innerHTML = `0${zähler}`;
    if (zähler > 9) 
        cnt2.innerHTML = "" + zähler;
    }
    let from: HTMLButtonElement = _event.target as HTMLButtonElement;
    let prs: string = from.dataset.price as string;
    let aktuellstr: string = from.dataset.counter as string;
    let aktuellid: string = from.dataset.index as string;
    let aktuellint: number = parseInt(aktuellstr) + 1;
    from.setAttribute("data-counter", "" + aktuellint);
    summe = summe + parseInt(prs);
    console.log(summe); 
     
    localStorage.setItem(aktuellid, aktuellint + "");
    printStorage();
    }

    function printStorage(): void {
        for (let i: number = 0; i < localStorage.length; ++i) { 
            let storageKey: string = localStorage.key(i) as string;
            console.log(storageKey + ":" + localStorage.getItem(storageKey) );
        }
    }

//Kategorien ausblenden
    function hndKat(event: Event): void {
        
        let kat1: HTMLElement = document.querySelector("#kat1") as HTMLElement;
        let cont1: HTMLElement = document.querySelector("#container1") as HTMLElement;
        let kat2: HTMLElement = document.querySelector("#kat2") as HTMLElement;
        let cont2: HTMLElement = document.querySelector("#container2") as HTMLElement;
        let kat3: HTMLElement = document.querySelector("#kat3") as HTMLElement;
        let cont3: HTMLElement = document.querySelector("#container3") as HTMLElement;
        
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


}