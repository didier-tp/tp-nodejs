node , js , Api_REST avec express et middleware
lien avec MongoDB via mongoose
=====
phase 1:
* npm install -s express
* api rest sur "Produit" avec dataSet en mémoire (selon exemple pages 52,53)
-----
phase 2:
* npm install -s mongoose@8.0.0
* avec lien avec MongoDB v8 (et async/await)

============
NB: pour mieux respecter les conventions d'URL pour Api rest
il faudrait idéalement remplacer partout 
http://localhost:8282/produit-api/public/produit
par
http://localhost:8282/produit-api/v1/public/produits (abvec v1 et avec un s à la fin)