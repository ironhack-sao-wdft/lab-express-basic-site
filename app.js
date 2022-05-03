const express = require("express");

const PORT = 4000;

// Importing all the pokemon for our data file
const allPokemon = require("./data");

const app = express();

app.use(express.json());

const pokemon = require("./data");

app.get("/", (req, res) => {
  const data = req.body;
  res.json(pokemon);
});

app.get("/:id", (req, res) => {
  const { id } = req.params;

  const pokemonById = pokemon.find((pokemon) => pokemon.id === Number(id));

  if (!pokemonById) {
    return res.status(404).json("Pokemon not found");
  }
  return res.json(pokemonById);
});

app.get(`/search`, (req, res) => {
  const { name, type } = req.query;

  if (name && type) {
    return res.status(400).json("Can't search by name AND type");
  }

  if (type) {
    const found = pokemon.filter((element) =>
      element.types.includes(type.toLowerCase())
    );
  }
  if (name) {
    const found = pokemon.find(
      (element) => element.name === name.toLowerCase()
    );
  }
  if (!found) {
    return res.status(404).json("Pokemon not found");
  }
});

app.post("/", (req, res) => {
  const data = req.body;
  const clone = [...pokemon];
  clone.sort((a, b) => b.id - a.id);
  const lastItem = clone[0].id;
  console.log(clone);
  const newPokemon = { ...data, id: lastItem + 1 };
  pokemon.push(newPokemon);
  res.json(newPokemon);
});

app.patch("/:id", (req, res) => {
  const { id } = req.params;

  const data = req.body;

  const index = pokemon.findIndex((element) => {
    return element.id === Number(id);
  });

  if (index < 0) {
    return res.status(404).json("Pokemon not found");
  }

  pokemon[index] = { ...pokemon[index], ...data };
  return res.json(pokemon[index]);
});

app.delete("/:id", (req, res) => {
  const { id } = req.params;

  const index = pokemon.findIndex((element) => {
    return element.id === Number(id);
  });

  if (index < 0) {
    return res.status(404).json({ message: "Livro não encontrado" });
  }

  pokemon.splice(index, 1);

  return res.json({});
});

app.listen(PORT, () => console.log(`Server up and running at port ${PORT}`));
