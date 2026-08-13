import { useEffect, useState } from "react"
import Header from "./Header"
import Main from "./Main"

export default function App() {

	const [pokemons, setPokemons] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		fetch("https://pokeapi.co/api/v2/pokemon?limit=20&offset=0/")
			.then((res) => res.json())
			.then((json) => {
				setPokemons(json)
				setIsLoading(false)
			})
	}, [])

	if (isLoading) {
		return (
			<div>
				<h1>Loading...</h1>
			</div>
		)
	} else {
		console.log(pokemons.results)
	}

	return (
		<>
			<Header />
			<Main pokemon={pokemons} />
			{pokemons.results.map(poke => {
				<>
					<h2>Name: {poke.name}</h2>
					{/* <img src={poke.sprites.front_default} alt="" /> */}
				</>
			})}
		</>
	)
}