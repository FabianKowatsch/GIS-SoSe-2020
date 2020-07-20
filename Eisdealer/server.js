"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EisdealerServer = void 0;
const Http = require("http");
const Url = require("url");
const Mongo = require("mongodb");
var EisdealerServer;
(function (EisdealerServer) {
    let currentIces = new Array;
    let currentOrder;
    let orders;
    let port = Number(process.env.PORT);
    if (!port) {
        port = 8100;
    }
    startServer(port);
    connectToDatabase();
    function startServer(_port) {
        let server = Http.createServer();
        console.log("Starting server");
        server.addListener("request", handleRequest);
        server.listen(_port);
        console.log("Server ist gestartet und hört auf den port: " + _port);
    }
    async function connectToDatabase() {
        let url;
        switch (process.argv.slice(2)[0]) {
            case "local":
                console.log("Lokale Datenbank wird verwendet");
                url = "mongodb://localhost:27017";
                break;
            case "remote":
                console.log("Remote Datenbank wird verwendet");
                url = "mongodb+srv://User:irgendeinpasswort123@gisfabiankowatsch.hc0v1.mongodb.net/A11?retryWrites=true&w=majority";
                break;
            default:
                console.log("Falsche Eingabe, remote Datenbank wird verwendet");
                url = "mongodb+srv://User:irgendeinpasswort123@gisfabiankowatsch.hc0v1.mongodb.net/A11?retryWrites=true&w=majority";
        }
        let options = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient = new Mongo.MongoClient(url, options);
        await mongoClient.connect();
        orders = mongoClient.db("Eisdealer").collection("Orders");
        console.log("Database connection", orders != undefined);
    }
    function handleRequest(_request, _response) {
        console.log("Ruhe!");
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        if (_request.url) {
            let link = new URL(_request.url, `http://${_request.headers.host}`);
            let path = link.pathname;
            switch (path) {
                case "/send":
                    sendOrders(link.search);
                    _response.end();
                    break;
                case "/order":
                    retrieveOrders(_response);
                    _response.end();
                    break;
                default:
                    _response.end();
                    break;
            }
        }
    }
    function sendOrders(_search) {
        console.log(_search);
        let orderArray = _search.split("$$");
        console.log(orderArray);
        let url = Url.parse(orderArray[0], true);
        currentOrder = url.query;
        console.log(currentOrder);
        for (let i = 1; i < orderArray.length; i++) {
            let url = Url.parse(orderArray[i], true);
            currentIces.push(url.query);
        }
        currentOrder.ices = currentIces;
        console.log(currentOrder);
        orders.insert(currentOrder);
    }
    async function retrieveOrders(_response) {
        let ordersArray = await orders.find().toArray();
        for (let i = 0; i < ordersArray.length; i++) {
            let aktuelleOrder = ordersArray[i];
            for (let key in aktuelleOrder) {
                _response.write(key + ":" + JSON.stringify(aktuelleOrder[key]) + "<br/>");
            }
            _response.write("___________________________<br/>");
        }
        _response.end();
    }
})(EisdealerServer = exports.EisdealerServer || (exports.EisdealerServer = {}));
//# sourceMappingURL=server.js.map