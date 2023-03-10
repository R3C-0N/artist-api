import methods from '../../methods.js';
import Controller from "./controller.js";
import Stop from "./stop.js";

class RequestHandler {

    /** @type {Object} Default methods (empty) */
    methods = {
        GET: {},
        POST: {},
        PUT: {},
        DELETE: {}
    }

    /** @type {string|null} HTTP method (GET, POST, PUT, DELETE) */
    httpMethod = null;

    /** @type {string} Complete requested URL */
    url = "";

    /** @type {Object} Requested inputs */
    inputs = {};

    constructor() {
        // Load methods from methods.js file
        this.methods = methods;
    }

    getRequestedMethod() {
        return this.inputs.method ?? "none";
    }

    /**
     * Get inputs from request
     *
     * @param {IncomingMessage} request
     * @returns {Object} Inputs
     */
    getInputs(request) {
        const params = request.url.split('?');
        if (params.length > 1) {

            for (const param of params[1].split('&')) {
                const [key, value] = param.split('=');
                if(key) {
                    this.inputs[key] = decodeURIComponent(value).replace(/^"+/, '').replace(/"+$/, '') ?? true;
                }
            }
        }
        return this.inputs;
    }

    /**
     * Handle request
     *
     * @param {IncomingMessage} request
     * @param {ServerResponse} response
     */
    handle(request, response) {
        try {
            this.httpMethod = request.method;
            this.getInputs(request);
            this.url = request.url;
            const controller = this.methods[this.httpMethod][this.getRequestedMethod()];

            if (controller) {
                const instance = new controller[0](request, response, this.inputs);
                console.log(this.httpMethod + " " + controller[0].name + "@" + controller[1] + " " + JSON.stringify(this.inputs));
                instance[controller[1]]();
            } else {
                new Controller(request, response).error(404, "Not found, try with another method like method=artist.search");
            }
        } catch (e) {
            // Stop exception is used to stop the execution of the request in case of input errors
            if(e instanceof Stop) {
                console.log("Stop: " + e.message);
            } else {
                console.error(e);
            }
        }
    }
}

export default RequestHandler;
