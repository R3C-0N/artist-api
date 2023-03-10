import * as fs from "fs";

class ArtistModel {
    static artists = [];
    static artistsName = [];

    /** @type {string} */
    name;

    /** @type {string} */
    mbid;

    /** @type {string} */
    url;

    /** @type {string} */
    image_small;

    /** @type {string} */
    image;

    constructor(name, mbid, url, image_small, image) {
        this.name = name;
        this.mbid = mbid;
        this.url = url;
        this.image_small = image_small;
        this.image = image;
    }

    toString() {
        return this.name;
    }

    toCSV() {
        return `"${this.name}";"${this.mbid}";"${this.url}";"${this.image_small}";"${this.image}"`;
    }

    static _loadfromJson() {
        const __dirname = process.cwd();
        fs.readFile(__dirname + "/datas/artists.json", 'utf8', function (err, data) {
            const jsonParsed = JSON.parse(data).artists;
            for (const artist of jsonParsed) {
                ArtistModel.artists.push(new ArtistModel(artist.name, artist.mbid, artist.url, artist.image_small, artist.image));
            }
            console.log("Loaded " + ArtistModel.artists.length + " artists from JSON file.")
        });
    }

    static _loadRandomArtistName() {
        const __dirname = process.cwd();
        fs.readFile(__dirname + "/datas/random.artist.name.json", 'utf8', function (err, data) {
            const jsonParsed = JSON.parse(data);
            for (const artist of jsonParsed) {
                ArtistModel.artistsName.push(artist);
            }
            console.log("Loaded " + ArtistModel.artistsName.length + " random artists name from JSON file.")
        });
    }

    static loadData() {
        ArtistModel._loadfromJson();
        ArtistModel._loadRandomArtistName();
    }
}

export default ArtistModel;
