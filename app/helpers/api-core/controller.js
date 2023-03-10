import Stop from "./stop.js";

export default class Controller {
    /** @type {IncomingMessage} */
    request;

    /** @type {ServerResponse} */
    response;

    /** @type {Object} */
    inputs;

    /**
     * @param {IncomingMessage} request
     * @param {ServerResponse} response
     * @param {Object} inputs
     */
    constructor(request, response, inputs = {}) {
        this.request = request;
        this.inputs = inputs;
        this.response = response;
        this.response.setHeader('Content-Type', 'application/json');
    }

    /**
     * Get input value
     *
     * If input is not set, return default value
     *
     * If input is not set and default value is not set, throw error because input is required
     *
     * @param {string} key Input key
     * @param {any} defaultValue Default value
     * @returns {*} Input value
     */
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

    /**
     * Respond with error and stop execution
     *
     * @param {int} code HTTP status code
     * @param {string} message Error message
     */
    error(code, message) {
        this.response.statusCode = code;
        this.response.end(JSON.stringify({message: message, "error": code}));
        throw new Stop(message);
    }

    /**
     * Display data as JSON
     *
     * @param {Object} data
     */
    respond(data) {
        this.response.statusCode = 200;
        this.response.end(JSON.stringify({result: data}));
    }


    /**
     * Display search result as JSON
     *
     * @param {array} data result of the search
     * @param {string} searchTerm searched term
     * @param {string} searchObject object searched
     * @param {int} limit number of items per page
     * @param {int} page page number
     */
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

    /**
     * Respond with CSV file
     *
     * @param {array} data
     * @param {string} filename
     */
    respondCSV(data, filename) {
        this.response.statusCode = 200;
        this.response.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
        this.response.setHeader('Content-Type', 'text/csv');
        this.response.end(data);
    }
}
