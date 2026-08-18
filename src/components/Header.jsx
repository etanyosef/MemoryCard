import pokeball from '../assets/img/pokeball.png'

export default function Header() {
    return (
        <header>
            <div className='title'>
                <img src={pokeball} alt="" />
                <div>
                    <span>Pokemon Master</span>
                    <h1>Pokemon Memory</h1>
                </div>
            </div>

            <span className="howto">
                <strong>How to play:</strong>
                <p>
                    Pick a Pokemon card only once! Each time you pick it will shuffle the cards.
                </p>
            </span>
        </header>
    )
}