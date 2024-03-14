import { useState, useEffect } from 'react'
import './App.css'
import countryData from './resources/countryData.json'

function App() {
  const [search, setSearch] = useState('')
  const [suggestions, setSuggestions] = useState([])

  useEffect(() => {
    if (search === '') {
      setSuggestions([])
    } else {
      const regex = new RegExp(`^${search}`, 'i')
      setSuggestions(countryData.filter(country => regex.test(country.name)))
    }
  }, [search])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSuggestions([])
        console.log('Escape')
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <>
    <div className='searchBox'>
      <input 
        type="text" 
        value={search} 
        onChange={e => setSearch(e.target.value)} 
      />
      <button>Search</button>
    </div>
      
      {suggestions.length > 0 && (
          <select size={suggestions.length}>
            {suggestions.map((suggestion, index) => (
            <option key={index} value={suggestion.name}>
              {suggestion.name}
              </option>
            ))}
        </select>
      )}
      
    </>
  )
}

export default App