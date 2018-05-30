import { Server } from './_server/index'
import environment from './_config/environment'
import logger from './_config/logger'

const server = new Server();

server.start()
    .then( server => {
        logger.info(`${environment.name} running success - port ${environment.port}`)

    }).catch( error => {
        console.log(error)
        logger.error('Erro starting: '+error)
        process.exit(1)

    })

