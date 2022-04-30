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
// function searchPokemon(text) {
//   const clone = [...pokemon];
//   const find = clone.filter((currentPokemon) => {
//     let name = currentPokemon.name.toLowerCase().includes(text.toLowerCase());
//     let type = currentPokemon.types.toLowerCase().includes(text.toLowerCase());
//     return name || type;
//   });
// }
// app.get("/search", (req, res) => {
//   searchPokemon(req);
//   console.log(searchPokemon(req));
//   if (!searchPokemon()) {
//     return res.status(404).json("Pokemon not found");
//   }
//   return res.json(searchPokemon());
// });

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
