const express = require("express");

const PORT = 4000;

// Importing all the pokemon for our data file
const allPokemon = require("./data");

const app = express();

// -- Define your route listeners here! --npm
app.get("/pokemon", (req, res) => {
    return res.json(allPokemon);
});

app.get("pokemon/:id", (req, res) => {
    const id = req.params.id;

    const foundPokemon = allPokemon.find((currentPokemon) => {
        return currentPokemon.id === Number(id);
    });

    if (foundPokemon) {
        return res.json(foundPokemon);
    }

    return res.status(404).json({ message: "Pokemon não encontrado."});
});


app.listen(PORT, () => console.log(`Server up and running at port ${PORT}`));
 



