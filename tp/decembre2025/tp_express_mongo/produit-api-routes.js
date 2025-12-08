import express from 'express';
const apiRouter = express.Router();
import { statusCodeFromEx, nullOrEmptyObject } from "./generic-express-util.js";
import produitDao from './produit-dao-mongoose.js';
//PersistentProduitModel to use only for specific extra request (not in dao)
var PersistentProduitModel = produitDao.ThisPersistentModel;
/*
conventions d'URL :
http://localhost:8282/produit-api/private/xyz en accès private (avec auth nécessaire)
http://localhost:8282/produit-api/public/xyz en accès public (sans auth nécessaire)
NB: dans vrai projet d'entreprise , public pour get pas confidentiel et private pour tout le reste
ICI Exceptionnellement EN TP , presques toutes les URLs sont doublées : appelables en public et private
NB2: par défaut les requetes en mode DELETE ou PUT retourneront "204/NoContent" quand tout se passe bien
via l'option facultative ?v=true (au sens verbose=true) la réponse sera 200/OK accompagné d'un message json
*/
//exemple URL: http://localhost:8282/produit-api/public/reinit
apiRouter.route(['/produit-api/public/reinit', '/produit-api/private/reinit'])
    .get(async function (req, res, next) {
        try {
            let doneActionMessage = await produitDao.reinit_db();
            res.send(doneActionMessage);
        } catch (ex) {
            res.status(statusCodeFromEx(ex)).send(ex);
        }
    });
//exemple URL: http://localhost:8282/produit-api/public/produit/618d53514e0720e69e2e54c8
apiRouter.route('/produit-api/public/produit/:id')
    .get(async function (req, res, next) {
        var idProduit = req.params.id;
        try {
            let Produit = await produitDao.findById(idProduit);
            res.send(Produit);
        } catch (ex) {
            res.status(statusCodeFromEx(ex)).send(ex);
        }
    });
// exemple URL: http://localhost:8282/produit-api/public/produit
// returning all produits if no ?prixMini
// http://localhost:8282/produit-api/public/produit?prixMini=1.05
apiRouter.route('/produit-api/public/produit')
    .get(async function (req, res, next) {
        var prixMini = req.query.prixMini;
        var criteria = prixMini ? { prix: { $gte: prixMini } } : {};
        try {
            let produits = await produitDao.findByCriteria(criteria);
            res.send(produits);
        } catch (ex) {
            res.status(statusCodeFromEx(ex)).send(ex);
        }
    });
// http://localhost:8282/produit-api/private/produit en mode post
// avec { "id" : null , "nom" : "produitXy" , "prix" : 12.3 }
//ou bien { "nom" : "produitXy" , "prix" : 12.3 } dans req.body
apiRouter.route(['/produit-api/public/produit', '/produit-api/private/produit'])
    .post(async function (req, res, next) {
        let newEntity = req.body;
        //console.log("POST,newEntity="+JSON.stringify(newEntity));
        if (nullOrEmptyObject(newEntity)) { res.status(400).send(); return; } //BAD REQUEST
        try {
            let savedEntity = await produitDao.save(newEntity);
            let id = newEntity.id; //saved id (sometimes auto_incr id)
            //NB: res.location('/produit/' + id) because some clients may send two calls:
            //1. a post call to create new resource on server
            // the server respond 201 with Location: /produit/pxy in http response header
            //2. the client may send a get request with /produit/pxy at url end to retreive full entity value
            res.location('/produit/' + id).status(201).send(savedEntity);//201: successfully created
        } catch (ex) {
            res.status(statusCodeFromEx(ex)).send(ex);
        }
    });
// http://localhost:8282/produit-api/private/produit en mode PUT
// ou bien http://localhost:8282/produit-api/private/produit/618d53514e0720e69e2e54c8 en mode PUT
// avec { "code" : "618d53514e0720e69e2e54c8" , "nom" : "produit_xy" , "prix" : 16.3 } dans req.body
apiRouter.route(['/produit-api/public/produit', '/produit-api/public/produit/:id',
    '/produit-api/private/produit', '/produit-api/private/produit/:id'])
    .put(async function (req, res, next) {
        let newValueOfEntityToUpdate = req.body;
        //console.log("PUT,newValueOfEntityToUpdate="+JSON.stringify(newValueOfEntityToUpdate));
        if (nullOrEmptyObject(newValueOfEntityToUpdate)) {
            res.status(400).send(); return; //BAD REQUEST }
            //l'id de l'entity à mettre à jour en mode put peut soit être précisée en fin d'URL
            //soit être précisée dans les données json de la partie body
            //et si l'information est renseignée des 2 façons elle ne doit pas être incohérente:
            let entityId = req.params.id; //may be found (as string) at end of URL
            if (newValueOfEntityToUpdate.id != null && entityId != null
                && newValueOfEntityToUpdate.id != entityId) { res.status(400).send(); return; } //BAD REQUEST (incoherent id)
            if (newValueOfEntityToUpdate.id == null && entityId != null) newValueOfEntityToUpdate.id = entityId;
            if (newValueOfEntityToUpdate.id != null && entityId == null) entityId = newValueOfEntityToUpdate.id;
            let verbose = req.query.v == "true"; //verbose mode (default as false)
            try {
                let updatedEntity = await produitDao.updateOne(newValueOfEntityToUpdate);
                if (verbose)
                    res.send(updatedEntity); //200:OK with updated entity as Json response body
                else
                    res.status(204).send();//NO_CONTENT
            } catch (ex) {
                res.status(statusCodeFromEx(ex)).send(ex);
            }
        }
    });
// http://localhost:8282/produit-api/private/produit/618d53514e0720e69e2e54c8
//avec ou sans ….?v=true en mode DELETE
apiRouter.route(['/produit-api/private/produit/:id', '/produit-api/public/produit/:id'])
    .delete(async function (req, res, next) {
        let entityId = req.params.id;
        //console.log("DELETE,entityId="+entityId);
        let verbose = req.query.v == "true"; //verbose mode (default as false)
        try {
            let deleteActionMessage = await produitDao.deleteOne(entityId);
            if (verbose)
                res.send(deleteActionMessage);
            else
                res.status(204).send();//NO_CONTENT
        } catch (ex) {
            res.status(statusCodeFromEx(ex)).send(ex);
        }
    });
export default { apiRouter };