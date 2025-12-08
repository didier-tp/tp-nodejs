"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const calcul2_1 = require("./calcul2");
const markdown_1 = require("markdown"); //necessite  npm install -s markdown
console.log("le carre de 4 vaut " + (0, calcul2_1.carre)(4));
console.log("la racine carree de 9 vaut " + (0, calcul2_1.racineCarree)(9));
console.log("3+4= " + calcul2_1.default.add(3, 4));
console.log("calcul.name =" + calcul2_1.default.name);
var sHtml = markdown_1.markdown.toHTML("**" + "coucou" + "**");
console.log(sHtml);
//# sourceMappingURL=main2.js.map