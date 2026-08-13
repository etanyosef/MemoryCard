import { useEffect, useState } from "react"
import Header from "./Header"
import Main from "./Main"

export default function App() {

	const [pokemons, setPokemons] = useState([])

	useEffect(() => {
		fetch("https://pokeapi.co/api/v2/pokemon/1/")
			.then((res) => res.json())
			.then((json) => {
				setPokemons(json)
			})
	}, [])
	
	console.log(pokemons)

	return (
		<>
			<Header />
			<Main pokemon={pokemons} />
		</>
	)
}