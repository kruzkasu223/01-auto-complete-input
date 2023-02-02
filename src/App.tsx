import { useEffect, useMemo, useState } from "react"
import { TFruit } from "./data"
import "./App.css"
import { fetchFruitByName, fetchFruitsByQuery } from "./api"
import { useDebouceState } from "./useDebouceState"

function App() {
  const [query, setQuery] = useState("")
  const debouncedQuery = useDebouceState(query, 500)
  const [fruits, setFruits] = useState<TFruit[] | never[]>([])
  const [fruit, setFruit] = useState<TFruit>()

  const firstResult = useMemo(() => {
    if (!(query && fruits?.length)) return ""
    const firstMatch = fruits.find(
      (fruit) =>
        fruit.name.slice(0, query?.length)?.toLowerCase() ===
        query.toLowerCase()
    )
    const firstName =
      (query || "") + (firstMatch?.name?.slice(query?.length) || "") || ""
    return firstName
  }, [query, fruits])

  const fetchingFruitsByQuery = async (query = "") => {
    // in addition we can use abort controller if it's real fetch request...
    const data = await fetchFruitsByQuery(query)
    setFruits(data)
  }

  const handleSubmit = async (query: string) => {
    if (!query) return
    const data = await fetchFruitByName(query)
    setFruit(data)
    setFruits([])
    setQuery("")
    console.log(data)
  }

  useEffect(() => {
    if (!debouncedQuery) return setFruits([])
    fetchingFruitsByQuery(debouncedQuery)
  }, [debouncedQuery])

  return (
    <div className="App">
      <h1>01/27 - Auto Complete Input</h1>

      <div className="form">
        <div className="search_div" data-autocomplete={firstResult}>
          <input
            className="search_input"
            placeholder="Enter any fruit..."
            type="text"
            name="search"
            id="search"
            aria-autocomplete="both"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
            }}
            onKeyDown={(e) => {
              if (e.code === "Tab" && firstResult && firstResult !== query) {
                e.preventDefault()
                setQuery(firstResult)
              }
              if (e.code === "Enter" && firstResult === query) {
                handleSubmit(query)
              }
            }}
          />
          <div className="auto_complete_div">
            {fruits?.map((fruit) => (
              <button
                key={fruit.name}
                onClick={() => {
                  handleSubmit(fruit.name)
                }}
                className="auto_complete_button"
              >
                {fruit.name}
              </button>
            ))}
          </div>
        </div>
        <input
          className="search_submit"
          type="submit"
          value="Submit"
          onClick={() => {
            handleSubmit(query)
          }}
        />
      </div>

      <div className="fruit_div">
        {!fruit && <p>Please enter any valid fruit names.</p>}
        {fruit && (
          <div className="fruit">
            <h1 className="fruit_title">{fruit?.name}</h1>
            <div className="description">
              <p className="description_title">Family</p>
              <h3>{fruit?.family}</h3>
              <p className="description_title">Genus</p>
              <h3>{fruit?.genus}</h3>
              <p className="description_title">Nutritions</p>
              <div className="description_item">
                <p>calories: </p>
                <p>{fruit?.nutritions?.calories}</p>
              </div>
              <div className="description_item">
                <p>carbohydrates: </p>
                <p>{fruit?.nutritions?.carbohydrates}</p>
              </div>
              <div className="description_item">
                <p>fat: </p>
                <p>{fruit?.nutritions?.fat}</p>
              </div>
              <div className="description_item">
                <p>protein: </p>
                <p>{fruit?.nutritions?.protein}</p>
              </div>
              <div className="description_item">
                <p>sugar: </p>
                <p>{fruit?.nutritions?.sugar}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
