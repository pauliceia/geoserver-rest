import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import http from 'http'
import morgan from 'morgan'

import https from 'https'
import fs from 'fs'

import logger from './../_config/logger'
import environment from './../_config/environment'

export class Server {

    app = express()
    server = null

    initConfig() {
        return new Promise( (resolve, reject) => {
            try {
                this.app.use(morgan("common", {
                    skip: (req, res) => res.statusCode >= 400 || process.env.NODE_ENV == 'test',
                    stream: {
                        write: (msg) => {
                        logger.info(msg)
                        }
                    }
                }))
            
                this.app.use(morgan("common", {
                    skip: (req, res) => res.statusCode < 400 || process.env.NODE_ENV == 'test',
                    stream: {
                        write: (msg) => {
                        logger.error(msg)
                        }
                    }
                }))
                  
                this.app.use(bodyParser.urlencoded({ extended: true }));
                this.app.use(bodyParser.json());

                this.app.use(cors({
                    origin: "*",
                    methods: ["GET", "POST", "PUT", "DELETE"],
                    allowedHeaders: ["Content-Type", "Authorization"]
                }));

                this.app.use(helmet());

                require('../_config/passport')(this.app, environment)

                resolve(require('../routes')(this.app, environment))

            } catch(error) {
                reject(error)
            }
        })
    }

    initServer() {
        return new Promise( (resolve, reject) => {
            let server

            if(environment.authentication.enableHTTPS) {
                const credentials = {
                    key: fs.readFileSync(environment.authentication.certificate, "utf8"),
                    cert: fs.readFileSync(environment.authentication.certificate, "utf8")
                }
                server = https.createServer(credentials, this.app)
            } else{
                server = http.createServer(this.app);
            }
            server.listen( environment.port, () =>  resolve() )

            this.app.use(function(err, req, res, next){
                res.status(400).json(err);
                reject(err)
            });
        })
    }

    start() {
        return this.initConfig()
                .then( () => this.initServer()
                .then( () => this ))
    }

    shutdown() {
        return this.server.close()
    }

}