const Express = require("express");

// Importing all the pokemon for our data file
const allPokemon = require("../data");

const pokeRoute = Express();

//return all pokemon
pokeRoute.get("/pokemon", (request, response) => {
  //return search pokemon
  const { name = "", types = "" } = request.query;

  const searchPoke = allPokemon.filter((poke) => {
    return (
      poke.name.toLowerCase().includes(name.toLowerCase()) &&
      poke.types.find((type) => {
        return type.toLowerCase().includes(types.toLowerCase());
      })
    );
  });

  return response.json(searchPoke);
});

//return specific pokemon
pokeRoute.get("/pokemon/:id", (request, response) => {
  const { id } = request.params;

  const filteredPoke = allPokemon.find((poke) => poke.id.toString() === id);

  if (filteredPoke) {
    return response.json(filteredPoke);
  }

  response.json(allPokemon);
});

module.exports = pokeRoute;
