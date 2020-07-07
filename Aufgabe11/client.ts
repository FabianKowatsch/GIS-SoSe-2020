namespace Aufgabe11 {
    document.getElementById("set")?.addEventListener("click", hndSet);
    document.getElementById("get")?.addEventListener("click", hndGet);
    



    async function hndGet(_event: Event): Promise<void> { 
    let formData: FormData = new FormData(document.forms[0]);
    let url: string = "http://localhost:8100/retrieve";
    // tslint:disable-next-line: no-any
    let query: URLSearchParams = new URLSearchParams(<any>formData);
    url = url + "?" + query.toString();
    
    await communicate(url);
  
}
    async function hndSet(_event: Event): Promise<void> { 
    let formData: FormData = new FormData(document.forms[0]);
    let url: string = "http://localhost:8100/send";
    // tslint:disable-next-line: no-any
    let query: URLSearchParams = new URLSearchParams(<any>formData);
    url = url + "?" + query.toString();
    await communicate(url);
    
}
    async function communicate(_url: RequestInfo): Promise<void> {
    let response: Response = await fetch(_url);
    let responsestring: string = await response.text();
    (<HTMLElement>document.getElementById("antwort")).innerHTML  = responsestring;
  }
}