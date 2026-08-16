import { useEffect, useState } from "react"
import Header from "./Header"
import Main from "./Main"
import getRandomIds from "../script/fetchPokemons"

export default function App() {

	const [pokemons, setPokemons] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		for (let i = 0; i < 5; i++) {
			const randomId = Math.floor(Math.random() * 200)

				fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`)
					.then((res) => res.json())
					.then((pokemon) => {
						setPokemons(prev => [						 
								...prev, 
								{
									pokemon
								}
						])					
					})
			
		}

		setIsLoading(false)
	}, [])

	console.log(getRandomIds(14, 151))

	if (isLoading) {
		return (
			<div>
				<h1>Loading...</h1>
			</div>
		)
	} 
	// else {
	// 	console.log(pokemons)
	// 	pokemons.map(poke => console.log(poke.pokemon.sprites))
	// }

	return (
		<>
			<Header />
			<Main pokemon={pokemons} />
		</>
	)
}