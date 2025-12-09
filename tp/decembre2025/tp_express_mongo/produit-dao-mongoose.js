//var mongoose = require('mongoose');
import mongoose , { ObjectId} from 'mongoose'; // npm install -s mongoose
import dbMongoose from './db-mongoose.js';
import genericPromiseMongoose from './generic-promise-mongoose.js';

var thisDb = dbMongoose.thisDb;
//NB: This is for current entity type ("Devise" or "Customer" or "Product" or ...)
//NB: thisSchema end ThisPersistentModel should not be exported (private only in this current module)
var thisSchema;//mongoose Shcema (structure of mongo document)
var ThisPersistentModel; //mongoose Model (constructor of persistent ThisPersistentModel)
function initMongooseWithSchemaAndModel() {
    mongoose.Connection = thisDb;
    thisSchema = new mongoose.Schema({
        /* default mongo _id: { type : ObjectId , alias : "id" } ,*/
        //_id: { type : ObjectId , alias : "code" } ,
        nom: String,
        prix: Number
    });
    thisSchema.set('id', true);
    thisSchema.set('toJSON', {
        virtuals: true,
        versionKey: false,
        transform: function (doc, ret) { delete ret._id }
    });
    //"Produit" model name is "produits" collection name in mongoDB database
    ThisPersistentModel = mongoose.model('Produit', thisSchema);
}
initMongooseWithSchemaAndModel();

function reinit_db() {
    return new Promise((resolve, reject) => {
        const deleteAllFilter = {}
        ThisPersistentModel.deleteMany(deleteAllFilter)
            .then(() => { //insert elements after deleting olds
                (new ThisPersistentModel({
                    _id: '618d53514e0720e69e2e54c8',
                    nom: "classeur", prix: 4.0
                })).save();
                (new ThisPersistentModel({
                    _id: '618d53514e0720e69e2e54c9',
                    nom: "cahier", prix: 2.1
                })).save();
                //(new ThisPersistentModel({ code : "EUR" , name : "Euro" , change : 1.0})).save();
                //(new ThisPersistentModel({ code : "USD" , name : "Dollar" , change : 1.1})).save();
                resolve({ action: "produits collection re-initialized in mongoDB database" })
            })
            .catch((err) => {
                console.log(JSON.stringify(err));
                reject({ error: "cannot delete in database", cause: err });
            });
    });
}

function findById(id) {
    return genericPromiseMongoose.findByIdWithModel(id, ThisPersistentModel);
}
function findByCriteria(criteria) {
    //exemple of criteria : {} or { unitPrice: { $gte: 25 } } or ...
    return genericPromiseMongoose.findByCriteriaWithModel(criteria, ThisPersistentModel);
}
function save(entity) {
    return genericPromiseMongoose.saveWithModel(entity, ThisPersistentModel);
}
function updateOne(newValueOfEntityToUpdate) {
    return genericPromiseMongoose.updateOneWithModel(newValueOfEntityToUpdate,
        newValueOfEntityToUpdate.id, ThisPersistentModel);
}
function deleteOne(idOfEntityToDelete) {
    return genericPromiseMongoose.deleteOneWithModel(idOfEntityToDelete, ThisPersistentModel);
}
export default { ThisPersistentModel, findById, findByCriteria, save, updateOne, deleteOne , reinit_db }