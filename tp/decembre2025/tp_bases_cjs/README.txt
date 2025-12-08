Le fichier package.json a été créé via la commande npm init
la dépendance markdown a été ajoutée via la commande npm install -s markdown
après un git clone, besoin de lancer "npm install" ou bien "npm ci" pour regénérer le répertoire node_modules
========
NB: ce projet node (purement javascript) est en mode "type : commonjs" (par défaut)
les fichiers .js (ou .csj) sont censés comporter des exports/imports en versions "commonjs" (module.exports.xxx=xxx et var yyy=require('./yyyy') )
les fichiers .mjs sont censés comporter des exports/imports en versions "ES2015 ou plus" (export … et import … from './yyyy' )
==================
Si dans package.json on aurait placé "type" : "module" , alors les fichiers .js serait interprétés comme des fichiers ".mjs" 
et la syntaxe var yyy==require('./yyyy') serait acceptée dans des fichiers .cjs
