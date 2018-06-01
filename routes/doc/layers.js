/**
 * @api {get} /layers/:workspace/:datastore get layers
 * @apiGroup Layers
 *
 * @apiParam {String} workspace workspace name
 * @apiParam {String} datastore datastore name
 * @apiSuccessExample {json} Sucess
 *    HTTP/1.1 200 OK
 *    {
 *        "featureTypes": {
 *            "featureType": [
 *                {
 *                    "name": "layer_1001",
 *                    "href": "http://localhost:8080/geoserver/rest/workspaces/Pauliceia/datastores/database/featuretypes/layer_1001.json"
 *                },
 *                {
 *                    "name": "layer_1002",
 *                    "href": "http://localhost:8080/geoserver/rest/workspaces/Pauliceia/datastores/database/featuretypes/layer_1002.json"
 *                }
 *            ]
 *        }
 *    }
 * 
 * @apiErrorExample {json} Not Found
 *    HTTP/1.1 404 not found
 *    {
 *        "error": [{
 *            "messages": [
 *                "ERRO: workspace or datastore not found"
 *            ]
 *        }]
 *    }
 * 
 * @apiErrorExample {json} Geoserver not running
 *    HTTP/1.1 500 bad
 *    {
 *        "error": [{
 *            "messages": [
 *                "ERRO: connection with geoserver"
 *            ]
 *        }]
 *    }
 */

/**
 * @api {post} /layer/publish publish layer
 * @apiGroup Layers
 *
 * @apiParam {String} workspace workspace name
 * @apiParam {String} datastore datastore name
 * @apiParam {String} layer layer name
 * @apiParam {String} description layer description
 * @apiParam {String} projection layer projection
 * 
 * @apiParamExample {json} Request-Example:
 *    {
 *        "workspace": "Pauliceia",
 *        "datastore": "database",
 *        "layer": "layer_1005",
 *        "description": "Descrição da layer 1005",
 *        "projection": "EPSG: 4326"
 *    }
 * 
 * @apiSuccessExample {json} Sucess
 *    HTTP/1.1 200 OK
 * 
 * @apiErrorExample {json} Errors
 *    HTTP/1.1 404 not found
 *    {
 *        "error": [{
 *            "messages": [
 *                "layer not found",
 *                "No such data store: Pauliceia,databasse",
 *                "Resource named 'layer_1002' already exists in store: 'database'"
 *            ]
 *        }]
 *    }
 * 
 * @apiErrorExample {json} Geoserver not running
 *    HTTP/1.1 500 bad
 *    {
 *        "error": [{
 *            "messages": [
 *                "ERRO: connection with geoserver"
 *            ]
 *        }]
 *    }
 */

 /**
 * @api {delete} /layer/remove/:workspace/:datastore/:layer remove layer
 * @apiGroup Layers
 *
 * @apiParam {String} workspace workspace name
 * @apiParam {String} datastore datastore name
 * @apiParam {String} layer layer name
 * 
 * @apiSuccessExample {json} Sucess
 *    HTTP/1.1 200 OK
 * 
 * @apiErrorExample {json} Errors
 *    HTTP/1.1 404 not found
 *    {
 *        "error": [{
 *            "messages": [
 *                "No such feature type: Pauliceia,database,layer_100"
 *            ]
 *        }]
 *    }
 * 
 * @apiErrorExample {json} Geoserver not running
 *    HTTP/1.1 500 bad
 *    {
 *        "error": [{
 *            "messages": [
 *                "ERRO: connection with geoserver"
 *            ]
 *        }]
 *    }
 */

