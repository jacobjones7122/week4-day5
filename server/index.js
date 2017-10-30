let express = require("express");
let app = express();
let mongo = require("mongodb").MongoClient;
let db;
let path = require("path");
let clientPath = path.join(__dirname, '../client');
let bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//server connection to mongo
mongo.connect('mongodb://localhost:27017/pizzaPlanet',
(err, pizzaPlanet) => {
    if(err) {console.log(err);}
    else {
        db = pizzaPlanet;
        console.log('success');
    }
});

//load page
app.get('/', (req, res) => { res.sendFile(path.join(clientPath, 'index.html')); });

//post new locations
app.post('/api/locations', function(req, res) {
    let location = req.body;
    console.log(location);
    db.collection("locations").insertOne({
        location, function(err, results){
            if (err) {res.status(500).send(err);}
            else {res.status(201).send(results);}
        }
    })
});

//get all locations
app.get("/api/locations", function(req, res) {
    db.collection('locations', function(err, collection) {
        collection.find().toArray(function(err, results){ res.status(201).send(results); });
    });
})

app.use(express.static(clientPath));

app.listen(3000, function(){ 
    console.log('Running Server...')
});