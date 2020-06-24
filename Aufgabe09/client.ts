namespace Aufgabe09 {
    let button: HTMLButtonElement = document.getElementById("senden") as HTMLButtonElement;
    button.addEventListener("click", hndClick);



    function hndClick(_event: Event): void { 
    let formData: FormData = new FormData(document.forms[0]);
    let url: string = "http://localhost:8100";
    let query: URLSearchParams = new URLSearchParams(<any>formData);
    url = url + "?" + query.toString();
    communicate(url);

}
    async function communicate(_url: RequestInfo): Promise<void> {
    let response: Response = await fetch(_url);
    let responsestring: String = await response.text();
    console.log("Antwort: " + responsestring);
  }
}