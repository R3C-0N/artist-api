import ArtistController from "./controllers/artist.controller.js";

const methods = {
    // Here are registered the different methods
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
