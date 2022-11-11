const pokeApi = {}

//os codigos baixo est]ao ligados com a class Pokemon
//esse é o modelo criado para facilitar a comunicação
function convertPokeApiToPokemon(pokeDetail) {
    const pokemon = new Pokemon();

    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    //destructuring para pegar as posições de um array
    const [type] = types //seria o mesmo dessa variavel "pokemon.types.get(0)"

    pokemon.types = types
    pokemon.type = type
    pokemon.weight = pokeDetail.weight
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
    pokemon.statsvalue = pokeDetail.stats.map((stats) => stats.base_stat)
    pokemon.height = pokeDetail.height;
    return pokemon

}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
            .then((response) => response.json())
            .then(convertPokeApiToPokemon)
}


pokeApi.getPokemons = (offset = 0, limit = 5) => {


    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url) //local onde a lista se encontra
        .then((response) => response.json())//converte a lista pra JSON
        .then((jsonBody) => jsonBody.results) //depois de converter e procura, dentro do json, o objeto results
        //trouxe os resultados que estão sendo puxados no outro arquivo js
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
} 