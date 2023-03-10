import http from 'http';
import ArtistModel from "../app/models/artist.model.js";
import RequestHandler from '../app/RequestHandler.js';

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    new RequestHandler().handle(req, res);
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
    ArtistModel.loadData();
});
