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
            isValid = isValid && pokemon[key].includes(filter[key]) ||
            pokemon[key].toString().includes(filter[key]);
        };   
        
        return isValid; 
    });

    return response.json(filteredPokemons);
});

// BONUS
router.post('/pokemon', (request, response) => {
    const { name, types, height, weight, sprite } = request.body;

    if (!name || !types || !height || !weight || !sprite ) {
      return response.status(400).json({ message: 'values cannot be empty'});
    }
  
    const pokemonExists = pokeData.some((pokemon) => pokemon.name === name);
    if (pokemonExists) {
      return response.status(400).json({ message: 'Pokémon already exists' })
    }

    const checkTypes = () => {
        if (Array.isArray(types) === false) {
            return response.status(400).json({ message: 'types must be an array' })
        }
    };

    checkTypes();
  
    const newPokemon = {
      id: new Date().getTime(),
      name: name,
      types: types, 
      height: height, 
      weight: weight, 
      sprite: sprite
    };
  
    pokeData.push(newPokemon); 

    return response.status(201).json(newPokemon)

});

router.put('/pokemon/:id', (request, response) => {
    const { id } = request.params; 
    const { name, types, height, weight, sprite } = request.body;
  
    if (!name || !types || !height || !weight || !sprite ) {
        return response.status(400).json({ message: 'values cannot be empty'});
      }
    

    const foundPokemon = pokeData.find((el) => el.id.toString() === id);

    if (!foundPokemon) {
        return response.status(400).json({ message: `Pokémon with id ${id} not founded` });
    }
  
    foundPokemon.name = name;
    foundPokemon.types = types;
    foundPokemon.height = height;
    foundPokemon.weight = weight;
    foundPokemon.sprite = sprite;

    const checkTypes = () => {
        if (Array.isArray(types) === false) {
            return response.status(400).json({ message: 'types must be an array' })
        }
    };

    checkTypes();
  
    response.json(foundPokemon);
  });

  router.delete('/pokemon/:id', (request, response) => {

    const { id } = request.params;
  
    const pokeIndex = pokeData.findIndex((pokemon) => pokemon.id.toString() === id);
    if (pokeIndex < 0) {
      return response.status(400).json({ message: `Pokémon with id ${id} not founded` })
    }
  
    pokeData.splice(pokeIndex, 1); 
  
    response.json({ message: 'Pokémon has been deleted successfully' });
  }); 

module.exports = router;
