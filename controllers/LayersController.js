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

            console.log(options)
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

    publish = async function(layerInfo){
        return new Promise( (resolve, reject) => {
            try{
                let bodyXML = `<featureType> 
                    <name>layer_1001</name> 
                    <nativeName>layer_1001</nativeName>
                    <description>publicacao teste layer</description>
                    <srs>EPSG:4326</srs>
                    <store class="dataStore">
                        <name>database</name>
                    </store>
                </featureType>`

                let options = {
                    url: 'http://localhost:8080/geoserver/rest/workspaces/Pauliceia/datastores/database/featuretypes.xml',
                    method: 'POST',
                    headers: {
                        "Content-Type": "text/xml",
                        "Content-Length": bodyXML.length
                    },
                    auth: {
                        'user': 'admin',
                        'pass': 'geoserver'
                    },
                    body: bodyXML
                }

                request(options, (err, resp, body) => {
                    if(!err) {
                        console.log(body)
                        resolve('ok')

                    } else {
                        //console.log(resp)
                        throw(err)
                    }
                })

            } catch(err) {
                reject(err)
            }
        })
    }

    remove = async function(name){
        return new Promise( (resolve, reject) => {
            try{
                console.log(layerInfo)
                resolve('ok')

            } catch(err) {
                reject(err)
            }
        })
    }
}