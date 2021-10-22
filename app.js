const express = require("express");

const PORT = 4000;

// Importing all the pokemon for our data file
const allPokemon = require("./data");

const app = express();

// -- Define your route listeners here! --
// 1 get
app.get("/pokemon", (request, response) => {
  return response.json(allPokemon);
});

// 2 /:id
app.get("/pokemon/:id", (request, response) => {
  const { id } = request.params;

  const foundPokemon = allPokemon.find((poke) => poke.id === Number(id)); //converter para number, por params ser string (ou poke.id.toString() === id)

  if (!foundPokemon) {
    return response.json({ message: "Pokémon not found :c" }); //response.status(204).json({});
  }

  response.json(foundPokemon);
});

// 3 search
app.get("/search", (request, response) => {
  const { name = "", type = "" } = request.query;

  const pokeFilter = allPokemon.filter((poke) => {
    return type.length
    ? (
      poke.name.toLowerCase().includes(name.toLowerCase()) &&
      poke.types.includes(type.toLowerCase())
    ) 
    : poke.name.toLowerCase().includes(name.toLowerCase());
  });

  return response.json(pokeFilter);
});

app.listen(PORT, () => console.log(`Server up and running at port ${PORT}`));
