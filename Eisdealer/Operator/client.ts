namespace EisdealerOperator {
    interface Order {
        _id: string;
        fname: string;
        lname: string;
        adress: string;
        ices: Ice[];

    }
    interface Ice {
        [type: string]: string | string[] | number;
       
    }

    let url: string = "http://localhost:8100";
    document.getElementById("button")!.addEventListener("click", retrieveData);
    async function retrieveData(): Promise<void> {
        
       
        
        let response: Response = await communicate(url + "/retrieve");
        let orders: Order[] = (JSON.parse( await response.text())); 
        console.log(orders);
        let ausstehend: HTMLDivElement = <HTMLDivElement> document.getElementById("ausstehend");
        orders.forEach(e => {
          let div: HTMLDivElement =  document.createElement("div");
          div.setAttribute("class", "item");
          div.setAttribute("id", e._id);
          let liste: HTMLUListElement = document.createElement("ul");
          let listelement: HTMLElement = document.createElement("li");
          listelement.innerHTML = "Bestellnummer: " + e._id;
          let listelement1: HTMLElement = document.createElement("li");
          listelement1.innerHTML = "Vorname: " + e.fname;
          let listelement2: HTMLElement = document.createElement("li");
          listelement2.innerHTML = "Nachname: " + e.lname;
          let listelement3: HTMLElement = document.createElement("li");
          listelement3.innerHTML = "Adresse: " + e.adress;
          liste.appendChild(listelement);
          liste.appendChild(listelement1);
          liste.appendChild(listelement2);
          liste.appendChild(listelement3);
          div.appendChild(liste);
          let edit: HTMLButtonElement = document.createElement("button");
          edit.innerHTML = "Bestellung bearbeiten";
          edit.addEventListener("click", hndEdit);
          div.appendChild(edit);
          let eisdiv: HTMLDivElement = document.createElement("div");
          eisdiv.setAttribute("class", "inneritem");
          e.ices.forEach(element => {
              let ul: HTMLUListElement = document.createElement("ul");
              for (const key in element) {
                let li: HTMLElement = document.createElement("li");
                li.innerHTML = key + ": " + element[key] + "";
                ul.appendChild(li);
              }
              eisdiv.appendChild(ul);
          });
          div.appendChild(eisdiv);
          if (localStorage.getItem(e._id) != "active")
          ausstehend.appendChild(div);
          else {
            let active: HTMLDivElement = <HTMLDivElement> document.getElementById("aktiv");
            active.appendChild(div);
            changeButton(edit);
          }
          
            
        });
    }
    async function communicate(_url: RequestInfo): Promise<Response> {
        let response: Response = await fetch(_url);
        return response;
    }
    function hndEdit(_event: Event): void {
        let button: HTMLButtonElement = <HTMLButtonElement>_event.target;
        let aktiv: HTMLDivElement = <HTMLDivElement> document.getElementById("aktiv");
        let div: HTMLDivElement = <HTMLDivElement>button.parentElement;
        localStorage.setItem(div.getAttribute("id")!, "active");
        aktiv.appendChild(button.parentNode!);
        changeButton(button);
        
    }
    function changeButton(b1: HTMLButtonElement): void {
        let newbutton: HTMLButtonElement = document.createElement("button");
        let parent: HTMLDivElement = <HTMLDivElement>b1.parentElement;
        newbutton.innerHTML = "Löschen";
        newbutton.addEventListener("click", hndDelete);
       
        parent.removeChild(b1);
        parent.appendChild(newbutton);
    }
    async function hndDelete(_event: Event): Promise<void> {
        let active: HTMLDivElement = <HTMLDivElement> document.getElementById("aktiv");
        let ziel: HTMLButtonElement = <HTMLButtonElement> _event.target;
        let parent: HTMLDivElement = <HTMLDivElement> ziel.parentElement;
        let info: string = "/delete?id=" + parent.getAttribute("id");
        await communicate(url + info);
        active.removeChild(parent);
        
    }
    
}