import React, {useEffect} from 'react'
import loader from "../images/loader.gif"
import Swal from "sweetalert2"

const Pokemons = () => {
    //States
    // const [result, setResult] = React.useState([]);
    const [poke, setPoke] = React.useState([]);
    const [load, setLoad] = React.useState('true');
    const [search, setSearch] = React.useState("")

    useEffect(() => {
    const pokearray = [];
        fetch('https://pokeapi.co/api/v2/pokemon/?limit=151')
        .then((response) =>  response.json())
        .then((data) => Promise.all(data.results.map(async(item) => { 
                return fetch(item.url)
                .then((response) => response.json())
                .then((allpokemon) => pokearray.push(allpokemon));
                
        }),
    ));        
                setPoke(pokearray);
                
    }, []) ; //utilizo un fetch anidado a otro fetch, ya que la primera solicitud a la api nos devuelve un id y un link por cada pokemon, dentro de ese link se encuentra toda la data perteneciente a cada uno.


    poke.sort(function (a,b){
        return (a.id - b.id);
    });//de esta manera ordeno los pokemons por id, ya que cuando hacemos la peticion a la api, no se hace por orden, se hace todo al mismo tiempo y puede ser que nos lo devuelva desordenados, dependiendo la conexion y la respuesta del servidor


    setTimeout(() => {
        setLoad(false);
        }, 3000); //load cambia a "false" luego de 3 segundos, eso genera que el loader desaparezca ya que apliqué un operador ternario (if con otra sintaxis) para que cuando el bool sea falso aparezca el div con el array de pokes

    const pokealert = (name, poketype, height, weight, img, id) => {
        Swal.fire({
            customClass : {
                title: 'swal2-title',
                html: 'swal2-text',
                confirmButton: 'swal2-btn',
            },
            title: name,
            html: `<p style="color:black;"><b>type:</b> ${poketype}<br><br><b>height:</b> ${height} dm<br><br><b>weight:</b> ${weight} kg</p>`,
            imageUrl: img,
            imageAlt: id,
            imageWidth: 180,
            imageHeight: 180,
            background: 'rgb(202, 202, 192)' 
          })
    } //este es el prototipo de Modal para cada pokemon. Es una funcion que toma todos los parametros que quiero que el Modal exteriorise. Hecho con sweetalert2

    const filteredPoke = poke.filter (pk => {
       return pk.name.toLowerCase().includes(search.toLowerCase())  
    }) //voy creando un Nuevo array con los poke filtrados. Cada cambio (onChange) que tiene el input, va a modificar el state "search" y el nombre de los poke que contengan("includes") las letras (o caracteres) que estoy filtrando van a formar parte de este array. Luego es este array el que se mapea para la creacion de los divs correspondientes.

    return (
        <div className="container">
            <div className = "pokedex"><input className = "pokeinput" type="search" placeholder = "pokesearch..." onChange = {e => setSearch(e.target.value)} /></div>
            <div className="pokecard">
            { load ? (<div><img className="pikaloader" src= {loader} alt=""/><br></br><p className="loading">   Loading...</p></div>) : 
                (
                    filteredPoke.map((pk) => (
                        <div className= "box" key={pk.id} onClick={()=>pokealert(pk.name, pk.types[0].type.name, pk.height, pk.weight, pk.sprites.front_default, pk.id)}> 
                            <img src= {pk.sprites.front_default} alt={pk.name}/>
                            <div className="pokemon">
                                <p className="number">id: #{pk.id}</p>
                                <h3 className="name">{pk.name}</h3>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}



export default Pokemons