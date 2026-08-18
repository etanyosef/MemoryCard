import { useEffect, useState } from "react"
import fetchPokemon from "../script/fetchPokemon"
import Spinner from "./spinner/Spinner"
import shuffle from "../script/shuffle"

export default function Main() {
    const [isLoading, setIsLoading] = useState(true)
    const [isGameOver, setIsGameOver] = useState(false)
    const [error, setError] = useState(null)
    const [cards, setCards] = useState([])
    const [cardsSelected, setCardsSelected] = useState([])
    const currentScore = cardsSelected.length
    const [bestScore, setBestScore] = useState(0)

    useEffect(() => {
        (async () => {
            try {                
                setIsGameOver(false)
                const getCards = await fetchPokemon()
                setCards(getCards)
            } catch (error) {
                setError(error)
            } finally {
                setIsLoading(false)
            }
        })()
    }, [isGameOver])

    function handleCardClicked(id) {
        if (cardsSelected.includes(id)) {
            setIsLoading(true)
            setIsGameOver(true)
            setCardsSelected([])
            
            console.log('game over')
        } else {
            const newCardsSelected = [...cardsSelected, id]
            const newScore = newCardsSelected.length;

            setCardsSelected(newCardsSelected)

            if (currentScore === bestScore) {
                setBestScore(newScore)
            }

            if (newScore === cards.length) {
                console.log('You Win!')
            }
        }              

        setCards((prevCards) => shuffle(prevCards))
    }

    if (isLoading) {
        return (
            <main>
                <Spinner />
            </main>
        )
    }

    if (error) {
        return (
            <main>
                <p>{error}</p>
            </main>
        )
    }

    return (
        <main>
            <div className="scoreboard">
                {/* <p>Cards selected: {cardsSelected}</p> */}
                <p>Current Score: {currentScore}</p>
                <p>Best Score: {bestScore}</p>
            </div>
            <Gameboard cards={cards} handleClick={handleCardClicked} />
        </main>
    )
}

function Gameboard({cards, handleClick}) {
    return (
        <div className="gameboard">
            {cards.map(pokemon => (
                <Card key={pokemon.id} pokemon={pokemon} handleClick={handleClick} />
            ))}
        </div>
    )
}

function Card({pokemon, handleClick}) {
    return (
        <div className="card" id={pokemon.id}>
            <button onClick={(() => handleClick(pokemon.id))}>
                <div className="card-head">
                    <p className="pokemon-name">{pokemon.name}</p>
                    <p>#{pokemon.id}</p>
                </div>
                <img src={pokemon.img} alt="" />
            </button>
        </div>
    )
}