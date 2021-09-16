import "./App.css"
import "./components/Header.css"
import "./components/Pokemons.css"
import Header from "./components/Header"
import Pokemons from "./components/Pokemons"
import React from "react"


function App() {
    return (
        <>
            <Header 
                title="Poképedia"
            />
            <Pokemons />
        </>
    )
}

export default App