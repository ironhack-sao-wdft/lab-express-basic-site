const express = require("express");
const app = express();

const PORT = 4000;

const pokeRoute = require('./routes/pokeRoute')

//Middleware
app.use(express.json());

app.use('/pokemon', pokeRoute);

app.listen(PORT, () => console.log(`Server up and running at port ${PORT}`));
