import ArtistController from "./controllers/artist.controller.js";

/**
 * Here are registered the different methods
 *
 * @type {Object}
 * @property {Object} GET GET methods
 * @property {Object} POST POST methods
 * @property {Object} PUT PUT methods
 * @property {Object} DELETE DELETE methods
 */
const methods = {
    "GET" :{
        "artist.search": [ArtistController, "artistSearch"],
        "artist.search.local": [ArtistController, "artistSearchLocal"],
    },
    "POST" :{
    },
    "PUT" :{
    },
    "DELETE" :{
    }
};

export default methods;
