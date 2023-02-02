import { fruits } from "./data"

export const fetchFruit = (query: string): Promise<typeof fruits> =>
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
