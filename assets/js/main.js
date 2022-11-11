const pokemonList = window.document.getElementById("pokemonList")
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecord = 151
const limit = 10;
let offset = 0;







function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) =>
            `<div id="allcontent">
                <li id="detail" class="pokemon ${pokemon.type}">
                    <span class="number">#00${pokemon.number}</span>
                    <span class="name">${pokemon.name}</span>
                
                    <div class="detail">
                        <ol class="types">
                            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li> `).join('')}
                            
                        </ol>
                
                        <img src="${pokemon.photo}"
                            alt="${pokemon.name}">
                
                            


                </li>
                <div class="tooltip">
                <p id="final">+ more</p> 
                    <span class="tooltiptext">
                        <ul id="listStyle">
                            <li>Height: ${pokemon.height*10} cm</li>
                            <li>Weight: ${pokemon.weight}</li>
                            <li>HP: ${pokemon.statsvalue[0]}</li>
                            <li>Attack: ${pokemon.statsvalue[1]}</li>
                            <li>Defense: ${pokemon.statsvalue[2]}</li>
                            <li>Special-atk: ${pokemon.statsvalue[3]}</li>
                            <li>Special-def: ${pokemon.statsvalue[4]}</li>
                            <li>Speed: ${pokemon.statsvalue[5]}</li>
                        </ul>
                    <span>
                </div>
                </div>
                `
        ).join('')


        pokemonList.innerHTML += newHtml
    })
}

//coloca-se fora para já iniciar lendo a primeira vez
loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {

    offset += limit

    //    como calcular o valor total
    const qtdeRecordNextPage = offset + limit

    if (qtdeRecordNextPage >= maxRecord) {
        const newLimit = maxRecord - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

