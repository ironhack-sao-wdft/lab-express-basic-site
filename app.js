const express = require("express");
const { copyWithin } = require("./data");

const PORT = 4000;

// Importing all the pokemon for our data file
const allPokemon = require("./data");

const app = express();

// Configura a instância do Express para aceitar requisições do tipo JSON
app.use(express.json());

// -- Define your route listeners here! --

// 1. A GET /pokemon route, that serves an array of objects containing data about all the Pokemons

app.get("/pokemon", (req, res) => {
  return res.json(allPokemon);
});

// 2. An GET /pokemon/:id route, that serves an object of a specific Pokemon (search in the array using the provided id)

app.get("/pokemon/:id", (req, res) => {
  const { id } = req.params;

  const found = allPokemon.find((pokemon) => pokemon.id === Number(id));

  if (!found) {
    // Retorna uma mensagem de erro com código 404
    return res.status(404).json({ message: "Pokemon not found!" });
  }

  return res.json(found);
});

// 3. A GET /search route, where the user can search Pokemons by name or type (when searching by type, should return all the pokemon found with that type)
// Feito em aula 30/04
app.get("/search", (req, res) => {
  const { name, type } = req.query;

  console.log(name);

  if (name && type) {
    return res.status(400).json({ msg: "Can't search by name AND type" });
  }

  if (type) {
    const found = allPokemon.filter((pokemon) => {
      if (typeof type === "string") {
        return pokemon.types.includes(type.toLowerCase());
      }

      if (typeof type === "object") {
        return pokemon.types.some((typeEl) => type.includes(typeEl));
      }
    });

    if (!found.length) {
      return res.status(404).json({ msg: "Pokemon not found" });
    }

    return res.json(found);
  }

  if (name) {
    const found = allPokemon.filter((pokemon) => {
      if (typeof name === "string") {
        return pokemon.name.toLowerCase() === name.toLowerCase();
      }

      if (typeof name === "object") {
        return name.some(
          (nameEl) => pokemon.name.toLowerCase() === nameEl.toLowerCase()
        );
      }
    });

    if (!found) {
      return res.status(404).json({ message: "Pokemon not found" });
    }

    return res.json(found);
  }
});

//BONUS
// 4. A POST /pokemon route, that inserts the new Pokemon into the existing list of all Pokemons (don't worry about persisting the data to the disk, we're gonan learn that later)
app.post("/pokemon", (req, res) => {
  const data = req.body;
  const clone = [...allPokemon];

  clone.sort((a, b) => b.id - a.id);

  const lastInsertedId = (clone[0] || {}).id || 0;

  const newPokemon = { ...data, id: lastInsertedId + 1 };

  allPokemon.push(newPokemon);

  res.json(newPokemon);
});

// 5. A PUT /pokemon/:id route, that updates an existing Pokemon with the provided data
app.patch("/pokemon/:id", (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const index = allPokemon.findIndex((pokemon) => {
    return pokemon.id === Number(id);
  });

  if (index < 0) {
    return res.status(404).json({ message: "Pokemon not found!" });
  }

  allPokemon[index] = { ...allPokemon[index], ...data };

  return res.json(allPokemon[index]);
});

// 6. A DELETE /pokemon/:id route, that deletes an existing Pokemon and returns a success message
app.delete("/pokemon/:id", (req, res) => {
  const { id } = req.params;

  const index = allPokemon.findIndex((pokemon) => {
    return pokemon.id === Number(id);
  });

  if (index < 0) {
    return res.status(404).json({ message: "Pokemon not found!" });
  }

  allPokemon.splice(index, 1);

  return res.json({});
});

app.listen(PORT, () => console.log(`Server up and running at port ${PORT}`));
