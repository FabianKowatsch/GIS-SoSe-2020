"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.A11Server = void 0;
const Http = require("http");
const Url = require("url");
const Mongo = require("mongodb");
var A11Server;
(function (A11Server) {
    let personen;
    console.log("Starting server");
    let port = Number(process.env.PORT);
    if (!port) {
        port = 8100;
    }
    startServer(port);
    connectToDatabase();
    function startServer(_port) {
        let server = Http.createServer();
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
                url = "mongodb+srv://User:<password>@gisfabiankowatsch.hc0v1.mongodb.net/<dbname>?retryWrites=true&w=majority";
                break;
            default:
                console.log("Falsche Eingabe, Remote Datenbank wird verwendet");
                url = "mongodb+srv://User:<password>@gisfabiankowatsch.hc0v1.mongodb.net/<dbname>?retryWrites=true&w=majority";
        }
        let options = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient = new Mongo.MongoClient(url, options);
        await mongoClient.connect();
        personen = mongoClient.db("Test").collection("Personen");
        console.log("Database connection", personen != undefined);
    }
    function handleRequest(_request, _response) {
        console.log("Ruhe!");
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        if (_request.url) {
            let url = Url.parse(_request.url, true);
            let link = new URL(_request.url, `http://${_request.headers.host}`);
            let path = link.pathname;
            switch (path) {
                case "/retrieve":
                    retrievePersons(_response);
                    break;
                case "/send":
                    storePerson(url.query);
                    _response.end();
                    break;
                default:
                    _response.end();
                    break;
            }
        }
    }
    function storePerson(_person) {
        personen.insert(_person);
    }
    async function retrievePersons(_response) {
        let personenArray = await personen.find().toArray();
        for (let i = 0; i < personenArray.length; i++) {
            let aktuellePerson = personenArray[i];
            for (let key in aktuellePerson) {
                _response.write(key + ":" + JSON.stringify(aktuellePerson[key]) + "<br/>");
            }
            _response.write("___________________________<br/>");
        }
        _response.end();
    }
})(A11Server = exports.A11Server || (exports.A11Server = {}));
//# sourceMappingURL=server.js.map