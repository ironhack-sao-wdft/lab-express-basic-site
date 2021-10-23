const express = require("express");

const PORT = 5000;

// Importing all the pokemon for our data file
const allPokemon = require("./data");

const app = express();
  
app.get('/pokemon', (request, response) => {
    return response.json(allPokemon);
});

app.get('/pokemon/:id', (request, response) => {
    const { id } = request.params;
    const foundPokemonById = allPokemon.find((el, index, array) => el.id.toString() === id);
    if (!foundPokemonById) {
      return response.status(204).json({});
    }
    return response.json( foundPokemonById );
});

app.get('/search', (request, response) => {
    const { name = '', types = ''} = request.query;
    const filteredPokemonsByName = allPokemon.filter((pokemon) => {
        return pokemon.name.toLowerCase().includes(name.toString().toLowerCase())
    })
    const filteredPokemonsByType = allPokemon.filter((pokemon) => {
        return pokemon.types.find((type) => {
            return type.toLowerCase().includes(types.toString().toLowerCase())
        });
    })
    if (name !== ''){
        return response.json(filteredPokemonsByName)
    } else {
        return response.json(filteredPokemonsByType)
    }
});


app.listen(PORT, () => console.log(`Server up and running at port ${PORT}`));
