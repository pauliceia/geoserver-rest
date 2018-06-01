import validate from 'express-validation';

import policiesLayers from './../policies/layers'
import policiesAuth from './../policies/auth'
import { LayersController } from './../controllers/LayersController'

module.exports = (app, environment) => {

    const Layer = new LayersController();

    app.get(environment.pathBase + "/layers/:workspace/:datastore",
        validate(policiesLayers.get),    
        (req, res) => Layer.layers({ 
                workspace: req.params.workspace,
                datastore: req.params.datastore 
            })
            .then(response => res.status(200).send(response))
            .catch(error => res.status(error.status).send({ error: error.errors })));

    app.post(environment.pathBase + "/layer/publish", 
        validate(policiesLayers.publish), 
        (req, res) => Layer.publish(req.body)
            .then( _ => res.status(201).send())
            .catch(error => res.status(error.status).send({ error: error.errors })));

    app.delete(environment.pathBase + "/layer/remove/:workspace/:datastore/:layer",
        validate(policiesLayers.remove),
        (req, res) => Layer.remove({ 
                workspace: req.params.workspace,
                datastore: req.params.datastore,
                layer: req.params.layer
            })
            .then( _ => res.status(200).send())
            .catch(error => res.status(error.status).send({ error: error.errors })));

}