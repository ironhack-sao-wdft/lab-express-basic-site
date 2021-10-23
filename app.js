const express = require("express");
const PORT = 5000;

const allPokemon = require("./data");
const app = express();
app.use(express.json());

app.get('/pokemon', (request, response) => {
    return response.json(allPokemon);
});

app.get('/pokemon/:id', (request, response) => {
    const { id } = request.params;
    const foundPokemonById = allPokemon.find((el) => el.id.toString() === id);
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

app.post('/pokemon', (request, response) => {
    const { id, name, types, height, weight, sprite} = request.body;
    if (!id || !name || !types || !height || !weight || !sprite) {
      return response.status(400).json({ message: 'Favor preencher todos os dados do novo Pokemon' });
    }
    const pokemonExists = allPokemon.some((pokemon) => pokemon.name === name);
    if (pokemonExists) {
      return response.status(400).json({ message: 'Pokemon já existente' })
    }
    const newPokemon = {
        id: new Date().getTime(),
        name: name,
        types: types,
        height: height,
        weight: weight,
        sprite: sprite,
    };
    allPokemon.push(newPokemon);
    return response.status(201).json(newPokemon)
});

app.put('/pokemon/:id', (request, response) => {
    const { id } = request.params;
    const { name, types, height, weight, sprite} = request.body;
    const foundPokemon = allPokemon.find((el) => el.id.toString() === id);
    if (!foundPokemon) {
      return response.status(400).json({ message: `User com id ${id} não encontrado` });
    }
    foundPokemon.name = name;
    foundPokemon.types = types;
    foundPokemon.height = height;
    foundPokemon.weight = weight;
    foundPokemon.sprite = sprite;
    response.json(foundPokemon);
});

app.delete('/pokemon/:id', (request, response) => {
    const { id } = request.params;
    const userIndex = allPokemon.findIndex((pokemon) => pokemon.id.toString() === id);
    if (userIndex < 0) {
      return response.status(400).json({ message: `Pokemon com id ${id} não encontrado` })
    }
    allPokemon.splice(userIndex, 1);
    response.json({ message: 'Pokemon deletado com sucesso' });
  });

app.listen(PORT, () => console.log(`Server up and running at port ${PORT}`));