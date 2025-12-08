Le fichier package.json a été créé via la commande npm init
la dépendance markdown a été ajoutée via la commande npm install -s markdown
après un git clone, besoin de lancer "npm install" ou bien "npm ci" pour regénérer le répertoire node_modules
le fichier tsconfig.json peut éventuellement être généré via tsc --init mais il y besoin d'être très fortement adapté
========
NB: ce projet node (avec typescript) est en mode "type : commonjs" (explicitement ou par défaut au sein de package.json)
un paramétrage de type "module" : "commonjs" (ou autre version compatible) est fortement conseillé au sein de tsconfig.json pour une bonne cohérence
les fichiers .js du répertoire dist seront générés via la commande "tsc" qui ira chercher les fichiers ".ts" dans le répertoire "src"
selon la configuration choisie au sein de tsconfig.json
====
les éventuels fichiers "...js.map" générés dans dist (si option "sourceMap" : true ) ne sont utiles que pour un debug pas à pas (avec point d'arrêt)
