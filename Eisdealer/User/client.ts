namespace Omega {
    export interface Eis {
        kugeln: string[];
        topping: string[];
        behälter: string[];
    }
    let eis: Eis;
    let isLoggedIn: boolean = false;
    let url: string = "http://localhost:8100";
    let personalData: string;
    let kugelcounter: number = 1;
    // Init wird beim Start aufgerufen
    init();
    async function init(): Promise<void> {
        await getIceData("eis.json");
        buildPage();
        createEvents();
        loadDefaultIce();
    }
    function createEvents(): void {
        hndClear();
        document.getElementById("addToOrder")!.addEventListener("click", hndAddToOrder);
        document.getElementById("plus")!.addEventListener("click", hndAddIce);
        document.getElementById("res")!.addEventListener("click", hndResetIce);
        document.getElementById("login")!.addEventListener("click", hndLogin);
        document.getElementById("send")!.addEventListener("click", sendOrder);
        document.getElementById("iceSelect")!.addEventListener("change", hndSelect);
        let radios: NodeListOf<HTMLInputElement> = document.querySelectorAll("input[type=radio]");
        radios.forEach(radio => {radio.addEventListener("change", hndRadio); });
        let checks: NodeListOf<HTMLInputElement> = document.querySelectorAll("input[type=checkbox]");
        checks.forEach(check => {check.addEventListener("change", hndCheckbox); });
    }
    
    
    
    //Seitenaufbau
    function buildPage(): void {
        let div: HTMLDivElement = <HTMLDivElement> document.getElementById("kugelDiv");
        let h1: HTMLHeadingElement = <HTMLHeadingElement> document.createElement("h3");
        div.insertBefore(h1, div.firstChild);
        h1.innerHTML = "Wählen sie Anzahl und Sorte der Kugeln:";        
        let div1: HTMLDivElement = <HTMLDivElement> document.getElementById("kugeln");
        let select: HTMLSelectElement = <HTMLSelectElement> document.createElement("select");
        select.setAttribute("id", "iceSelect");
        select.setAttribute("name", "kugeln");
        select.setAttribute("class", "selector");
        eis.kugeln.forEach(element => { 
            let option: HTMLOptionElement = <HTMLOptionElement> document.createElement("option");
            option.setAttribute("value", element.toLowerCase());
            option.innerHTML = element;
            select.appendChild(option);
            
        });
        div1.appendChild(select);
        let div2: HTMLDivElement = <HTMLDivElement> document.getElementById("toppingDiv");
        let h2: HTMLHeadingElement = <HTMLHeadingElement> document.createElement("h3");
        div2.appendChild(h2);
        h2.innerHTML = "Wählen sie ihre Verpackung:";
        eis.topping.forEach(element => {
            let label: HTMLLabelElement = <HTMLLabelElement> document.createElement("label");
            label.setAttribute("for", element.toLowerCase());
            let input: HTMLInputElement = <HTMLInputElement> document.createElement("input");
            input.setAttribute("type", "checkbox");
            input.setAttribute("name", "topping");
            input.setAttribute("value", element.toLowerCase());
            label.appendChild(input);
            let span: HTMLSpanElement = <HTMLSpanElement> document.createElement("span");
            span.innerHTML = element;
            label.appendChild(span);
            
            div2.appendChild(label);
            
        });
        let div3: HTMLDivElement = <HTMLDivElement> document.getElementById("behälterDiv");
        let h3: HTMLHeadingElement = <HTMLHeadingElement> document.createElement("h3");
        div3.appendChild(h3);
        h3.innerHTML = "Wählen sie ihre Verpackung:";
        eis.behälter.forEach(element => {
            let label: HTMLLabelElement = <HTMLLabelElement> document.createElement("label");
            label.setAttribute("for", element.toLowerCase());
            let input: HTMLInputElement = <HTMLInputElement> document.createElement("input");
            input.setAttribute("type", "radio");
            input.setAttribute("name", "behaelter");
            input.setAttribute("value", element.toLowerCase());
            if (element == "Waffel")
            input.setAttribute("checked", "checked");
            label.appendChild(input);
            let span: HTMLSpanElement = <HTMLSpanElement> document.createElement("span");
            span.innerHTML = element;
            label.appendChild(span);
            div3.appendChild(label);
            
        });
    }

    
    //Speichert ein erstelltes Eis bei Knopfdruck im Localstorage(Warenkorb/Bestellung) ab
    function hndAddToOrder(): void {
        let formData1: FormData = new FormData(document.forms[0]);
        let list: Array<FormDataEntryValue> = Array.from(formData1.values());
        let preis: number = list.length;
        let preisinput: HTMLInputElement = <HTMLInputElement> document.getElementById("preis");
        preisinput.setAttribute("value", "" + preis);
        let formData: FormData = new FormData(document.forms[0]);
        let jsonData: string = JSON.stringify(Object.fromEntries(formData.entries()));
        console.log(jsonData);
        console.log(formData.entries.length);
        
        // tslint:disable-next-line: no-any
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        if (localStorage.length == 0)
        localStorage.setItem("query", "$$?" + query.toString());
        else {
          let querystring: string = localStorage.getItem("query")!;
          querystring += "$$?" + query;
          localStorage.setItem("query", querystring);
        }
                     
    }
    
    //Fügt dem DOM eine Selektoption zu, die eine Eiskugel repräsentiert
    function hndAddIce(): void {
        if (kugelcounter < 4) {
        kugelcounter++;
        let div: HTMLDivElement = <HTMLDivElement>document.getElementById("kugeln");
        let kugel: HTMLSelectElement = document.createElement("select");
        kugel.addEventListener("change", hndSelect);
        kugel.setAttribute("name", "kugeln");
        kugel.setAttribute("id", "" + kugelcounter);
        kugel.setAttribute("class", "selector");
        eis.kugeln.forEach(element => { 
            let option: HTMLOptionElement = <HTMLOptionElement> document.createElement("option");
            option.setAttribute("value", element.toLowerCase());
            option.innerHTML = element;
            kugel.appendChild(option);
            
        });
        
        div.appendChild(kugel);
      
        let anzeige: HTMLDivElement = <HTMLDivElement> document.getElementById("eisanzeige");
        let defaultEis: HTMLImageElement = document.createElement("img");
        defaultEis.setAttribute("src", image(eis.kugeln[0]));
        defaultEis.setAttribute("id", "k" + kugelcounter);
        defaultEis.setAttribute("class", "kugel");
        anzeige.appendChild(defaultEis);
        }
        else
        alert("Es können maximal 4 Kugeln ausgewählt werden");
             
    }
    //zeigt die richtige Eissorte an
    function hndSelect(_event: Event): void {
       let select: HTMLSelectElement = <HTMLSelectElement>_event.target;
       let aktuellekugel: string = select.id;
       let kugelnummer: number;
       if (aktuellekugel == "iceSelect")
        kugelnummer = 0;
        else
        kugelnummer = parseInt(aktuellekugel) - 1;
       let eisbilder: NodeListOf<HTMLImageElement> = document.querySelectorAll(".kugel");
       
       eisbilder[kugelnummer].setAttribute("src", image(select.value));
       
    }
    //Zeigt je nach Auswahl des Radios den Behälter an
    function hndRadio(_event: Event): void {
        let radio: HTMLInputElement = <HTMLInputElement>_event.target;
        
        let behälterbild: HTMLImageElement = <HTMLImageElement>document.querySelector(".behälter");
        behälterbild.setAttribute("src", image(radio.value));
        behälterbild.setAttribute("id", radio.value);
       
    }
    //Zeigt je nach auswahl der Checkbox das jeweilige Topping an oder entfernt es
    function hndCheckbox(_event: Event): void {
        let check: HTMLInputElement = <HTMLInputElement>_event.target;
        if (check.checked) {
            let topping: HTMLImageElement = document.createElement("img");
            let anzeige: HTMLDivElement = <HTMLDivElement>document.getElementById("eisanzeige");
            topping.setAttribute("id", check.value);
            topping.setAttribute("src", image(check.value));
            anzeige.appendChild(topping);
        }
        else {
            let topping: HTMLImageElement = <HTMLImageElement>document.getElementById(check.value);
            topping.parentNode!.removeChild(topping);
        }
    }
// löscht Eis aus der Anzeige und aus dem localstorage
    function hndClear(): void {
        localStorage.clear();
        loadDefaultIce();
        
    }
//setzt gerade erstelltes Eis zurück
    function hndResetIce(): void {
        let create: HTMLFormElement = document.forms[0];
        create.reset();
        let allSelects: NodeListOf<HTMLSelectElement> = document.querySelectorAll("select");
        
        for (let i: number = allSelects.length - 1; i > 0; i--) {
           
            allSelects[i].parentNode!.removeChild(allSelects[i]);
            
    }
        loadDefaultIce();  
    }
// loggt den Benutzer ein, sodass seine Bestellung versendet werden kann
    function hndLogin(_event: Event): void {
        let formData: FormData = new FormData(document.forms[1]);
        let querystring: string = "";
        
        
       
        for (let value of formData.values()) {
            querystring += "" + value;
        }
        if (querystring == "") {
            alert("Bitte Lieferdaten Eingaben");
        }
        else {
            
            // tslint:disable-next-line: no-any
            let query: URLSearchParams = new URLSearchParams(<any>formData);
            personalData = "?" + query.toString();
            document.forms[1].disabled = true;
            let knopf: HTMLButtonElement = <HTMLButtonElement>_event.target;
            knopf.setAttribute("class", "hide");
            knopf.previousElementSibling!.setAttribute("class", "hide");
            knopf.previousElementSibling!.previousElementSibling!.setAttribute("class", "hide");
            knopf.previousElementSibling!.previousElementSibling!.previousElementSibling!.setAttribute("class", "hide");
            let a: HTMLDivElement = document.createElement("div");
            a.innerHTML = "Ihre Daten wurden erfolgreich übernommen!";
            knopf.parentNode!.appendChild(a);
            isLoggedIn = true;
            
        }       
    }
    //sendet Bestellung an den Server
    async function sendOrder(): Promise <void> {
        if (!isLoggedIn) 
            alert("Bitte Lieferdaten Eingaben");
        else {
            
            let order: string = localStorage.getItem("query")!;
            console.log(personalData);
            console.log(order);
            await communicate(url + "/send" + personalData + order);
            alert("Ihre Bestellung war erfolgreich!");
        }

    }
    //Kommuniziert mit dem Server
    async function communicate(_url: RequestInfo): Promise<void> {
        let response: Response = await fetch(_url);
        console.log(response);
    }
    //lädt Eisdaten aus JSON
    async function getIceData(_url: RequestInfo): Promise<void> {
        let response: Response = await fetch(_url);
        let rückgabe: JSON = await response.json();
        
        eis = JSON.parse(JSON.stringify(rückgabe));
    }
    //liefert link zum Bild
    function image( s: string): string {
        return "images/" + s.toLowerCase() + ".png";
    }

    //lädt Defaultoptionen des Eises und zeigt diese an
    function loadDefaultIce(): void {
        let anzeige: HTMLDivElement = <HTMLDivElement> document.getElementById("eisanzeige");
        
        while (anzeige.firstChild) {
            anzeige.removeChild(anzeige.lastChild!);
          }
        let defaultBehälter: HTMLImageElement = document.createElement("img");
        let defaultEis: HTMLImageElement = document.createElement("img");
        defaultBehälter.setAttribute("src", image(eis.behälter[0]));
        defaultBehälter.setAttribute("class", "behälter");
        defaultBehälter.setAttribute("id", eis.behälter[0].toLowerCase());
        defaultBehälter.setAttribute("alt", eis.behälter[0]);
        defaultEis.setAttribute("src", image(eis.kugeln[0]));
        defaultEis.setAttribute("class", "kugel");
        defaultEis.setAttribute("id", "k1");
        defaultEis.setAttribute("alt", eis.kugeln[0]);
        anzeige.appendChild(defaultBehälter);
        anzeige.appendChild(defaultEis);
        kugelcounter = 1;
    }
    

}