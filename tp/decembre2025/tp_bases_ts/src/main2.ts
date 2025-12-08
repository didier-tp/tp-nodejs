import calcul, { carre , racineCarree} from './calcul2';
import { markdown  } from 'markdown' //necessite  npm install -s markdown
console.log("le carre de 4 vaut " + carre(4));
console.log("la racine carree de 9 vaut " + racineCarree(9));
console.log("3+4= " + calcul.add(3,4));
console.log("calcul.name =" + calcul.name);
var sHtml = markdown.toHTML("**" + "coucou" + "**");
console.log(sHtml);