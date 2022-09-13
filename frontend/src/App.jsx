import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

import Header from './components/Header'
import Main from './components/Main'
import Welcome from './components/Welcome'
import Footer from './components/Footer'
import DisplayResult from './components/DisplayResult'

import Series from './static/Series'
import Movies from './static/Movies'
import Name from './static/Artists'

import results from './static/results'

import result from './static/result'

const imdb = "https://imdb-api.com"

function App() {
  const [view, setView] = useState("Welcome")
  const [searchInput, setSearchInput] = useState("")
  const [searchResults, setSearchResults] = useState("")
  const [searching, setSearching] = useState(false)

  function handleInput(event) {
    setSearchInput(event.target.value)
  }

  function handleSearch(event) {
    GetSearchData(event.target.dataset.id)
  }

  function GetSearchData(category, temp = null) {

    switch (category) {
      case "Movies":
        FetchData("SearchMovie", searchInput)
        break;
      case "Series":
        FetchData("SearchSeries", searchInput)
        break;
      case "Artists":
        FetchData("SearchName", searchInput)
        break;
      case "Result-Movie":
        FetchData("Title", temp + "/FullCast,Images,Ratings")
        break;
      case "Result-Series":
        FetchData("Title", temp + "/FullCast,Images,Ratings")
        break;
      case "Result-Name":
        FetchData("Name", temp)
        break;
      default:
        break;
    }
  }


  function FetchData(api, search) {
    setSearching(true)
    console.log(`https://imdb-api.com/en/API/${api}/k_52hi3qwc/${search.toLowerCase()}`)
    fetch(`https://imdb-api.com/en/API/${api}/k_52hi3qwc/${search.toLowerCase()}`)
      .then(response => response.json())
      .then(result => {
        setSearchResults(result);
        setSearchInput("");
        setSearching(false);
      })
      .catch((error) => setSearching(false))
  }

  function SetView(event) {
    console.log(event.target.dataset.name, event.target.dataset.id)
    setView(event.target.dataset.id)
    if (/Result-.*/.test(event.target.dataset.id)) {
      setSearchInput(event.target.dataset.name)
      GetSearchData(event.target.dataset.id, event.target.dataset.name)
    }
    else {
      setSearchResults("")
    }

  }
  return (
    <div className="App">
      <Header logo={reactLogo} view={view} setView={SetView} />
      {(view === "Series" || view === "Artists" || view === "Movies") && <Main searching={searching} view={view} searchResults={searchResults} handleSearch={handleSearch} handleInput={handleInput} searchInput={searchInput} setView={SetView} />}
      {/Result-Movie|Result-Series|Result-Name/.test(view) && <DisplayResult result={searchResults} view={view} />}
      {/Welcome/.test(view) && <Welcome />}
      <Footer imdb={imdb} />
    </div>
  )
}

export default App


/* function FetchData(api, search)
  {
    setSearching(true)
      return fetch(`https://imdb-api.com/en/API/${api}/k_6t7109t7/${search.toLowerCase()}`)
      https://imdb-api.com/en/API/Name/k_52hi3qwc/nm0000154 - Get persons
      https://imdb-api.com/en/API/FullCast/k_52hi3qwc/tt1375666 - Movies and Series

Get the data people data to report full info


      .then(response => response.json())
        .then(result => { 
          setSearchResults(result);
          setSearching(false)
         })
        .catch((error) => setSearched(false))
  }
 */