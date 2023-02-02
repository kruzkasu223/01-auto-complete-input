import { fruits, TFruit } from "./data"

export const fetchFruitsByQuery = (query: string): Promise<TFruit[]> =>
  new Promise((resolve) =>
    setTimeout(
      () =>
        resolve(
          fruits.filter((fruit) =>
            fruit.name.toLowerCase().includes(query.toLowerCase())
          )
        ),
      Math.random() * 1000
    )
  )

export const fetchFruitByName = (name: string): Promise<TFruit | undefined> =>
  new Promise((resolve) =>
    setTimeout(
      () =>
        resolve(
          fruits.find(
            (fruit) => fruit.name.toLowerCase() === name.toLowerCase()
          )
        ),
      Math.random() * 1000
    )
  )
