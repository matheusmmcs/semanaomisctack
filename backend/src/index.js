const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');

const routes = require('./routes');
const { setupWebsocket } = require('./websocket');

const app = express();
const server = http.Server(app);

setupWebsocket(server);

//https://cloud.mongodb.com
let dbUser = 'matheusmmcs';
let dbPass = 'm3s121n2';
let dbName = 'omnistack';
mongoose.connect(`mongodb+srv://${dbUser}:${dbPass}@cluster0-waivm.mongodb.net/${dbName}?retryWrites=true&w=majority`, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
})

//app.use(cors({ origin: 'http://localhost:3000' }));
app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333);