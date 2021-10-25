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

// A POST /pokemon route, that inserts the new Pokemon into the existing list of all Pokemons (don't worry about persisting the data to the disk, we're gonan learn that later)
router.post('/pokemon', (req, resp) => {
  const { name, types, height, weight, sprite } = req.body;

  const newPoke = {
    id: new Date().getTime(),
    name: name,
    "types": types,
    "height": height,
    "weight": weight,
    "sprite": sprite
  };

  allPokemon.push(newPoke);

  return resp.status(201).json(newPoke);
});

//A PUT /pokemon/:id route, that updates an existing Pokemon with the provided data
router.put('/pokemon/:id', (req, resp) => {
  const { id } = req.params;
  const { name, types, height, weight, sprite } = req.body;

  // Validation
  if (!name || !types || !height || !weight || !sprite) {
    return resp.status(400).json({ message: 'Please fill in all required data' });
  }

  const foundPoke = allPokemon.find((pokeObj) => pokeObj.id.toString() === id);
  if (!foundPoke) {
    return resp.status(400).json({ message: `User id # ${id} not found` });
  }

  foundPoke.name = name;
  foundPoke.types = types;
  foundPoke.height = height;
  foundPoke.weight = weight;
  foundPoke.sprite = sprite;  

  resp.json(foundPoke);
});

//A DELETE /pokemon/:id route, that deletes an existing Pokemon and returns a success message
router.delete('/pokemon/:id', (req, resp) => {
  const { id } = req.params;

  const foundIndex = allPokemon.findIndex((pokeObj) => pokeObj.id.toString() === id);
  if (foundIndex < 0) {
    return resp.status(400).json({ message: `User id # ${id} not found` });
  }

  allPokemon.splice(foundIndex, 1);
  resp.json({ message: `Pokemon succesfully deleted.`});
});

module.exports = router;
