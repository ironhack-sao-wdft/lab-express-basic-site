const express = require('express');

const pokeData = require('./data');

const router = express();

router.get('/pokemon', (request, response) => {
    response.json(pokeData);
});

router.get('/pokemon/:id', (request, response) => {
    const { id } = request.params;

    const foundPokemon = pokeData.find((el) => el.id.toString() === id);

    if (!foundPokemon) {
        return response.status(204).json({});
    }

    return response.json(foundPokemon); 
})

router.get('/search', (request,response) => {
    
    const filter = request.query;

    const filteredPokemons = pokeData.filter((pokemon) => {

        let isValid = true;
        for (key in filter) {
            isValid = isValid && pokemon[key] === filter[key];
        }

        return isValid; 
    });

    return response.json(filteredPokemons);
});


module.exports = router;