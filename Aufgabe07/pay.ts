namespace Aufgabe07 {
    async function communicate(_url: RequestInfo): Promise<void> {
        let response: Response = await fetch(_url);
        let rückgabe: JSON = await response.json();
        console.log("Response", response);
        liste = JSON.parse(JSON.stringify(rückgabe));
        
      }
    async function initPay(): Promise<void> {
        console.log("start");
        await communicate("https://fabiankowatsch.github.io/GIS-SoSe-2020/Test/artikel.json");
        console.log("end");
        printStorage();
        buildPay();
        createPayEvents();
    }
    initPay();
    function addItemPay(i: number, obj: Artikel[]): void {
        let newDiv: HTMLElement = document.createElement("div");
        newDiv.setAttribute("class", "item");
        newDiv.innerHTML = obj[i].name;
        document.getElementById("container1")?.appendChild(newDiv);
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
        let leiste: HTMLElement = document.createElement("div");
        leiste.setAttribute("class", "leiste");
        newDiv.appendChild(leiste);
        let knopf: HTMLElement = document.createElement("button");
        knopf.setAttribute("name", "kaufen");
        knopf.setAttribute("class", "kaufen");
        knopf.setAttribute("data-price", "" + liste[i].preis);
        knopf.setAttribute("data-index", "" + i);
        knopf.innerHTML = "+";
        leiste.appendChild(knopf);
        let anzahl: HTMLElement = document.createElement("span");
        anzahl.setAttribute("id", "zähler");
        anzahl.setAttribute("data-counter", localStorage.getItem(i + "") + ""); 
        anzahl.innerHTML = localStorage.getItem(i + "") + "";
        leiste.appendChild(anzahl);
        let del: HTMLElement = document.createElement("button");
        del.setAttribute("name", "löschen");
        del.setAttribute("class", "löschen");
        del.setAttribute("data-price", "" + liste[i].preis);     
        del.setAttribute("data-index", "" + i);
        del.innerHTML = "-";
        leiste.appendChild(del);
    }
    let summe: number = parseInt(localStorage.getItem("summe") + "");
    function buildPay(): void {
        for (let i: number = 0; i < localStorage.length; ++i) {
            if (localStorage.key(i) != "summe") {
            let storageKey: string = localStorage.key(i) as string;
            let j: number = parseInt(storageKey);
            addItemPay(j, liste);
            }
        }
        let gesamt: HTMLElement = document.querySelector("#gesamtpreis") as HTMLElement;
        if (localStorage.getItem("summe") != null)
        gesamt.innerHTML = localStorage.getItem("summe") + "€";
        else 
        gesamt.innerHTML = "0€";
    }
    function printStorage(): void {
        for (let i: number = 0; i < localStorage.length; ++i) { 
            let storageKey: string = localStorage.key(i) as string;
            console.log(storageKey + ":" + localStorage.getItem(storageKey) );          
        }
        console.log("______________");
    }
    function createPayEvents(): void {
        let allAdd: HTMLCollectionOf<Element> = document.getElementsByClassName("kaufen");
        for (let i: number = 0; i < allAdd.length; i++) {
            allAdd[i].addEventListener("click", hndAdd);
        }
        let allDel: HTMLCollectionOf<Element> = document.getElementsByClassName("löschen");
        for (let i: number = 0; i < allDel.length; i++) {
            allDel[i].addEventListener("click", hndDel);
        }
        let clear: HTMLButtonElement = document.querySelector("#clear") as HTMLButtonElement;
        clear.addEventListener("click", hndClear);
    }
    function hndAdd(_event: Event): void {
    let gesamt: HTMLElement = document.querySelector("#gesamtpreis") as HTMLElement;
    let from: HTMLButtonElement = _event.target as HTMLButtonElement;
    let anzahl: HTMLElement = from.nextElementSibling as HTMLElement;
    let prs: string = from.dataset.price as string;
    let aktuellstr: string = anzahl.dataset.counter as string;
    let aktuellid: string = from.dataset.index as string;
    let aktuellint: number = parseInt(aktuellstr) + 1;
    anzahl.setAttribute("data-counter", "" + aktuellint);
    summe = summe + parseInt(prs);
    localStorage.setItem("summe", summe + ""); 
    localStorage.setItem(aktuellid, aktuellint + "");
    anzahl.innerHTML = localStorage.getItem(aktuellid) + "";
    printStorage();
    gesamt.innerHTML = localStorage.getItem("summe") + "€";

    }
    function hndDel(_event: Event): void {
        let gesamt: HTMLElement = document.querySelector("#gesamtpreis") as HTMLElement;
        let from: HTMLButtonElement = _event.target as HTMLButtonElement;
        let anzahl: HTMLElement = from.previousElementSibling as HTMLElement;
        let prs: string = from.dataset.price as string;
        let aktuellstr: string = anzahl.dataset.counter as string;
        let aktuellid: string = from.dataset.index as string;
        let aktuellint: number = parseInt(aktuellstr) - 1;
        if (aktuellint > -1) {
        anzahl.setAttribute("data-counter", "" + aktuellint);
        summe = summe - parseInt(prs);
        localStorage.setItem("summe", summe + ""); 
        localStorage.setItem(aktuellid, aktuellint + "");
        from.previousElementSibling!.innerHTML = localStorage.getItem(aktuellid) + "";
        printStorage();
        gesamt.innerHTML = localStorage.getItem("summe") + "€";
        }
        else {
            localStorage.removeItem(aktuellid);
            from.parentElement?.parentElement?.setAttribute("class", "hide");
        }
        }
    function hndClear(_event: Event): void {
        localStorage.clear();
        location.reload();
        printStorage();
        
    }

}