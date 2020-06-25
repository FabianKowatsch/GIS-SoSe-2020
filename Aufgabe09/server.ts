import * as Http from "http";
import * as Url from "url";

export namespace A09Server {
    console.log("Starting server");
    //setzt den port, falls nicht vorhanden auf 8100
    let port: number = Number(process.env.PORT);
    if (!port)
        port = 8200;
    //erstellt eine Instanz der HTTP-Server-Klasse
    let server: Http.Server = Http.createServer();
    //fügt Events für Aufruf und Anfrage zu
    server.addListener("request", handleRequest);
    server.addListener("listening", handleListen);
    server.listen(port);
    // gibt "Listening" aus, wenn der Server bereit ist
    function handleListen(): void {
        console.log("Server bereit");
    }
    function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
        console.log("Ruhe!");
        //setzt http header-werte der response
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        
        if (_request.url) {
            //erstellt aus dem query-teil ein assoziatives Array
            let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);
            
            //erstellt die url, mit der die Anfrage gestellt wurde
            let link: URL = new URL(_request.url, `https://${_request.headers.host}`);

            //führt je nach pathname andere Schritte mit dem Query-Teil aus
            let path: string = link.pathname;
            switch (path) {
                case "/html":
                    //formt das oben entstandene Assoziative Array ins html-format um
                    _response.setHeader("pathname", path);
                    for (let key in url.query) {
                        _response.write("<li>" + key + ": " + url.query[key]);  
                    }
                    _response.end();
                    break;
                case "/json":
                    //formt beim /json pfad den Query-teil zu einem Json Objekt
                    let urlJson: string = JSON.stringify(url.query);
                    _response.setHeader("pathname", path);
                    _response.write(urlJson);
                    _response.end();
                    break;
                 default:
                        break;

            }

        }
    }
}