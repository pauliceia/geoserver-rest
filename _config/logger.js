import winston from 'winston'
import fs from 'fs'

if(!fs.existsSync('logs')){
    fs.mkdirSync('logs')
}

const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.json()
    ),    
    transports: [
        new winston.transports.File({ 
            filename: 'logs/access.log', level: 'info', maxsize: 10000000, maxFiles: 4
        }),
        new winston.transports.File({ 
            filename: 'logs/error.log', level: 'error', maxsize: 10000000, maxFiles: 6
        })
    ]
})

if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}

export default logger;