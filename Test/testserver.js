"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.A08Server = void 0;
const Http = require("http");
const url = require("url");
var A08Server;
(function (A08Server) {
    console.log("Starting server");
    let port = Number(process.env.PORT);
    if (!port)
        port = 8100;
    let server = Http.createServer();
    server.addListener("request", handleRequest);
    server.addListener("listening", handleListen);
    server.listen(port);
    let adresse = "http://localhost:8080/default.htm?jahr=2017&monat=february";
    //Adresse parsen (umwandeln):
    let q = url.parse(adresse, true);
    /*Die parse Methode gibt ein Objekt zurück, dass die URL Eigenschaften enthält. So können die fest definierten Eigenschaften einer URL ausgelesen werden:*/
    console.log(q.host);
    console.log(q.pathname);
    console.log(q.search);
    /*Die query Eigenschaft gibt ein Ojekt zurück, dass alle query-string Parameter als Eigenschaften besitzt. So können beliebig gesendete Attribute ausgelesen werden:*/
    var qdata = q.query;
    console.log(qdata.monat);
    function handleListen() {
        console.log("Listening");
    }
    function handleRequest(_request, _response) {
        console.log("I hear voices!");
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        _response.write(_request.url);
        _response.end();
    }
})(A08Server = exports.A08Server || (exports.A08Server = {}));
//# sourceMappingURL=testserver.js.map