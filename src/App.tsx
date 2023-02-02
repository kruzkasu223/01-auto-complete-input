import "./App.css"

function App() {
  return (
    <div className="App">
      <h1>01/27 - Auto Complete Input</h1>

      <div className="form">
        <div className="search_div" data-autocomplete="">
          <input
            className="search_input"
            placeholder="Enter any fruit..."
            type="text"
            name="search"
            id="search"
            aria-autocomplete="both"
          />
          <div className="auto_complete_div">
            {/* <button className="auto_complete_button">Hello1</button>
            <button className="auto_complete_button">Hello2</button>
            <button className="auto_complete_button">Hello3</button>
            <button className="auto_complete_button">Hello4</button> */}
          </div>
        </div>
        <input className="search_submit" type="submit" value="Submit" />
      </div>
    </div>
  )
}

export default App
