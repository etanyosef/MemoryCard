import { useEffect, useState } from "react"
import fetchPokemon from "../script/fetchPokemon"
import Spinner from "./spinner/Spinner"

export default function Main() {
    const [isLoading, setIsLoading] = useState(true)
    const [cards, setCards] = useState([])
    const [cardsSelected, setCardsSelected] = useState([])
    const [isGameOver, setIsGameOver] = useState(false)
    const [currentScore, setCurrentScore] = useState(0)
    const [bestScore, setBestScore] = useState(0)

    useEffect(() => {
        (async () => {
            try {                
                setIsGameOver(false)
                const getCards = await fetchPokemon()
                setCards(getCards)
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false)
            }
        })()
    }, [isGameOver])

    function handleCardClicked(id) {
        if (cardsSelected.includes(id)) {
            console.log('game over')
            setIsGameOver(true)
            setCurrentScore(0)
            setCardsSelected([])
            return
        }

        setCards(prevCards => shuffleCards(prevCards))

        console.log(shuffleCards(cards))

        // console.log(cards)

        if (currentScore === bestScore) {
            setBestScore(prevScore => prevScore + 1)
        }

        setCurrentScore(prevScore => prevScore + 1)

        setCardsSelected(prevSelected => [...prevSelected, id])
    }

    function shuffleCards(arr) {
        const newArr = arr

        for (let i = newArr.length -1; i > 0; i--) {
            const r = Math.floor(Math.random() * (i + 1));
            [newArr[i], newArr[r] = newArr[r], newArr[i]];
        }

        return newArr
    }

    if (isLoading) {
        return (
            <main>
                <Spinner />
            </main>
        )
    }

    return (
        <main>
            <p>Cards selected: {cardsSelected}</p>
            <div>
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
                    <p>{pokemon.id}</p>
                </div>
                <img src={pokemon.img} alt="" />
            </button>
        </div>
    )
}