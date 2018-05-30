import logger from './../_config/logger'

export class LayersController {

    publish = async function(layerInfo){
        return new Promise( (resolve, reject) => {
            console.log(layerInfo)

            resolve('ok publish')
        })
    }

    remove = async function(name){
        return new Promise( (resolve, reject) => {
            console.log(name)

            resolve('ok remove')
        })
    }
}