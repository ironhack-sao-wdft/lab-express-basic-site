const express = require("express");

const PORT = 4000;

// Importing all the pokemon for our data file
const allPokemon = require("./data");

const app = express();
app.use(express.json());

// -- Define your route listeners here! --

app.get("/pokemon", (req, res) => {
  return res.json(allPokemon);
});

app.get("/pokemon/:id", (req, res) => {
  const { id } = req.params;
  const found = allPokemon.find((pokemon) => pokemon.id === Number(id));
  return res.json(found);
});

app.get("/search", (req, res) => {
  const { name, type } = req.params;

  const filter = allPokemon.filter((poke) => {
    return type.length
      ? poke.name.toLowerCase().includes(name.toLowerCase()) &&
          poke.types.includes(type.toLowerCase())
      : poke.name.toLowerCase().includes(name.toLowerCase());
  });

  return res.json(filter);
});

app.listen(PORT, () => console.log(`Server up and running at port ${PORT}`));
