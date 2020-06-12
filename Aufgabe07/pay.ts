namespace Aufgabe07 {
    async function initPay(): Promise<void> {
        console.log("start");
        await communicate("https://fabiankowatsch.github.io/GIS-SoSe-2020/Test/artikel.json");
        console.log("end");
        buildPay();
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
        let knopf: HTMLElement = document.createElement("button");
        knopf.setAttribute("name", "kaufen");
        knopf.setAttribute("data-price", "" + liste[i].preis);
        knopf.setAttribute("data-counter", "" + localStorage.getItem(i + ""));
        knopf.setAttribute("data-index", "" + i);
        knopf.innerHTML = "Kaufen";
        newDiv.appendChild(knopf);
    } 
    function buildPay(): void {
        for (let i: number = 0; i < localStorage.length; ++i) { 
            let storageKey: string = localStorage.key(i) as string;
            let j: number = parseInt(storageKey);
            addItemPay(j, liste);
        }
    }

}