import http from 'http';
import ArtistModel from "../app/models/artist.model.js";
import RequestHandler from '../app/helpers/api-core/request-handler.js';
import Env from "../app/helpers/api-core/env.js";

// Load environment variables
Env.load();
// Load artist data from files
ArtistModel.loadData();

// Create server
const server = http.createServer((req, res) => {
    // Handle requests
    new RequestHandler().handle(req, res);
});

// Start server
server.listen(Env.PORT, Env.HOSTNAME, () => {
    console.log(`Server running at http://${Env.HOSTNAME}:${Env.PORT}/`);
});
