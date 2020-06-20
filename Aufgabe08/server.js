"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.A08Server = void 0;
const Http = require("http");
var A08Server;
(function (A08Server) {
    console.log("Starting server");
    //setzt den port, falls nicht vorhanden auf 8100
    let port = Number(process.env.PORT);
    if (!port)
        port = 8100;
    //erstellt eine Instanz der HTTP-Server-Klasse
    let server = Http.createServer();
    //fügt Events für Aufruf und Anfrage zu
    server.addListener("request", handleRequest);
    server.addListener("listening", handleListen);
    server.listen(port);
    // gibt "Listening" aus, wenn der Server bereit ist 
    function handleListen() {
        console.log("Listening");
    }
    function handleRequest(_request, _response) {
        console.log("I hear voices!");
        //setzt http header-werte der response
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        //schreibt in den body der response
        _response.write(_request.url);
        console.log(_request.url);
        _response.end();
    }
})(A08Server = exports.A08Server || (exports.A08Server = {}));
//# sourceMappingURL=server.js.map