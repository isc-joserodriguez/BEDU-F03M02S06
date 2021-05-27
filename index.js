const express = require('express');
const app = express();

app.use(express.text());
app.use(express.json());

app.get('/', function (request, response) {
    console.log(request.get('Mi-encabezado-personalizado'));
    response.end('Hello BEDU');
});

app.get('/user-agent', function (request, response) {
    const userAgent = request.get('User-Agent');
    const who = request.get('Host');
    response.end(`Consultado desde: ${userAgent} / ${who}`);
});

app.post('/body', function (request, response) {
    console.log(request.body)
    response.end();
});



app.listen(8080, function () {
    console.log('> Servidor escuchando el puerto 8080');
});