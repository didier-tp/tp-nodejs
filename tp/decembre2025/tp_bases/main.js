var calcul = require('./calcul');
var markdown  = require('markdown').markdown; //necessite  npm install -s markdown
console.log("le carre de 4 vaut " + calcul.carre(4));
var sHtml = markdown.toHTML("**" + "coucou" + "**");
console.log(sHtml);
console.log("la racine carree de 9 vaut " + calcul.racineCarree(9));