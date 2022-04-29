const express = require("express");

const PORT = 4000;

// Importing all the pokemon for our data file
const allPokemon = require("./data");
const app = express();

app.use(express.json());

const searchByName = (name) => {
  const filtered = allPokemon.filter((element) => element.name === name);
  return filtered;
};

const searchBytype = (type) => {
  const filtered = allPokemon.filter((element) => element.types.includes(type));
  return filtered;
};

const searchById = (id) => {
  const found = allPokemon.find((element) => element.id === Number(id));
  return found;
};

const findIndexById = (id) => {
  const index = allPokemon.findIndex((element) => element.id === Number(id));
  return index;
};
// -- Define your route listeners here! --
app.get("/pokemon", (req, res) => {
  res.json(allPokemon);
});
app.get("/pokemon/:id", (req, res) => {
  const { id } = req.params;
  const found = searchById(id);

  res.json(found);
});

app.get("/search", (req, res) => {
  const [key] = Object.keys(req.query);
  const pokemonList =
    key === "name"
      ? searchByName(req.query[key])
      : searchBytype(req.query[key]);

  res.json(pokemonList);
});

app.post("/pokemon", (req, res) => {
  let lastId = Math.max(...allPokemon.map((element) => element.id));
  lastId = lastId === "NaN" ? 0 : lastId;
  const data = req.body;
  allPokemon.push({ ...data, id: lastId + 1 });
  res.json(data);
});

app.patch("/pokemon/:id", (req, res) => {
  const data = req.body;
  const { id } = req.params;

  const index = findIndexById(id);
  if (index < 0) {
    return res.status(404).json({ message: "Pokemon não encontrado" });
  }
  allPokemon[index] = { ...allPokemon[index], ...data };
  res.json(allPokemon[index]);
});

app.delete("/pokemon/:id", (req, res) => {
  const { id } = req.params;

  const index = findIndexById(id);
  if (index < 0) {
    return res.status(404).json({ message: "Pokemon não encontrado" });
  }

  allPokemon.splice(index, 1);

  res.json({ message: "Item deletado com sucesso" });
});

app.listen(PORT, () => console.log(`Server up and running at port ${PORT}`));
