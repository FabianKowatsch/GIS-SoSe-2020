namespace Aufgabe08 {
let button: HTMLButtonElement = document.getElementById("senden") as HTMLButtonElement;
button.addEventListener("click", hndClick);



function hndClick(_event: Event): void { 
    let formData: FormData = new FormData(document.forms[0]);
    let url: string = "https://fabiankowatschgis.herokuapp.com/";
    let query: URLSearchParams = new URLSearchParams(<any>formData);
    url = url + "?" + query.toString();
    communicate(url);

}
async function communicate(_url: RequestInfo): Promise<void> {
    let response: Response = await fetch(_url, { method: "get" });
    let responsestring: String = await response.text();
    console.log("Antwort: " + responsestring);
  }
}