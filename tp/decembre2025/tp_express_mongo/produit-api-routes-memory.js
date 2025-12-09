//var express = require('express');
import express from 'express';
const apiRouter = express.Router();
var allProduits = [];
allProduits.push({ code: 1, nom: 'classeur', prix: 4.0 });
allProduits.push({ code: 2, nom: 'cahier', prix: 2.1 });
allProduits.push({ code: 3, nom: 'colle', prix: 2.4 });
allProduits.push({ code: 4, nom: 'stylo', prix: 1.9 });
var codeMax = 4; //pour simulation auto_incr
function findProduitInArrayByCode(produits, code) {
    var produit = null;
    for (let i in produits) {
        if (produits[i].code == code) {
            produit = produits[i]; break;
        }
    }
    return produit;
}
function removeProduitInArrayByCode(produits, code) {
    var delIndex;
    for (let i in produits) {
        if (produits[i].code == code) {
            delIndex = i; break;
        }
    }
    if (delIndex) {
        produits.splice(delIndex, 1);
    }
}
function findProduitsWithPrixMini(produits, prixMini) {
    var selProduits = [];
    for (let i in produits) {
        if (produits[i].prix >= prixMini) {
            selProduits.push(produits[i]);
        }
    }
    return selProduits;
}
//exemple URL: http://localhost:8282/produit-api/public/produit/1
apiRouter.route('/produit-api/public/produit/:code')
    .get(function (req, res, next) {
        var codeProduit = req.params.code;
        var produit = findProduitInArrayByCode(allProduits, codeProduit);
        res.send(produit);
    });
//exemple URL: http://localhost:8282/produit-api/public/produit (returning all produits)
// http://localhost:8282/produit-api/public/produit?prixMini=1.05
apiRouter.route('/produit-api/public/produit')
    .get(function (req, res, next) {
        var prixMini = req.query.prixMini;
        if (prixMini) {
            res.send(findProduitsWithPrixMini(allProduits, prixMini));
        } else {
            res.send(allProduits);
        }
    });
// http://localhost:8282/produit-api/private/role-admin/produit en mode post
// avec { "code" : null , "nom" : "produitXy" , "prix" : 12.3 }
//ou bien { "nom" : "produitXy" , "prix" : 12.3 }dans req.body
apiRouter.route('/produit-api/private/role-admin/produit')
    .post(function (req, res, next) {
        var nouveauProduit = req.body;
        //simulation auto_incr :
        if (nouveauProduit.code == null) {
            codeMax++; nouveauProduit.code = codeMax;
        }
        console.log("POST,nouveauProduit=" + JSON.stringify(nouveauProduit));
        allProduits.push(nouveauProduit);
        //res.send(nouveauProduit); //with default status OK/200
        res.location(`/prod…./${nouveauProduit.code}`).status(201).send(nouveauProduit);
        //201: successfully created
    });
// http://localhost:8282/produit-api/private/role-admin/produit/1 en mode PUT
// avec { "code" : 1 , "nom" : "produit_xy" , "prix" : 16.3 } dans req.body
apiRouter.route('/produit-api/private/role-admin/produit/:id')
    .put(function (req, res, next) {
        let idRes = req.params.id; //code of produit/entity to update
        let newValueOfProduitToUpdate = req.body;
        console.log("PUT,newValueOfProduitToUpdate="
            + JSON.stringify(newValueOfProduitToUpdate));
        var produitToUpdate = findProduitInArrayByCode(allProduits, idRes /* newValueOfProduitToUpdate.code */);
        if (produitToUpdate != null) {
            produitToUpdate.nom = newValueOfProduitToUpdate.nom;
            produitToUpdate.prix = newValueOfProduitToUpdate.prix;
            res.send(produitToUpdate); //200:OK with updated entity as Json response body //res.status(204).send();//NO_CONTENT
        } else {
            res.status(404).json({ error: "no produit to update with code=" + idRes /* newValueOfProduitToUpdate.code */ });
        }
    });
// http://localhost:8282/produit-api/private/role-admin/produit/1 en mode DELETE
apiRouter.route('/produit-api/private/role-admin/produit/:code')
    .delete(function (req, res, next) {
        var codeProduit = req.params.code;
        console.log("DELETE,codeProduit=" + codeProduit);
        removeProduitInArrayByCode(allProduits, codeProduit);
        //res.send({ deletedProduitCode : codeProduit } );
        res.status(204).send(); // NO_CONTENT
    });
// exports.apiRouter = apiRouter; // ancienne syntaxe common-js
export default { apiRouter }; // nouvelle syntaxe es2015