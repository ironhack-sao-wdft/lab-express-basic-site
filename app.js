const express = require("express");

const pokeRoute = require("./routes/poke-route");

const PORT = 8000;

const app = express();

app.use(express.json());
app.use("/", pokeRoute);

// -- Define your route listeners here! --

app.listen(PORT, () => console.log(`Server up and running at port ${PORT}`));
