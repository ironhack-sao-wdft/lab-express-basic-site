const express = require("express");
const app = express();

const pokemonRoute = require("./routes/pokemons");

// Importing all the pokemon for our data file
app.use("/pokemon", pokemonRoute);

// -- Define your route listeners here! --
const PORT = 4000;
app.listen(PORT, () => console.log(`Server up and running at port ${PORT}`));
