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

  if (!found) {
    return res.status(404).json({ message: "Pokemon not found" });
  }

  return res.json(found);
});

app.get("/search", (req, res) => {
  const { name, type } = req.params;

  if (type) {
    const found = allPokemon.filter((pokemon) => {
      if (typeof type === "string") {
        return pokemon.types.includes(type.toLowerCase());
      }

      if (typeof type === "object") {
        return pokemon.types.some((typeElement) => type.includes(typeElement));
      }
    });

    if (!found.length) {
      return res.status(404).json({ message: "Pokemon not found" });
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
          (nameEl) => pokemon.name.toLowerCase() === nameEl.toLowerCase
        );
      }
    });

    if (!found) {
      return res.status(404).json({ message: "Pokemon not found" });
    }
    return res.json(found);
  }
});

app.listen(PORT, () => console.log(`Server up and running at port ${PORT}`));
