const { request, response } = require('express');
const express = require('express');
const allPokemon = require('../data');

const router = express();

// Uma GET /pokemonrota, que serve a uma série de objetos contendo dados sobre todos os Pokémons
router.get('/pokemons', (request ,response) => {
    return response.json(allPokemon);
});

// Uma GET /pokemon/:id rota que serve a um objeto de um Pokémon específico (pesquise na matriz usando o fornecido id)
router.get('/pokemons/:id', (request, response) => {
    const { id } = request.params;

    // console.log(request.params);
    const foundPokemons = allPokemon.find((pokes) => pokes.id.toString() === id);

    return response.json(foundPokemons);
});

// Uma GET /searchrota, onde o usuário pode pesquisar Pokémons por nome ou tipo (ao pesquisar por tipo, deve retornar todos os Pokémons encontrados com aquele tipo)
router.get('/pokemons', (request, response) => {
    const {name = '', types = ''} = request.query;

    const filteredPokemons = allPokemon.filter((pokes) => {
        return pokes.name.toLowerCase().includes(name.toLowerCase())
        &&
        pokes.types.toLowerCase().includes(types.toLowerCase());
    })
    return response.json(filteredPokemons);
});

module.exports = router;