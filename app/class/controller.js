import Stop from "./stop.js";

export default class Controller {
    /** @type {module:http.IncomingMessage} */
    request;

    /** @type {ServerResponse} */
    response;

    /** @type {Object} */
    inputs;

    constructor(request, response, inputs = {}) {
        this.request = request;
        this.inputs = inputs;
        this.response = response;
        this.response.setHeader('Content-Type', 'application/json');
    }

    input(key, defaultValue) {
        const result = this.inputs[key];
        if (result) {
            return result;
        } else if (defaultValue !== undefined) {
            return defaultValue;
        } else {
            this.error(400, "Missing parameter: " + key);
        }
    }

    addHeader(key, value) {
        this.response.setHeader(key, value);
    }

    error(code, message) {
        this.response.statusCode = code;
        this.response.end(JSON.stringify({message: message, "error": code}));
        throw new Stop(message);
    }

    respond(data) {
        this.response.statusCode = 200;
        this.response.end(JSON.stringify({result: data}));
    }


    respondSearch(data, searchTerm, searchObject, limit, page) {
        this.response.statusCode = 200;
        const response = {
            "searchTerms": searchTerm,
            "itemsPerPage": limit.toString(),
            "page": page.toString(),
            "totalResults": data.length.toString()
        };
        response[searchObject + "s"] = data.slice((page - 1) * limit, page * limit)
        this.respond(response);
    }

    respondCSV(data, filename) {
        this.response.statusCode = 200;
        this.response.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
        this.response.setHeader('Content-Type', 'text/csv');
        this.response.end(data);
    }
}
