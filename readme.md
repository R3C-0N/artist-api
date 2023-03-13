# NodeJS Artist API

## by [Mathis Medard](https://github.com/R3C-0N)

## Description

This is a simple API to get informations about artists based on the following
endpoint [artist.search](https://www.last.fm/api/show/artist.search)

In order to keep it as simple as possible, I also decided not to use classic dependencies such as express.

## Installation

```bash
npm install
```

## Usage

```bash
npm start
```

## API Endpoints

### GET artist.search

Search for an artist by name from Last.fm. Returns artist matches sorted by relevance. \
If no match is found, return result for a random artist name.

#### Example URLs:

**CSV:** /?method=artist.search&artist=cher&limit=5&format=csv \
**JSON:** /?method=artist.search&artist=cher&limit=5

#### Parameters:

| Parameter    | Required/Optional                            | Default value | Expected         | Description                                                     |
|--------------|----------------------------------------------|---------------|------------------|-----------------------------------------------------------------|
| **artist**   | <span style="color: red">(Required)</span>   |               | String           | The artist name.                                                |
| **limit**    | <span style="color: green">(Optional)</span> | 30            | positive integer | The number of results to fetch per page. Defaults to 30.        |
| **page**     | <span style="color: green">(Optional)</span> | 1             | positive integer | The page number to fetch. Defaults to first page.               |
| **format**   | <span style="color: green">(Optional)</span> | json          | JSON, CSV        | The format to return. Defaults to JSON. (JSON, CSV)             |
| **filename** | <span style="color: green">(Optional)</span> | export        | string           | In case of csv format, filename to return. Defaults artist.csv. |

#### Sample Response:

#### JSON

```JSON
{
  "result": {
    "searchTerms": "cher",
    "itemsPerPage": "5",
    "page": "1",
    "totalResults": "5",
    "artists": [
      {
        "name": "Cher",
        "mbid": "bfcc6d75-a6a5-4bc6-8282-47aec8531818",
        "url": "https://www.last.fm/music/Cher",
        "image_small": "https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png",
        "image": "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png"
      },
      {
        "name": "Cher Lloyd",
        "mbid": "48fbfb0b-92ee-45eb-99c2-0bde4c05962e",
        "url": "https://www.last.fm/music/Cher+Lloyd",
        "image_small": "https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png",
        "image": "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png"
      },
      {
        "name": "Cheryl Cole",
        "mbid": "2d499150-1c42-4ffb-a90c-1cc635519d33",
        "url": "https://www.last.fm/music/Cheryl+Cole",
        "image_small": "https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png",
        "image": "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png"
      },
      {
        "name": "CHERRY BULLET",
        "mbid": "",
        "url": "https://www.last.fm/music/CHERRY+BULLET",
        "image_small": "https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png",
        "image": "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png"
      },
      {
        "name": "Cherry Glazerr",
        "mbid": "64a0c404-58af-4083-8fc6-a6725ef02ecb",
        "url": "https://www.last.fm/music/Cherry+Glazerr",
        "image_small": "https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png",
        "image": "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png"
      }
    ]
  }
}
```

#### CSV (in a file)

```CSV
"name";"mbid";"url";"image_small";"image"
"Cher";"bfcc6d75-a6a5-4bc6-8282-47aec8531818";"https://www.last.fm/music/Cher";"https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png";"https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png"
"Cher Lloyd";"48fbfb0b-92ee-45eb-99c2-0bde4c05962e";"https://www.last.fm/music/Cher+Lloyd";"https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png";"https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png"
"Cheryl Cole";"2d499150-1c42-4ffb-a90c-1cc635519d33";"https://www.last.fm/music/Cheryl+Cole";"https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png";"https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png"
"CHERRY BULLET";"";"https://www.last.fm/music/CHERRY+BULLET";"https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png";"https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png"
"Cherry Glazerr";"64a0c404-58af-4083-8fc6-a6725ef02ecb";"https://www.last.fm/music/Cherry+Glazerr";"https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png";"https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png"
```


### GET artist.search.local

Do the same as `artist.search` but only for artists from the local files (incomplete database). \
This is useful if you want to search for an artist and you don't have Last.fm API token.
