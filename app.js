const express = require("express");

const PORT = 4000;

// Importing all the pokemon for our data file
const allPokemon = require("./data");

const app = express();

app.use(express.json());

// -- Define your route listeners here! --

// 1. GET All Pokemon
app.get("/pokemon", (req, res) => {
  res.json(allPokemon);
});

// 2. GET Pokemon using the ID
app.get("/pokemon/:id", (req, res) => {
  const { id } = req.params;
  const idPokemon = allPokemon.find((pokemon) => pokemon.id === Number(id));

  if (!idPokemon) {
    return res.status(404).json({ message: "Pokemon not found" });
  }
  return res.json(idPokemon);
});

// 3. GET Pokemon searching by name or type
app.get("/search", (req, res) => {
  const [search] = Object.keys(req.query);

  for (const key in req.query) {
    if (search === "name") {
      let namePokemon = allPokemon.filter(
        (pokemon) => pokemon.name === req.query[key].toLowerCase()
      );
      if (!namePokemon) {
        return res.status(404).json({ message: "Pokemon not found" });
      }
      return res.json(namePokemon);
    } else if (search === "type") {
      let typePokemon = [];
      allPokemon.map((pokemon) => {
        pokemon.types.map((types) => {
          if (types === req.query[key].toLowerCase()) {
            typePokemon.push(pokemon);
          }
        });
      });
      if (!typePokemon) {
        return res.status(404).json({ message: "Pokemon not found" });
      }
      return res.json(typePokemon);
    }
  }
});

// BONUS

// 4. POST New Pokemon
app.post("/pokemon", (req, res) => {
  const data = req.body;
  const copy = [...allPokemon];
  const lastInsertedId = copy[copy.length - 1].id;

  const newPokemon = { ...data, id: lastInsertedId + 1 };
  allPokemon.push(newPokemon);

  console.log(allPokemon);

  res.json(newPokemon);
});

// 5. PUT Updates an existing Pokemon
app.patch("/pokemon/:id", (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const index = allPokemon.findIndex((pokemon) => {
    return pokemon.id === Number(id);
  });

  if (index < 0) {
    return res.status(404).json({ message: "Pokemon not found" });
  }

  allPokemon[index] = { ...allPokemon[index], ...data };

  console.log(allPokemon);
  return res.json(allPokemon[index]);
});

// 6. DELETE an existing Pokemon
app.delete("/pokemon/:id", (req, res) => {
  const { id } = req.params;

  const index = allPokemon.findIndex((pokemon) => {
    return pokemon.id === Number(id);
  });

  if (index < 0) {
    return res.status(404).json({ message: "Pokemon not found" });
  }

  allPokemon.splice(index, 1);

  console.log(allPokemon);

  return res.json({});
});

app.listen(PORT, () => console.log(`Server up and running at port ${PORT}`));
