

namespace Eisdealer {
    export interface Eis {
        kugeln: string[] | string;
        behälter: string;
        topping: string[] | string;
        preis: number;
    }
    window.addEventListener("load", hndClear);
    document.getElementById("add")?.addEventListener("click", hndAddToOrder);
    document.getElementById("plus")?.addEventListener("click", hndAddIce);
    document.getElementById("res")?.addEventListener("click", hndResetIce);
    document.getElementById("login")?.addEventListener("click", hndLogin);
    document.getElementById("send")?.addEventListener("click", sendOrder);
    document.getElementById("iceSelect")?.addEventListener("change", hndSelect);
    let radios: NodeListOf<HTMLInputElement> = document.querySelectorAll("input[type=radio]");
    radios.forEach(radio => {radio.addEventListener("change", hndRadio); });
    let checks: NodeListOf<HTMLInputElement> = document.querySelectorAll("input[type=checkbox]");
    checks.forEach(check => {check.addEventListener("change", hndCheckbox); });
    
    
    let isLoggedIn: boolean = false;
    let url: string = "http://localhost:8200";
    let personalData: string;
    let kugelcounter: number = 1;

    
    //Speichert ein erstelltes Eis bei Knopfdruck im Localstorage(Warenkorb/Bestellung) ab
    function hndAddToOrder(): void {
        
        let formData: FormData = new FormData(document.forms[0]);
        let jsonData: string = JSON.stringify(Object.fromEntries(formData.entries()));
        console.log(jsonData);
        console.log(formData.entries.length);
        
        // tslint:disable-next-line: no-any
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        if (localStorage.length == 0)
        localStorage.setItem("query", query.toString());
        else {
          let querystring: string = localStorage.getItem("query")!;
          querystring += "$$?" + query;
          localStorage.setItem("query", querystring);
        }
        console.log(localStorage.getItem("query"));
        
        
        

        
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
        let option1: HTMLOptionElement = document.createElement("option");
        let option2: HTMLOptionElement = document.createElement("option");
        let option3: HTMLOptionElement = document.createElement("option");
        let option4: HTMLOptionElement = document.createElement("option");
        let option5: HTMLOptionElement = document.createElement("option");
        option1.setAttribute("value", "vanille");
        option2.setAttribute("value", "erdbeere");
        option3.setAttribute("value", "schokolade");
        option4.setAttribute("value", "zitrone");
        option5.setAttribute("value", "himbeere");
        option1.innerHTML = "Vanille";
        option2.innerHTML = "Erdbeere";
        option3.innerHTML = "Schokolade";
        option4.innerHTML = "Zitrone";
        option5.innerHTML = "Himbeere";
        div.appendChild(kugel);
        kugel.appendChild(option1);
        kugel.appendChild(option2);
        kugel.appendChild(option3);
        kugel.appendChild(option4);
        kugel.appendChild(option5);
        let anzeige: HTMLDivElement = <HTMLDivElement> document.getElementById("eisanzeige");
        let defaultEis: HTMLImageElement = document.createElement("img");
        defaultEis.setAttribute("src", "Images/vanille.png");
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
       
       
       switch (select.value) {
        case "vanille": 
            eisbilder[kugelnummer].setAttribute("src", "Images/vanille.png");
            break;
        case "erdbeere":
            eisbilder[kugelnummer].setAttribute("src", "Images/erdbeere.png");
            break;
        case "schokolade":
            eisbilder[kugelnummer].setAttribute("src", "Images/schokolade.png");
            break;
        case "himbeere":
            eisbilder[kugelnummer].setAttribute("src", "Images/himbeere.png");
            break;
        case "zitrone":
            eisbilder[kugelnummer].setAttribute("src", "Images/zitrone.png");
            break;
        default:
            break;
       }

    }
    //Zeigt je nach Auswahl des Radios den Behälter an
    function hndRadio(_event: Event): void {
        let radio: HTMLInputElement = <HTMLInputElement>_event.target;
        
        let behälterbild: HTMLImageElement = <HTMLImageElement>document.querySelector(".behälter");
        switch (radio.value) {
            case "waffel":
                behälterbild.setAttribute("src", "Images/eistüte.png");
                break;
            case "becher":
                behälterbild.setAttribute("src", "Images/eisbecher.png");
                break;
            default:
                break;
        }
    }
    //Zeigt je nach auswahl der Checkbox das jeweilige Topping an oder entfernt es
    function hndCheckbox(_event: Event): void {
        let check: HTMLInputElement = <HTMLInputElement>_event.target;
        if (check.checked) {
            let topping: HTMLImageElement = document.createElement("img");
            let anzeige: HTMLDivElement = <HTMLDivElement>document.getElementById("eisanzeige");
            topping.setAttribute("id", check.value);
            switch (check.value) {
                case "sauce":
                    topping.setAttribute("src", "Images/schoko.png");
                    break;
                case "schokoflocken":
                    topping.setAttribute("src", "Images/schokoflocken.png");
                    break;
                case "schokobohnen":
                    topping.setAttribute("src", "Images/schokobohnen.png");
                    break;
                case "streusel":
                    topping.setAttribute("src", "Images/streusel.png");
                    break;

            }
            anzeige.appendChild(topping);
        }
        else {
            let topping: HTMLImageElement = <HTMLImageElement>document.getElementById(check.value);
            topping.parentNode?.removeChild(topping);
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
           
            allSelects[i].parentNode?.removeChild(allSelects[i]);
            
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
            console.log(querystring);
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
            knopf.parentNode?.appendChild(a);
            isLoggedIn = true;
            
        }       
    }
    //sendet Bestellung an den Server
    async function sendOrder(): Promise <void> {
        if (!isLoggedIn) 
            alert("Bitte Lieferdaten Eingaben");
        else {
            
            let order: string = localStorage.getItem("query")!;
            await communicate(url + "/send" + personalData + order);
            alert("Ihre Bestellung war erfolgreich!");
        }

    }
    //Kommuniziert mit dem Server
    async function communicate(_url: RequestInfo): Promise<void> {
        let response: Response = await fetch(_url);
        console.log(response);
    }

    //lädt Defaultoptionen des Eises und zeigt diese an
    function loadDefaultIce(): void {
        let anzeige: HTMLDivElement = <HTMLDivElement> document.getElementById("eisanzeige");
        
        while (anzeige.firstChild) {
            anzeige.removeChild(anzeige.lastChild!);
          }
        let defaultBehälter: HTMLImageElement = document.createElement("img");
        let defaultEis: HTMLImageElement = document.createElement("img");
        defaultBehälter.setAttribute("src", "Images/eistüte.png");
        defaultBehälter.setAttribute("class", "behälter");
        defaultEis.setAttribute("src", "Images/vanille.png");
        defaultEis.setAttribute("class", "kugel");
        anzeige.appendChild(defaultBehälter);
        anzeige.appendChild(defaultEis);
        kugelcounter = 1;
    }
    

}
