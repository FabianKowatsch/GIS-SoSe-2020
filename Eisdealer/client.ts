

namespace Eisdealer {
    export interface Eis {
        kugeln: string[] | string;
        behälter: string;
        topping: string[] | string;
        preis: number;
    }
    window.addEventListener("load", hndClearOrder);
    document.getElementById("add")?.addEventListener("click", hndAddToOrder);
    document.getElementById("plus")?.addEventListener("click", hndAddIce);
    document.getElementById("res")?.addEventListener("click", hndResetIce);
    document.getElementById("login")?.addEventListener("click", hndLogin);
    document.getElementById("send")?.addEventListener("click", sendOrder);
    let isLoggedIn: boolean = false;
    let url: string = "http://localhost:8200";
    let personalData: string;

    
    
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
    function hndAddIce(): void {
        let div: HTMLDivElement = <HTMLDivElement>document.getElementById("kugeln");
        let kugel: HTMLSelectElement = document.createElement("select");
        kugel.setAttribute("name", "kugeln");
        let option1: HTMLOptionElement = document.createElement("option");
        let option2: HTMLOptionElement = document.createElement("option");
        let option3: HTMLOptionElement = document.createElement("option");
        option1.setAttribute("value", "vanille");
        option2.setAttribute("value", "erdbeere");
        option3.setAttribute("value", "schokolade");
        option1.innerHTML = "Vanille";
        option2.innerHTML = "Erdbeere";
        option3.innerHTML = "Schokolade";
        div.appendChild(kugel);
        kugel.appendChild(option1);
        kugel.appendChild(option2);
        kugel.appendChild(option3);
             
    }
    function hndClearOrder(): void {
        localStorage.clear();
    }

    function hndResetIce(): void {
        let create: HTMLFormElement = document.forms[0];
        create.reset();
        let allSelects: NodeListOf<HTMLSelectElement> = document.querySelectorAll("select");
        
        for (let i: number = allSelects.length - 1; i > 0; i--) {
           
            allSelects[i].parentNode?.removeChild(allSelects[i]);
            
    }
        
    }
    function hndLogin(_event: Event): void {
        let formData: FormData = new FormData(document.forms[1]);
        // tslint:disable-next-line: no-any
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
            let knopf: HTMLButtonElement = _event.target as HTMLButtonElement;
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
    async function sendOrder(): Promise <void> {
        if (!isLoggedIn) 
            alert("Bitte Lieferdaten Eingaben");
        else {
            
            let order: string = localStorage.getItem("query")!;
            await communicate(url + "/send" + personalData + order);
            alert("Ihre Bestellung war erfolgreich!");
        }

    }
    async function communicate(_url: RequestInfo): Promise<void> {
        let response: Response = await fetch(_url);
        console.log(response);
    }

}
