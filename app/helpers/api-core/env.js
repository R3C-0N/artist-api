import dotenv from 'dotenv';

class Env {
    static APP = "";
    static API_KEY = "";
    static SHARED_SECRET = "";
    static REGISTRED_TO = "";
    static HOSTNAME = "";
    static PORT = 0;

    static load() {
        dotenv.config();
        Env.APP = process.env.APP;
        Env.API_TOKEN = process.env.API_TOKEN;
        Env.SHARED_SECRET = process.env.SHARED_SECRET;
        Env.REGISTRED_TO = process.env.REGISTRED_TO;
        Env.HOSTNAME = process.env.HOSTNAME;
        Env.PORT = process.env.PORT;
    }
}

export default Env;
