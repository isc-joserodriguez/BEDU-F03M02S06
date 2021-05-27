const divisas = require('./divisas.json');

const express = require('express');

const app = express();


app.use(express.json());

app.get('/', function (request, response) {
    response.end('Hello BEDU');
});

app.get('/divisas', function (request, response) {
    const catalogo = divisas.map(divisa => divisa.moneda);
    response.json(catalogo);
});
console.log(divisas)

app.get('/divisas/:moneda', function (request, response) {
    const { moneda } = request.params;
    const valores = divisas.filter(divisa => divisa.moneda == moneda);
    if (valores.length) {
        response.json(valores[0].tipoCambio);
    } else {
        response.send('No existe esa moneda');
    }
});

app.get('/divisas/:monedaA/:monedaB', function (request, response) {
    const { monedaA, monedaB } = request.params;
    const valores = divisas.filter(divisa => divisa.moneda == monedaA);

    if (valores.length) {
        const cambio = valores[0].tipoCambio.filter(divisa => divisa.moneda == monedaB);
        if (cambio.length) {
            response.send(`1 ${monedaA} vale ${cambio[0].valor}`);
        } else {
            response.send(`No existe el cambio de ${monedaA} a ${monedaB}`);
        }
    } else {
        response.send(`No existe el cambio de ${monedaA}`);
    }
});


app.listen(8080, function () {
    console.log('> Servidor escuchando el puerto 8080');
});