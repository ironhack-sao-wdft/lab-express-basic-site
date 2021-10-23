const express = require("express");
const app = express();

const PORT = 4000;

const pokeRoute = require('./routes/pokeRoute')

// Router config middleware
app.use('/', pokeRoute);

app.listen(PORT, () => console.log(`Server up and running at port ${PORT}`));
