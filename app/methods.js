import ArtistController from "./controllers/artist.controller.js";

const methods = {
    // Here are registered the different methods
    "GET" :{
        "artist.search": [ArtistController, "artistSearch"],
    },
    "POST" :{
    },
    "PUT" :{
    },
    "DELETE" :{
    }
};

export default methods;
