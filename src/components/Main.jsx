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
            <img src={pokemon.sprites.front_default} alt="" />
        </div>
    )
}