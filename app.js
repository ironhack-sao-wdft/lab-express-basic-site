const express = require("express");

const pokemonRoutes = require('./routes/pokemon-routes')

const PORT = 4000;



const app = express();

app.use('/', pokemonRoutes);


app.listen(PORT, () => console.log(`Server up and running at port ${PORT}`));
