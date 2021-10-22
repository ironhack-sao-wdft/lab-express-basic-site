const express = require("express");
const router = express();

// Importing all the pokemon for our data file
const allPokemon = require("./data");

// -- Define your route listeners here! --
// 1. A GET /pokemon route, that serves an array of objects containing data about all the Pokemons
router.get("/pokemon", (req, resp) => {
  return resp.json(allPokemon);
});

// 2. An GET /pokemon/:id route, that serves an object of a specific Pokemon (search in the array using the provided id)
router.get("/pokemon/:id", (req, resp) => {
  const { id } = req.params;

  const foundPoke = allPokemon.find((pokeObj) => pokeObj.id.toString() === id);

  if (!foundPoke) {
    return resp.status(204).json({});
  }

  return resp.json(foundPoke);
});

// 3. A GET /search route, where the user can search Pokemons by name or type (when searching by type, should return all the pokemon found with that type)
router.get("/search", (req, resp) => {
  const { name = "", type = "" } = req.query;

  const pokeName = allPokemon.filter((pokeObj) => {
    return pokeObj.name.toLowerCase().includes(name.toLowerCase());
  });

  const pokeType = allPokemon.filter((pokeObj) => {
      return pokeObj.types.find((oneType) => {
          return oneType.toLowerCase().includes(type.toLowerCase());
      });
  });

  if (name === "") {
    return resp.json(pokeType);
  } else return resp.json(pokeName);
});

module.exports = router;
