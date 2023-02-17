import React from "react";
import { useState } from "react";
import "./components.css" 

function Search({setNasaData}) {

    const [inputVal, setInputVal] = useState("")

    function change(event) {
        setInputVal(event.target.value)
    }
    function handleEnter(event) {
        if (event.keyCode === 13) {
            newSearch();
          }
    }
    function newSearch() {
        const formattedString = encodeURIComponent(inputVal.trim())
        setNasaData(`https://images-api.nasa.gov/search?q=${formattedString}&media_type=image`)
    }

    return (
        <div className="container">
            <div className="input-group mb-4 mt-4">
                <input type="text" className="form-control" placeholder="Search Nasa's Database"
                value={inputVal} 
                onChange={change}
                onKeyDown={handleEnter}/>
                <div className="input-group-append">
                    <button className="btn btn-dark" type="button" onClick={newSearch}>Search</button>
                </div>
            </div>
        </div>

    )
}


export default Search;