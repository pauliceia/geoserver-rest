import logger from './../_config/logger'
import request from 'request'
import xml2js from 'xml2js'
import environment from '../_config/environment';

const parserXml2js = xml2js.parseString

function x2js(xml) {
    return new Promise( resolve => {
        parserXml2js(xml, ( _ ,result) => {
            resolve(result)
        })
    })
}

// async function was_layer_already_published_in_workspace_datastore(workspace, datastore, layerSld){
//     let list_published_layers = await this.layers({workspace, datastore})
//     return list_published_layers["featureTypes"]["featureType"].some(layer => layer.name == layerSld)
// }

export class LayersController {

    layers = function(params){
        return new Promise( (resolve, reject) => {
            let options = {
                url: `${environment.geoserver.url}/rest/workspaces/${params.workspace}/datastores/${params.datastore}/featuretypes.json`,
                auth: {
                    'user': environment.geoserver.user,
                    'pass': environment.geoserver.password
                }
            }

            request(options, (err, resp, body) => {
                if(!err && resp.statusCode == 200) {
                    resolve(JSON.parse(body))

                } else if( !err ){
                    reject({
                        status: 404,
                        errors: [{
                            messages: ["ERRO: workspace or datastore not found"]
                        }]
                    })

                } else{
                    logger.error(err)
                    reject({
                        status: 500,
                        errors: [{
                            messages: ["ERRO: connection with geoserver"]
                        }]
                    })
                }
            })
        })
    }

    publish = function(infos){
        return new Promise( (resolve, reject) => {
            let { workspace, datastore, layer, description, projection } = infos

            this.remove({workspace, datastore, layer}).then( _ => {
                throw 'err'

            }).catch(_ => {
                let bodyXML = `<featureType>
                <name>${layer}</name>
                <nativeName>${layer}</nativeName>
                <description>${description}</description>
                <srs>${projection.replace(" ", "")}</srs>
                <store class="dataStore">
                    <name>${datastore}</name>
                </store>
                </featureType>`

                let options = {
                    url: `${environment.geoserver.url}/rest/workspaces/${workspace}/datastores/${datastore}/featuretypes.xml`,
                    method: 'POST',
                    headers: {
                        "Content-Type": "text/xml",
                        "Content-Length": bodyXML.length
                    },
                    auth: {
                        'user': environment.geoserver.user,
                        'pass': environment.geoserver.password
                    },
                    body: bodyXML.replace(/(\r\n\t|\n|\r\t)/gm,"")
                }

                request(options, (err, resp, body) => {
                    if(!err && !body) {
                        resolve()

                    } else if(!err){
                        logger.error(body)
                        let message
                        if(resp.statusCode == 400) message = "layer not found"
                        else message = body

                        reject({
                            status: 404,
                            errors: [{
                                messages: [message]
                            }]
                        })

                    } else {
                        logger.error(err)
                        reject({
                            status: 500,
                            errors: [{
                                messages: ["ERRO: connection with geoserver"]
                            }]
                        })
                    }
                })
            })
                
        })
    }

    remove = async function(params){
        return new Promise( (resolve, reject) => {
            let options = {
                url: `${environment.geoserver.url}/rest/layers/${params.workspace}:${params.layer}.xml`,
                auth: {
                    'user': environment.geoserver.user,
                    'pass': environment.geoserver.password
                },
                method: 'DELETE'
            }

            request(options, (err, resp, body) => {

                let options = {
                    url: `${environment.geoserver.url}/rest/workspaces/${params.workspace}/datastores/${params.datastore}/featuretypes/${params.layer}.xml`,
                    auth: {
                        'user': environment.geoserver.user,
                        'pass': environment.geoserver.password
                    },
                    method: 'DELETE'
                }

                request(options, (err, resp, body) => {
                    if(!err && !body) {
                        resolve()

                    } else if(!err){
                        logger.error(body)
                        reject({
                            status: 404,
                            errors: [{
                                messages: [body]
                            }]
                        })

                    } else {
                        logger.error(err)
                        reject({
                            status: 500,
                            errors: [{
                                messages: ["ERRO: connection with geoserver"]
                            }]
                        })
                    }
                })

            })
        })
    }
}