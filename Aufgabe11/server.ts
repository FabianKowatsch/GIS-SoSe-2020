import * as Http from "http";
import * as Url from "url";
import * as Mongo from"mongodb";

export namespace A11Server {
    interface Person {
        [type: string]: string | string[];
    }
    let personen: Mongo.Collection;
    console.log("Starting server");
    
    let port: string | number | undefined = Number(process.env.PORT);

    if (!port) {
        port = 8100;
    }
    startServer(port);
    connectToDatabase();

    function startServer(_port: number | string): void {
        let server: Http.Server = Http.createServer();
 
        server.addListener("request", handleRequest);
        server.listen(_port);
        console.log("Server ist gestartet und hört auf den port: " + _port);
    }

    async function connectToDatabase(): Promise<void> {
        let url: string;
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
                console.log("Falsche Eingabe, Remote Datenbank wird verwendet");
                url = "mongodb+srv://User:irgendeinpasswort123@gisfabiankowatsch.hc0v1.mongodb.net/A11?retryWrites=true&w=majority";
        }
        let options: Mongo.MongoClientOptions = {useNewUrlParser: true, useUnifiedTopology: true};
        let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(url, options);
        await mongoClient.connect();
        personen = mongoClient.db("A11").collection("Personen");
        console.log("Database connection", personen != undefined);
    }
    
    function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
        console.log("Ruhe!");
       
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        
        if (_request.url) {
            
            let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);          
            let link: URL = new URL(_request.url, `http://${_request.headers.host}`);
            
            let path: string = link.pathname;
            switch (path) {
                case "/retrieve":    
                    retrievePersons(_response);
                    break;
                case "/send": 
                    storePerson(<Person>url.query); 
                    _response.end();

                    break;
                 default:
                    _response.end();
                    break;

            }
        }
        }
    function storePerson(_person: Person): void {
        personen.insert(_person);
    }
    async function retrievePersons(_response: Http.ServerResponse): Promise<void> {
        let personenArray: Person[] = await personen.find().toArray();
        for (let i: number = 0; i < personenArray.length; i++) {  
            let aktuellePerson: Person = <Person>personenArray[i];
            for (let key in aktuellePerson) {
                _response.write(key + ":" + JSON.stringify(aktuellePerson[key]) + "<br/>");
            }
            _response.write("___________________________<br/>");
        }
        _response.end();
    } 
    }
