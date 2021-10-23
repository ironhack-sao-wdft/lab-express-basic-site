const { request, response } = require("express");
const Express = require("express");

// Importing all the pokemon for our data file
const allPokemon = require("../data");
const pokeRoute = Express();

///////////////
//return all pokemon
pokeRoute.get("/pokemon", (request, response) => {
  //return search pokemon
  const { name = "", types = "" } = request.query;
  const searchPoke = allPokemon.filter((poke) => {
    return (
      poke.name.toLowerCase().includes(name.toLowerCase()) &&
      poke.types.find((type) => {
        return type.toLowerCase().includes(types.toLowerCase());
      })
    );
  });
  return response.json(searchPoke);
});

//////////////////
//return specific pokemon
pokeRoute.get("/pokemon/:id", (request, response) => {
  const { id } = request.params;
  const filteredPoke = allPokemon.find((poke) => poke.id.toString() === id);
  if (filteredPoke) {
    return response.json(filteredPoke);
  }
  response.json(allPokemon);
});

///////////////
//// post

pokeRoute.post("/pokemon", (request, response) => {
  console.log(request.body);
  const { name, types, height, weight, sprite } = request.body;

  if (!name || !types || !height || !weight || !sprite) {
    return response
      .status(400)
      .json({ message: "Favor preencher todos os campos!" });
  }

  const newPoke = {
    id: new Date().getTime(),
    name: name,
    types: types,
    height: height,
    weight: weight,
    sprite: sprite,
  };

  allPokemon.push(newPoke);
  return response.status(201).json(newPoke);
});

//// put

pokeRoute.put("/pokemon/:id", (request, response) => {
  const { id } = request.params;
  const { name, types, height, weight, sprite } = request.body;

  const foundPoke = allPokemon.find((el) => el.id.toString() === id);

  if (!foundPoke) {
    return response
      .status(400)
      .json({ message: `user com id : ${id} não foi achado` });
  }

  foundPoke.name = name;
  foundPoke.types = types;
  foundPoke.height = height;
  foundPoke.weight = weight;
  foundPoke.sprite = sprite;

  response.json(foundPoke);
});

pokeRoute.delete("/pokemon/:id", (request, response) => {
  const { id } = request.params;
  //buscar o user pelo id

  // achar o indice dele dentro do array
  const userIndex = allPokemon.findIndex((el) => el.id.toString() === id);

  if (userIndex < 0) {
    return response
      .status(400)
      .json({ messagem: `user com id: ${id} não encontrado` });
  }

  console.log(userIndex);

  // faz um splice no indece
  allPokemon.splice(userIndex, 1); // quero deletar apensar um usuario apos o indice encontrado

  response.json({ message: "user deletado com sucesso" });
}); // Deletear um user pelo ID

module.exports = pokeRoute;
