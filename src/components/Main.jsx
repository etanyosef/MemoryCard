export default function Main({pokemon}) {
    return (
        <main>
            <Gameboard pokemon={pokemon} />
        </main>
    )
}

function Gameboard({pokemon}) {
    return (
        <div className="gameboard">
            <h2>Game board</h2>
            {pokemon.map(poke => (
                <Card key={poke.pokemon.id} poke={poke.pokemon} />
			))}
        </div>
    )
}

function Card({poke}) {
    const pokemonId = poke.id
    const SPRITE_URL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`

    return (
        <div className="pokemon-card">
            <h2>{poke.name}</h2>
            <p>{pokemonId}</p>
            <img src={SPRITE_URL} alt={poke.name} />
        </div>
    )
}