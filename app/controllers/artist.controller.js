import Controller from "../../app/helpers/api-core/controller.js"
import ArtistModel from "../models/artist.model.js";
import LastfmApi from "../helpers/lastfm-api.js";

export default class ArtistController extends Controller {

    artistSearch() {
        // loading the different input
        // if input is required, it will have no default value
        const searchArtist = this.input("artist");
        const limit = this.input("limit", 30);
        const page = this.input("page", 1);
        const format = this.input("format", "json");
        const filename = this.input("filename", "export");

        const results = [];

        const returnIfResults = (artists) => {
            for (const artist of artists) {
                results.push(new ArtistModel(artist.name, artist.mbid, artist.url, artist.image[1]["#text"], artist.image[3]["#text"]));
            }

            if(results.length === 0) {
                const randomArtist = ArtistModel.artistsName[Math.floor(Math.random() * ArtistModel.artistsName.length)];
                LastfmApi.getArtistInfo(randomArtist, limit, page).then(returnIfResults);
            } else {
                if (format === "csv") {
                    let csv = '"name";"mbid";"url";"image_small";"image"';
                    for (const artist of results.slice((page - 1) * limit, page * limit)) {
                        csv += "\n" + artist.toCSV();
                    }
                    this.respondCSV(csv, filename + ".csv");
                } else if (format === "json") {
                    this.respondSearch(results, searchArtist, 'artist', limit, page);
                } else {
                    this.error(400, "Invalid format - This service doesn't exist in that format");
                }
            }
        }
        LastfmApi.getArtistInfo(searchArtist, limit, page).then(returnIfResults);
    }

    artistSearchLocal() {
        // loading the different input
        // if input is required, it will have no default value
        const searchArtist = this.input("artist");
        const limit = this.input("limit", 30);
        const page = this.input("page", 1);
        const format = this.input("format", "json");
        const filename = this.input("filename", "export");

        const results = [];
        for (const artist of ArtistModel.artists) {
            if (artist.name.toLowerCase().includes(searchArtist.toLowerCase())) {
                results.push(artist);
            }
        }

        if(results.length === 0) {
            for (let i = 0; i < 5; i++) {
                results.push(ArtistModel.artists[[Math.floor(Math.random()*ArtistModel.artists.length)]]);
            }
        }

        if (format === "csv") {
            let csv = '"name";"mbid";"url";"image_small";"image"';
            for (const artist of results.slice((page - 1) * limit, page * limit)) {
                csv += "\n" + artist.toCSV();
            }
            this.respondCSV(csv, filename + ".csv");
        } else if (format === "json") {
            this.respondSearch(results, searchArtist, 'artist', limit, page);
        } else {
            this.error(400, "Invalid format - This service doesn't exist in that format");
        }
    }
}
