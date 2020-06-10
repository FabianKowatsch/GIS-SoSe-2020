async function communicate(_url: RequestInfo): Promise<void> {
    let response: Response = await fetch(_url);
    console.log("Response", response);
    let ausgabe: string = await response.json();
    console.log(ausgabe);
  }
console.log("start");
communicate("https://hs-furtwangen.github.io/GIS-SoSe-2020/L07/testjson.json");
console.log("end");