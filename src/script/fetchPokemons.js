export default function getRandomIds(count, max) {
    const PokemonIds = Array.from({length: max}, (_, index) => index + 1)

    // Fisher-Yates shuffle
    for (let i = PokemonIds.length - 1; i > 0; i--) {
        const r = Math.floor(Math.random() * (i + 1));
        [PokemonIds[i], PokemonIds[r]] = [PokemonIds[r], PokemonIds[i]];
    }

    // console.log(ids)
    return PokemonIds.slice(0, count)
}

