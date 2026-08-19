import pokeball from '../assets/img/pokeball.png'

export default function Header() {
    return (
        <header>
            <div className='title'>
                <img src={pokeball} alt="Pokeball icon" />
                <div>
                    <span>Pokémon Master</span>
                    <h1>PokéMemory</h1>
                </div>
            </div>

            <span className="howto">
                <strong>How to play:</strong>
                <p>
                    Pick a Pokémon card only once! Each time you pick it will shuffle the cards.
                </p>
            </span>
        </header>
    )
}