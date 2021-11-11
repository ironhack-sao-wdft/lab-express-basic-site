const express = require("express");
const app = express();

const PORT = 4000;

// Importing all the pokemon for our data file
// const pokemonRoute = require ('./routes/pokemonRoute')
const allPokemon = require("./data");


// -- Define your route listeners here! --

// Iteration 1:
app.get('/', (req, res) => {
    return res.json(allPokemon);});

// Iteration 2:
app.get('/pokemon/:id', (req, res) => {
    const { id } = req.params;
    
    const foundPokemon = allPokemon.find ((pokemon) => pokemon.id === Number(id))  //forcing convertion of id into a Number, as it can sometimes be passed as a String and, thus, could cause issues

    if (!foundPokemon) {
        return res.json( { message: 'Invalid id: Pokémon not found'});
    }

    return res.json(foundPokemon);
});

// Iteration 3:
app.get('/search', (req, res) => {
    const { name = "", type = ""} = req.query;

    const pokemonFilter = allPokemon.filter((pokemon) => {
        return type.length
        ? pokemon.name.toLowerCase().includes(name.toLocaleLowerCase()) &&
        pokemon.types.includes(type.toLocaleLowerCase())
        : pokemon.name.toLowerCase().includes(name.toLocaleLowerCase());

    });
    return res.json(pokemonFilter);
});

app.listen(PORT, () => console.log(`Server up and running at port ${PORT}`));
