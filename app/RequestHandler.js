import methods from './methods.js';
import Controller from "./class/controller.js";
import Stop from "./class/stop.js";

class RequestHandler {
    methods = {
        'GET': {},
        'POST': {},
        'PUT': {},
        'DELETE': {}
    }

    httpMethod = null;
    url = "";
    inputs = {};

    constructor() {
        this.methods = methods;
        this.url = null;
    }

    getRequestedMethod() {
        return this.inputs.method ?? "none";
    }

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
            if(e instanceof Stop) {
                console.log("Stop: " + e.message);
            } else {
                console.error(e);
            }
            // new Controller(request, response).error(500, "Internal server error");
        }
    }
}

export default RequestHandler;
