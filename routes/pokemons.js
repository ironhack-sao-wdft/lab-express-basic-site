const express = require("express");
const route = express();

const allPokemon = require("../data");

route.use(express.json()); // <=== parse request body as JSON
route.use(express.urlencoded({ extended: false })); // <=== parse request body as URL-ENCODED

route.get("/", (req, res) => {
  res.json(allPokemon);
});

route.post("/", (req, res) => {
  console.log(req.body);
  allPokemon.push(req.body);
  res.json(allPokemon);
});

route.get("/search", (req, res) => {
  const queryKeys = Object.keys(req.query);
  const filteredPokemons = allPokemon.filter((pokemon) =>
    queryKeys.every((key) => {
      let value = req.query[key];
      Array.isArray(value) || (value = [value]);
      const keyValues = [...value];
      return keyValues.every((value) => {
        const regex = new RegExp(value, "gi");
        return Array.isArray(pokemon[key])
          ? pokemon[key].some((type) => regex.test(type))
          : regex.test(pokemon[key]);
      });
    })
  );
  res.json(filteredPokemons);
});

route.get("/:id", (req, res) => {
  const pokemon = allPokemon.find((pokemon) => pokemon.id === +req.params.id);
  res.json(pokemon);
});

route.put("/:id", (req, res) => {
  let newPokemon;
  allPokemon.find((pokemon, index) => {
    if (pokemon.id === +req.params.id) {
      allPokemon[index] = { id: pokemon.id, ...req.body };
      newPokemon = allPokemon[index];
      return true;
    }
    return false;
  });
  res.json(newPokemon);
});

route.delete("/:id", (req, res) => {
  let success;
  allPokemon.find((pokemon, index) => {
    if (pokemon.id === +req.params.id) {
      allPokemon.splice(index, 1);
      success = true;
      return true;
    }
    return false;
  });
  const msg = success ? "success" : "pokemon not found";
  res.json(msg);
});

module.exports = route;
