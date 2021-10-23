const express = require("express");
const router = express();

// Importing all the pokemon for our data file
const allPokemon = require("../data");

// -- Define your route listeners here! --
// 1 get
router.get("/", (req, response) => {
  return response.json(allPokemon);
});

// 2 /:id
router.get("/:id", (req, res) => {
  const { id } = req.params;

  const foundPokemon = allPokemon.find((poke) => poke.id === Number(id)); //converter para number, por params ser string (ou poke.id.toString() === id)

  if (!foundPokemon) {
    return res.json({ message: "Pokémon not found :c" }); //res.status(204).json({});
  }

  res.json(foundPokemon);
});

// 3 search
router.get("/search", (req, res) => {
  const { name = "", type = "" } = req.query;

  const pokeFilter = allPokemon.filter((poke) => {
    return type.length
      ? poke.name.toLowerCase().includes(name.toLowerCase()) &&
          poke.types.includes(type.toLowerCase())
      : poke.name.toLowerCase().includes(name.toLowerCase());
  });

  return res.json(pokeFilter);
});

// 4 post
router.post("/", (req, res) => {
  const inputData = req.body;
  // console.log(inputData);

  const addPokeId = allPokemon[allPokemon.length - 1].id + 1;
  // console.log(addPokeId);
  const newPoke = { id: addPokeId, ...inputData };
  allPokemon.push(newPoke);

  return res.json(newPoke);
});

// 5 put
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const inputData = req.body;

  const foundPoke = allPokemon.find((poke) => poke.id.toString() === id);

  for (const key in foundPoke) {
    if (key === "id") continue;
    foundPoke[key] = inputData[key] || foundPoke[key];
  }

  if (!foundPoke) {
    return res.status(400).json({ message: "Pokemon not found." });
  }

  return res.json(foundPoke);
});

// 6 delete
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const idx = allPokemon.findIndex((poke) => {
    return poke.id.toString() === id;
  });

  allPokemon.splice(idx, 1);
  return res.json({ message: "Pokemon deleted!" });
});

module.exports = router;