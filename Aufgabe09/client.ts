namespace Aufgabe09 {
    document.getElementById("sendhtml")?.addEventListener("click", hndHTML);
    document.getElementById("sendjson")?.addEventListener("click", hndJSON);
    let antwort: string;



    async function hndHTML(_event: Event): Promise<void> { 
    let formData: FormData = new FormData(document.forms[0]);
    let url: string = "https://fabiankowatschgis.herokuapp.com/html";
    let query: URLSearchParams = new URLSearchParams(<any>formData);
    url = url + "?" + query.toString();
    
    await communicate(url);
    (<HTMLElement>document.getElementById("antwort")).innerHTML  = antwort;
}
    async function hndJSON(_event: Event): Promise<void> { 
    let formData: FormData = new FormData(document.forms[0]);
    let url: string = "https://fabiankowatschgis.herokuapp.com/json";
    let query: URLSearchParams = new URLSearchParams(<any>formData);
    url = url + "?" + query.toString();
    await communicate(url);
    let ausgabe: string = JSON.parse(antwort);
    console.log(ausgabe);
}
    async function communicate(_url: RequestInfo): Promise<void> {
    let response: Response = await fetch(_url);
    let responsestring: string = await response.text();
    antwort = responsestring;
  }
}