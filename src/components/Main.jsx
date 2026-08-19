import { useEffect, useState } from "react"
import fetchPokemon from "../script/fetchPokemon"
import Spinner from "./spinner/Spinner"
import shuffle from "../script/shuffle"

export default function Main() {
    const [isLoading, setIsLoading] = useState(true)
    const [isGameOver, setIsGameOver] = useState(true)
    const [hasWon, setHasWon] = useState(false)
    const [error, setError] = useState(null)
    const [cards, setCards] = useState([])
    const [cardsSelected, setCardsSelected] = useState([])
    const currentScore = cardsSelected.length
    const [bestScore, setBestScore] = useState(0)
    const [difficulty, setDifficulty] = useState(6)

    useEffect(() => {
        (async () => {
            try {             
                setIsLoading(true)
                setIsGameOver(false)
                const getCards = await fetchPokemon(difficulty)
                setCards(getCards)
            } catch (error) {
                setError(error)
            } finally {
                setIsLoading(false)
            }
        })()
    }, [difficulty])

    function handleCardClicked(id) {
        if (cardsSelected.includes(id)) {
            setIsGameOver(true)
            // setCardsSelected([])
            
            console.log('game over')
        } else {
            const newCardsSelected = [...cardsSelected, id]
            const newScore = newCardsSelected.length;

            setCardsSelected(newCardsSelected)

            if (currentScore === bestScore) {
                setBestScore(newScore)
            }

            if (newScore === cards.length) {
                setHasWon(true)
                setIsGameOver(true)
            }
        }              

        setCards((prevCards) => shuffle(prevCards))
    }

    function retryGame() {
        setIsGameOver(false)
        setHasWon(false)
        setCardsSelected([])
    }

    function changeDifficulty(difficulty) {
        setIsGameOver(false)
        setHasWon(false)
        setBestScore(0)
        setCardsSelected([])
        setDifficulty(difficulty)
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

    if (isGameOver || hasWon) {
        return (
            <main>
                <div className="modal">
                    <h2>
                        { isGameOver && !hasWon ? 'Game Over' : 'You catched all Pokemon!' }
                    </h2>

                    <p>Score: {currentScore}</p>
                    <p>Best score: {bestScore}/{difficulty}</p>

                    <button className="retry-btn" onClick={retryGame}>
                        { isGameOver && !hasWon ? 'Retry' : 'Play again' }
                    </button>

                    <h2>Change difficulty { hasWon ? 'to catch more Pokemon!' : null }</h2>
                    <div className="difficulty-btns">
                        <button 
                            disabled={difficulty === 6}
                            className={ difficulty === 6 ? 'active' : null }
                            onClick={() => {
                                if (difficulty !== 6) changeDifficulty(6)
                            }}
                        >Easy</button>
                        <button 
                            disabled={difficulty === 12}
                            className={ difficulty === 12 ? 'active' : null }
                            onClick={() => {
                                if (difficulty !== 12) changeDifficulty(12)
                            }}
                        >Medium</button>
                        <button 
                            disabled={difficulty === 20}
                            className={ difficulty === 20 ? 'active' : null }
                            onClick={() => {
                                if (difficulty !== 20) changeDifficulty(20)
                            }}
                        >Hard</button>
                    </div>
                </div>
            </main>
        )
    }

    return (
        <main>
            <div className="scoreboard">
                <p>Current Score: {currentScore}</p>
                <p>Best Score: {bestScore} / {difficulty}</p>
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