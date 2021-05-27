const dataPokemon = require('./pokemon.json');

const express = require('express');

const app = express();

app.use(express.json());

/*
{
    "id":1
    "nombre": "Ash Ketchup",
    "pueblo": "Pueblo Paleta",
    "pokemon": [
        "Pikachu",
        "Charmander",
        "Squirtle"
    ]
}

1.- Obtener nombre y ID de los entrenadores
2.- Obtener info de entrenador por ID
3.- Obtener listado de un entrenador (por ID)
4.- Crear nuevo entrenador
5.- Agregar un pokemon a un entrenador
 */


app.get('/', function (request, response) {
    response.end('API Pokemon');
});

app.get('/entrenadores', function (request, response) {
    response.json(dataPokemon.map(entrenador => ({ id: entrenador.id, nombre: entrenador.nombre })));
});

app.get('/entrenadores/:id', function (request, response) {
    const { id } = request.params;
    const entrenador = dataPokemon.filter(entrenador => entrenador.id === +id);
    if (entrenador.length) {
        response.json(entrenador[0]);
    } else {
        response.send('No hay entrenadores con ese ID');
    }
});

app.get('/entrenadores/:id/pokemon', function (request, response) {
    const { id } = request.params;
    const entrenador = dataPokemon.filter(entrenador => entrenador.id === +id);
    if (entrenador.length) {
        if (entrenador[0].pokemon.length) {
            response.json(entrenador[0].pokemon);
        } else {
            response.send(`Entrenador ${entrenador[0].nombre} aún no atrapa ningún pokemon`);
        }
    } else {
        response.send('No hay entrenadores con ese ID');
    }
});

app.post('/entrenadores', function (request, response) {
    const { nombre, pueblo, pokemon = [] } = request.body;
    dataPokemon.push({ id: dataPokemon[dataPokemon.length - 1].id + 1, nombre, pueblo, pokemon });
    response.send('Se creó el entrenador');

});

app.post('/entrenadores/:id/pokemon', function (request, response) {
    const { id } = request.params;
    const { pokemon } = request.body;
    if (!pokemon) {
        response.send('Agrega un pokemon');
        return
    }
    dataPokemon.map(entrenador => {
        if (entrenador.id === +id) {
            entrenador.pokemon.push(pokemon);
        }
        return entrenador
    });
    
    response.send(`Se gregó el pokemon al entrenador `);

});

app.listen(8080, function () {
    console.log('> Servidor escuchando el puerto 8080');
});