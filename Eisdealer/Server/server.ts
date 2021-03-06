import * as Http from "http";
import * as Url from "url";
import * as Mongo from"mongodb";

export namespace EisdealerServer {
    interface Order {
        [type: string]: string | string[] | Ice[];

    }
    interface Ice {
        [type: string]: string | string[] | number;
       
    }
    let currentIces: Ice[] = new Array;
    let currentOrder: Order;
 
    let orders: Mongo.Collection;
    let port: string | number | undefined = Number(process.env.PORT);

    if (!port) {
        port = 8100;
    }
    startServer(port);
    connectToDatabase();

    function startServer(_port: number | string): void {
        let server: Http.Server = Http.createServer();
        console.log("Starting server");
 
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
                console.log("Falsche Eingabe, remote Datenbank wird verwendet");
                url = "mongodb+srv://User:irgendeinpasswort123@gisfabiankowatsch.hc0v1.mongodb.net/A11?retryWrites=true&w=majority";
        }
        let options: Mongo.MongoClientOptions = {useNewUrlParser: true, useUnifiedTopology: true};
        let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(url, options);
        await mongoClient.connect();
        orders = mongoClient.db("Eisdealer").collection("Orders");
        console.log("Database connection", orders != undefined);
    }


    function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
        console.log("Ruhe!");
       
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        
        if (_request.url) {          
                     
            let link: URL = new URL(_request.url, `http://${_request.headers.host}`);
            
            let path: string = link.pathname;
            switch (path) {
                case "/send":    
                    sendOrders(link.search);
                    _response.end();
                    break;
                case "/retrieve": 
                    retrieveOrders(_response); 
                    
                    break;
                case "/delete": 
                    deleteDbEntry(link.search);
                    _response.end(); 
                    
                    break;
                 default:
                    _response.end();
                    break;

            }              
        }
        }
    

    function sendOrders(_search: string): void {
        
        let orderArray: string[] = _search.split("$$");
       
        let url: Url.UrlWithParsedQuery = Url.parse(orderArray[0], true);
        currentOrder = <Order>url.query;
        
        for (let i: number = 1; i < orderArray.length; i++) {
            let url: Url.UrlWithParsedQuery = Url.parse(orderArray[i], true);
            currentIces.push(<Ice>url.query);          
        }
        currentOrder.ices = currentIces; 
        
        orders.insert(currentOrder);
    }

    async function retrieveOrders(_response: Http.ServerResponse): Promise<void> {
        let ordersArray: Order[] = await orders.find().toArray();
        _response.write(JSON.stringify(ordersArray));
        
        _response.end();
    }
    async function deleteDbEntry(_search: string): Promise<void> {
        let url: Url.UrlWithParsedQuery = Url.parse(_search, true);
        let str: string = <string>url.query["id"];
        
        
        await orders.deleteOne( {"_id": Mongo.ObjectId.bind(str)} );
    }
}