const express = require("express");

const pokeRoutes = require("./poke-routes")

const PORT = 4000;

const app = express();

// -- Define your route listeners here! --
app.use(express.json());

app.use('/', pokeRoutes);

app.listen(PORT, () => console.log(`Server up and running at port ${PORT}`));