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

// // Uma POST /pokemonrota que insere o novo Pokémon na lista existente de todos os Pokémons 
router.post ('/pokemons', (request, response) => {
    const { name, types, height , width , sprite } = request.body;

    

    // //dados obrigatorios para criaçao de novo pokemon
    if (!name || !height || !width || !sprite) {
        return response.status(400).json({ message: "Favor preencher os campos Name, Height, Width e Sprite do seu Pokemnos"})   
    }

    // // //checar se esse pokemon já existe pra não ter dupe
    const pokeExists = allPokemon.some((poke)=> poke.name === name);

    if (pokeExists) {
        return response.status(400).json({message: `Desculpe, mas já existe um Pokemon com nome ${name}`})
    }

    // criando de verdade o novo

    const lastId = allPokemon[allPokemon.length - 1].id;
    
    const newPokemon = {
        id = lastId + 1,
        name = name,
        types = types,
        height = height,
        width = width,
        sprite = sprite,
    }

    //push no array
    allPokemon.push(newPokemon);
    
return response.status(201).json(newPokemon)
});


// Uma PUT /pokemon/:id rota que atualiza um Pokémon existente com os dados fornecidos
// Uma DELETE /pokemon/:idrota que exclui um Pokémon existente e retorna uma mensagem de sucesso

module.exports = router;