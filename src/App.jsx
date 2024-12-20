import React, { useState } from 'react'
import './App.css'

function App() {

  const [ciudad, setCiudad] = useState("")
  const [clima, setClima] = useState(null)
  
  const onCiudadChange = (e)=>{
    setCiudad(e.target.value)
  } 

  const onSubmit = (e)=>{
    e.preventDefault()
    if (ciudad.trim() === "") {
      return
    }
    fetchClima(ciudad)
    console.log(clima)
  }

  const fetchClima = async (ciudad)=>{
    try{
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=2f71e7943806d475d920e81d75b5a4bd&units=metric&lang=es`
      const response = await fetch(url)
      const data = await response.json()
      setClima(data)
    } catch (error) {
      console.error(error)
    }
  }


  return (
    <div className="container">
      <h1>Aplicación de clima</h1>
      <form onSubmit={onSubmit}>
        <input 
          type="text" 
          placeholder="Ciudad"
          id='ciudad'
          value={ciudad}
          onChange={onCiudadChange} 
        />
        <button type='submit'>Buscar</button>
      </form>
      {
        clima && (
          <div>
            <h2>{clima.name}</h2>
            <p>Temperatura: {clima.main.temp}°C</p>
            <p>{clima.weather[0].description}</p>
            <img src={`https://openweathermap.org/img/wn/${clima.weather[0].icon}@2x.png`} alt="icono del clima"/>
          </div>
        )
      }
    </div>
  )
}

export default App
