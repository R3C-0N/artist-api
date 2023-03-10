import http from 'http';
import ArtistModel from "../app/models/artist.model.js";
import RequestHandler from '../app/helpers/api-core/request-handler.js';
import Env from "../app/helpers/api-core/env.js";

Env.load();
ArtistModel.loadData();

const server = http.createServer((req, res) => {
    new RequestHandler().handle(req, res);
});

server.listen(Env.PORT, Env.HOSTNAME, () => {
    console.log(`Server running at http://${Env.HOSTNAME}:${Env.PORT}/`);
});
