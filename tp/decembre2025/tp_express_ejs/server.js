import express from 'express';
var app = express();

import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
//pour que ce serveur node/express puisse retourner des fichiers statiques
// css/styles.css ou images/image1.jpeg stockées dans le répertoire assets (ou autre)
app.use(express.static(__dirname+'/assets'))

app.set('view engine', 'ejs');//nécessite npm install -s ejs

app.get('/', function (req, res, next) {
    res.setHeader('Content-Type', 'text/html');
    res.write("<html> <body>");
    res.write('<p>index (welcome page) of tp_express_ejs</p>');
    res.write('<a href="mycatfact">mycatfact</a><br/>');
    res.write('<a href="multiplication?a=5&b=6">5*6</a><br/>');
    res.write("</body></html>");
    res.end();
});

//GET mycatfact
app.get('/mycatfact', function (req, res, next) {
    res.setHeader('Content-Type', 'text/html');
    res.write("<html> <body>");
    res.write('<p>chat malo , chat pitre , ...</p>');
    res.write("</body></html>");
    res.end();
});

//GET multiplication?a=5&b=6
app.get('/multiplication', function (req, res, next) {
    let va = Number(req.query.a); let vb = Number(req.query.b);
    let resMult = va * vb;
    res.render('multResult', {a: va, b: vb, resMult: resMult });
    //rendering views/multResult.ejs with js values
    //for <%=a%> , <%=b%> , <%=resMult%>
});

app.listen(8282, function () {
    console.log("simple express node server http://localhost:8282");
});