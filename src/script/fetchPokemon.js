function getRandomIds(count, max) {
    const PokemonIds = Array.from({length: max}, (_, index) => index + 1);

    // Fisher-Yates shuffle
    for (let i = PokemonIds.length - 1; i > 0; i--) {
        const r = Math.floor(Math.random() * (i + 1));
        [PokemonIds[i], PokemonIds[r]] = [PokemonIds[r], PokemonIds[i]];
    }

    // console.log(ids)
    return PokemonIds.slice(0, count)
}

export default async function fetchPokemon(difficulty) {
    const ids = getRandomIds(difficulty, 1025);

    const response = await Promise.all(
        ids.map(id => fetch(`https://pokeapi.co/api/v2/pokemon/${id}`))
    )

    if (response.some(response => !response.ok)) {
        throw new Error('Failed to fetch Pokémon');
    }

    const result = await Promise.all(
        response.map(res => res.json())
    )

    const pokemonCards = result.map(pokemon => ({
        id: pokemon.id,
        name: pokemon.name,
        img: pokemon.sprites.other['official-artwork'].front_default,
    }))

    return pokemonCards
}
