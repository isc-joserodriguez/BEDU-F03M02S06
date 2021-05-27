const peliculas = require('./peliculas.json');
const fs = require('fs');

const express = require('express');

const app = express();

app.use(express.json());

/**
 * Endpoints:
 *
 * 1. Obtener todas las peliculas
 *
 * 2. Obtener todas las peliculas de un genero
 * en particular
 *
 * 3. Obtener todas las peliculas donde participa
 * un actor en particular
 *
 * 4. Agregar una nueva pelicula (crear un nuevo ID)
 *
 * 5. Eliminar una pelicula (por su ID)
 */

app.get('/', function (request, response) {
    response.end('API Peliculas');
});

app.get('/peliculas', function (request, response) {
    const catalogo = peliculas.map(pelicula => pelicula.nombre);
    response.json(catalogo);
});

app.get('/peliculas/genero/:genero', function (request, response) {
    const { genero } = request.params;
    const peliculasFiltradas = peliculas.filter(pelicula => pelicula.genero.includes(genero));
    if (peliculasFiltradas.length) {
        response.json(peliculasFiltradas);
    } else {
        response.send('No hay peliculas con ese género');
    }
});

app.get('/peliculas/actor/:actor', function (request, response) {
    const { actor } = request.params;
    const peliculasFiltradas = peliculas.filter(pelicula => pelicula.actores.includes(actor));
    if (peliculasFiltradas.length) {
        response.json(peliculasFiltradas);
    } else {
        response.send('No hay peliculas con ese género');
    }
});

app.post('/peliculas', function (request, response) {
    const { nombre, año, genero, actores } = request.body;
    const peliculaNueva = [...peliculas, { id: peliculas[peliculas.length - 1]++, nombre, año, genero, actores }];
    fs.writeFile('./peliculas.json', JSON.stringify(peliculaNueva), error => {
        if (error) {
            response.send(error);
        } else {
            peliculas.push({ id: peliculas[peliculas.length - 1]++, nombre, año, genero, actores })
            response.send('Se creó la palícula');
        }
    });
});

app.delete('/peliculas', function (request, response) {
    const { id } = request.body;
    if (!id) {
        response.end('Error, no se proporcionó un ID');
        return;
    }

    const index = peliculas.findIndex(pelicula => pelicula.id === id);

    if (index === -1) {
        response.end('Error, no se encontró el ID');
    } else {
        peliculas.splice(index, 1);
        response.end(`Pelicula con ID ${id} eliminada`);
    }
    fs.writeFile('./peliculas.json', JSON.stringify(peliculaNueva), error => {
        if (error)
            response.send(error);
        else
            response.send('Se creó la palícula');
    });
});

app.listen(8080, function () {
    console.log('> Servidor escuchando el puerto 8080');
});
