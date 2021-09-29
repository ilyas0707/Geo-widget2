import React, { useState } from 'react'
import { useHttp } from './hooks/http.hook'
import './App.css'

import { Sidebar } from './components/Sidebar'
import { MapW } from './components/Map'

export const App = () => {
  const { request, loading } = useHttp()
  const [locations, setLocations] = useState([])
  const [location, setLocation] = useState('')
  const [coordinates, setCoordinates] = useState([42.8765615, 74.6070079])

  const getLocations = () => {
    if (location !== '') {
      request(`https://nominatim.openstreetmap.org/search/?format=json&q=${location}`)
        .then((object) => {
          setLocations(object)
        })
    } else {
      alert('Сначала введите локацию!')
    }
  }

  console.log(locations)
  console.log(location)

  return (
    <div className="app">
      <Sidebar
        loading={loading}
        locations={locations}
        setLocation={setLocation}
        getLocations={getLocations}
        setCoordinates={setCoordinates} />
      <MapW coordinates={coordinates} />
    </div>
  )
}
