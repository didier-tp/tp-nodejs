node , js , express , Template_EJS , 
appels de WS_REST avec http et callback puis avec api fetch et async/await
===============
phase 1:
* npm install -s express
* route élémentaire retournant de l'HTML (routes '/mycatfact' et 'multiplication' )
------
phase 2:
* npm install -s ejs
* avec css/styles.css dans /assets
* avec Template EJS (au moins sur partie "multiplication")
----
phase 3:
* avec en arrière plan , un appel https vers api catfact avec callback
https://catfact.ninja/fact est l'url du WS_REST public/elementaire a appeler en mode get
----
phase 4:
* npm install -s node-fetch
* en arrière plan, ré-écriture de l'appel http avec api fetch et async/await