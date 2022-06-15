import { Query } from "./types/Query"

const fetchWallpapers = (query: Query, page: number) => {
    const queryString = new URLSearchParams(JSON.parse(JSON.stringify({
        ...query,
        page
    }))).toString()

    return fetch(`https://wallhaven.cc/api/v1/search?${queryString}`).then(res => res.json()).then(res => res.data)
}

export default fetchWallpapers