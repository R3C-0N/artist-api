import Env from "./api-core/env.js";

class LastfmApi {
    static async getArtistInfo(search, limit = 30, page = 1) {
        return fetch(`http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${search}&api_key=${Env.API_TOKEN}&format=json&limit=${limit}&page=${page}`)
            .then(response => response.json())
            .then(data => {
                return data.results.artistmatches.artist;
            });
    }
}

export default LastfmApi;
