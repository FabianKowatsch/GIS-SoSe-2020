"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.A09Server = void 0;
const Http = require("http");
const Url = require("url");
var A09Server;
(function (A09Server) {
    console.log("Starting server");
    //setzt den port, falls nicht vorhanden auf 8100
    let port = Number(process.env.PORT);
    if (!port)
        port = 8200;
    //erstellt eine Instanz der HTTP-Server-Klasse
    let server = Http.createServer();
    //fügt Events für Aufruf und Anfrage zu
    server.addListener("request", handleRequest);
    server.addListener("listening", handleListen);
    server.listen(port);
    // gibt "Listening" aus, wenn der Server bereit ist
    function handleListen() {
        console.log("Server bereit");
    }
    function handleRequest(_request, _response) {
        console.log("Ruhe!");
        //setzt http header-werte der response
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        if (_request.url) {
            //erstellt aus dem query-teil ein assoziatives Array
            let url = Url.parse(_request.url, true);
            //erstellt die url, mit der die Anfrage gestellt wurde
            let link = new URL(_request.url, `https://${_request.headers.host}`);
            //führt je nach pathname andere Schritte mit dem Query-Teil aus
            let path = link.pathname;
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
                    let urlJson = JSON.stringify(url.query);
                    _response.setHeader("pathname", path);
                    _response.write(urlJson);
                    _response.end();
                    break;
                default:
                    break;
            }
        }
    }
})(A09Server = exports.A09Server || (exports.A09Server = {}));
//# sourceMappingURL=server.js.map